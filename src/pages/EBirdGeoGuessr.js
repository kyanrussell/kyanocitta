import React, { useState, useEffect, useCallback } from "react";
import { useHeader } from "../HeaderContext";
import styled, { keyframes, css } from "styled-components";
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons broken by webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

let ebirdKey = "";

// Well-birded countries/states with strong eBird coverage
const REGIONS = [
  "US-AL","US-AK","US-AZ","US-AR","US-CA","US-CO","US-CT","US-DE","US-FL",
  "US-GA","US-ID","US-IL","US-IN","US-IA","US-KS","US-KY","US-LA","US-ME",
  "US-MD","US-MA","US-MI","US-MN","US-MS","US-MO","US-MT","US-NE","US-NV",
  "US-NH","US-NJ","US-NM","US-NY","US-NC","US-ND","US-OH","US-OK","US-OR",
  "US-PA","US-RI","US-SC","US-SD","US-TN","US-TX","US-UT","US-VT","US-VA",
  "US-WA","US-WV","US-WI","US-WY",
  "CA-AB","CA-BC","CA-MB","CA-NB","CA-NL","CA-NS","CA-ON","CA-PE","CA-QC","CA-SK",
  "MX","GT","BZ","HN","CR","PA","CO","EC","PE","BR","AR","CL","BO","VE","GY",
  "GB","IE","FR","ES","PT","DE","NL","BE","DK","SE","NO","FI","IT","CH","AT",
  "PL","CZ","HU","RO","HR","SI","SK","GR","BG","EE","LV","LT",
  "MA","ZA","KE","TZ","UG","ET","GH","SN","NG","CM","NA","ZW","BW","MZ","MG",
  "IN","NP","LK","BD","TH","MY","ID","PH","VN","KH","MM","CN","JP","KR","TW",
  "AU","NZ","PG",
];

const hotspotCache = {};

async function getRegionHotspots(region) {
  if (hotspotCache[region]) return hotspotCache[region];
  const promise = (async () => {
    while (true) {
      const r = await queuedFetch(
        `https://api.ebird.org/v2/ref/hotspot/${region}?fmt=json`,
        { headers: { "X-eBirdApiToken": ebirdKey } }
      );
      if (r.status === 429) {
        console.log(`[eBird] hotspot/${region} rate limited, retrying...`);
        continue;
      }
      if (!r.ok) { hotspotCache[region] = []; return []; }
      const spots = await r.json();
      const filtered = spots.filter((h) => h.numChecklistsAllTime >= 50 && h.numSpeciesAllTime >= 20);
      // keep a random sample — no need to hold thousands in memory
      const sample = filtered.sort(() => Math.random() - 0.5).slice(0, 100);
      hotspotCache[region] = sample;
      console.log(`[eBird] cached ${sample.length}/${filtered.length} hotspots for ${region}`);
      return sample;
    }
  })();
  hotspotCache[region] = promise;
  return promise;
}

const guessIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const actualIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function scoreFromKm(km) {
  // 5000 points at 0 km, 0 points at 5000 km
  return Math.max(0, Math.round(5000 * Math.exp(-km / 1500)));
}

function FitBounds({ guess, actual }) {
  const map = useMap();
  useEffect(() => {
    if (guess && actual) {
      map.fitBounds([guess, actual], { padding: [40, 40] });
    }
  }, [map, guess, actual]);
  return null;
}

function ClickHandler({ onMapClick, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) onMapClick(e.latlng);
    },
  });
  return null;
}

const seenSubIds = new Set();

// Serialize all eBird requests — one in flight at a time with a global backoff
let requestQueue = Promise.resolve();
let globalDelay = 500;
let abortController = new AbortController();

function queuedFetch(url, opts) {
  const p = requestQueue.then(() => {
    const signal = abortController.signal;
    return fetch(url, { ...opts, signal }).then((r) => {
      if (r.status === 429) {
        globalDelay = Math.min(globalDelay * 1.5, 5000);
        console.log(`[eBird] queue backing off to ${globalDelay}ms`);
      } else {
        globalDelay = Math.max(500, globalDelay * 0.9);
      }
      return r;
    });
  });
  requestQueue = p.then(
    () => new Promise((res) => setTimeout(res, globalDelay)),
    () => new Promise((res) => setTimeout(res, globalDelay))
  );
  return p;
}


let taxonomyCache = null;
async function getTaxonomy() {
  if (!taxonomyCache) {
    taxonomyCache = (async () => {
      while (true) {
        try {
          console.log("[eBird] fetching taxonomy...");
          const r = await fetch(
            "https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json",
            { headers: { "X-eBirdApiToken": ebirdKey } }
          );
          if (!r.ok) {
            console.log(`[eBird] taxonomy failed (${r.status}), retrying...`);
            await new Promise((res) => setTimeout(res, 2000));
            continue;
          }
          const data = await r.json();
          console.log(`[eBird] taxonomy ready (${data.length} species)`);
          return Object.fromEntries(data.map((t) => [t.speciesCode, t.comName]));
        } catch (e) {
          console.log("[eBird] taxonomy network error, retrying...", e.message);
          await new Promise((res) => setTimeout(res, 2000));
        }
      }
    })();
  }
  return taxonomyCache;
}

async function timed(label, fn) {
  const t0 = performance.now();
  const result = await fn();
  console.log(`[eBird] ${label} — ${((performance.now() - t0) / 1000).toFixed(2)}s`);
  return result;
}

let fetchChain = Promise.resolve();

function fetchRandomChecklist(retryDelay = 300) {
  const p = fetchChain.then(() => _fetchRandomChecklist(retryDelay));
  fetchChain = p.then(() => {}, () => {});
  return p;
}

async function _fetchRandomChecklist(retryDelay = 300) {
  const t0 = performance.now();
  for (let regionAttempts = 0; regionAttempts < 10; regionAttempts++) {
    if (regionAttempts > 0) await new Promise((r) => setTimeout(r, retryDelay));

    const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
    const spots = await getRegionHotspots(region);
    if (!spots.length) { console.log(`[eBird] no qualified hotspots in ${region}, retrying`); continue; }

    // Try up to 3 hotspots from this region before switching regions
    for (let hotspotAttempts = 0; hotspotAttempts < 10; hotspotAttempts++) {
      console.log(`[eBird] region ${region}, hotspot attempt ${hotspotAttempts + 1}`);

      const totalWeight = spots.reduce((s, h) => s + Math.sqrt(h.numChecklistsAllTime), 0);
      let pick = Math.random() * totalWeight;
      const hotspot = spots.find((h) => (pick -= Math.sqrt(h.numChecklistsAllTime)) <= 0) ?? spots[0];

      const count = hotspot.numChecklistsAllTime;
      const offset = Math.floor(Math.random() * Math.max(1, count - 200));
      const listRes = await timed(`lists/${hotspot.locId} (${region})`, () =>
        queuedFetch(
          `https://api.ebird.org/v2/product/lists/${hotspot.locId}?maxResults=200&offset=${offset}`,
          { headers: { "X-eBirdApiToken": ebirdKey } }
        )
      );
      if (listRes.status === 429) continue;
      if (!listRes.ok) continue;
      const list = await listRes.json();
      if (!list.length) { console.log(`[eBird] empty list at offset`); continue; }
      console.log(`[eBird] got ${list.length} checklists from ${hotspot.locName}`);

      for (const item of list) {
        const subId = item.subId;
        if (seenSubIds.has(subId)) continue;

        const detailRes = await timed(`checklist/${subId}`, () =>
          queuedFetch(
            `https://api.ebird.org/v2/product/checklist/view/${subId}`,
            { headers: { "X-eBirdApiToken": ebirdKey } }
          )
        );
        if (detailRes.status === 429) continue;
        if (!detailRes.ok) continue;
        const detail = await detailRes.json();

        if (!detail.allObsReported) { console.log(`[eBird] ${subId} not complete, skipping`); continue; }
        if (detail.obs.length < 5) { console.log(`[eBird] ${subId} only ${detail.obs.length} species, skipping`); continue; }

        seenSubIds.add(detail.subId);
        const nameMap = await getTaxonomy();
        detail.obs = detail.obs.map((o) => ({ ...o, comName: nameMap[o.speciesCode] ?? o.speciesCode }));
        console.log(`[eBird] round ready in ${((performance.now() - t0) / 1000).toFixed(2)}s total — ${detail.obs.length} species at ${hotspot.locName}`);
        return { hotspot, detail };
      }
      console.log(`[eBird] no valid checklist in batch from ${hotspot.locName}`);
    }
    console.log(`[eBird] exhausted hotspot attempts for ${region}, switching region`);
  }
  throw new Error("Could not find a complete checklist after 10 attempts");
}

// --- Styled Components ---

const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  height: calc(100vh - 25vh - 44px);
  overflow: hidden;
  padding: 8px 12px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    padding: 6px 8px;
    height: auto;
    overflow: visible;
  }
`;

const Title = styled.h1`
  font-family: Arial, sans-serif;
  color: #1c3d5a;
  margin: 0 0 2px;
  font-size: 1.4rem;

  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
`;

const Subtitle = styled.p`
  color: #555;
  margin: 0 0 8px;
  font-size: 0.85rem;
`;

const GameArea = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  width: 90vw;
  max-width: 1200px;
  flex: 1;
  min-height: 0;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
    gap: 8px;
    width: 100%;
  }
`;

const Panel = styled.div`
  flex: 1;
  min-width: 240px;
  max-width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 700px) {
    max-width: 100%;
    flex: 0 0 50vh;
  }
`;

const SpeciesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const SpeciesItem = styled.li`
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-family: Arial, sans-serif;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;

  span.count {
    color: #888;
    font-size: 0.8rem;
  }
`;

const MapWrapper = styled.div`
  flex: 2;
  min-width: 300px;
  min-height: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

  @media (max-width: 700px) {
    flex: 0 0 35vh;
    min-width: 0;
    width: 100%;
  }
`;

const MetaRow = styled.div`
  font-family: Arial, sans-serif;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 8px;
`;

const Button = styled.button`
  background-color: steelblue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 12px;
  width: 100%;

  &:hover { background-color: #2a6496; }
  &:disabled { background-color: #aaa; cursor: default; }
`;

const ResultBanner = styled.div`
  background: ${(p) => (p.good ? "#d4edda" : "#fff3cd")};
  border: 1px solid ${(p) => (p.good ? "#c3e6cb" : "#ffeeba")};
  border-radius: 6px;
  padding: 12px;
  margin-top: 12px;
  font-family: Arial, sans-serif;
  font-size: 0.95rem;
`;

const ScoreDisplay = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1c3d5a;
  text-align: center;
  margin: 8px 0;
`;

const ellipsis = keyframes`
  0%   { content: "."; }
  33%  { content: ".."; }
  66%  { content: "..."; }
  100% { content: "."; }
`;

const LoadingMsg = styled.p`
  font-family: Arial, sans-serif;
  color: #555;
  text-align: center;
  max-width: 100%;
  margin-top: 40px;

  ${(p) => !p.static && css`
    &::after {
      content: ".";
      animation: ${ellipsis} 1.2s steps(1, end) infinite;
    }
  `}
`;

const SummaryPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  min-height: calc(100vh - 25vh - 44px);
  padding: 40px 16px;
  font-family: Arial, sans-serif;
`;

const SummaryTable = styled.table`
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
  margin: 24px 0;

  th, td {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid #ddd;
    font-size: 0.9rem;
  }

  th { color: #555; font-weight: normal; }
  td:last-child { text-align: right; font-weight: bold; }
`;

const FinalScore = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #1c3d5a;
  margin: 8px 0;
`;

const MaxScore = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 24px;
`;

const TOTAL_ROUNDS = 5;

const LS_KEY = "ebird_api_key";

const KeyScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  min-height: calc(100vh - 25vh - 44px);
  padding: 60px 16px;
  font-family: Arial, sans-serif;
`;

const KeyInput = styled.input`
  width: 100%;
  max-width: 340px;
  padding: 10px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 16px 0 8px;
  box-sizing: border-box;
`;

const KeyHint = styled.p`
  color: #888;
  font-size: 0.8rem;
  max-width: 340px;
  text-align: center;
  margin: 0 0 16px;
`;

export default function EBirdGeoGuessr() {
  const { setCollapsed } = useHeader();
  const [savedKey, setSavedKey] = useState(() => localStorage.getItem(LS_KEY) ?? "");
  const [keyInput, setKeyInput] = useState(savedKey);

  useEffect(() => {
    if (savedKey) ebirdKey = savedKey;
  }, [savedKey]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 700;
    if (isMobile) setCollapsed(true);
    return () => {
      setCollapsed(false);
      abortController.abort();
      abortController = new AbortController();
      requestQueue = Promise.resolve();
      fetchChain = Promise.resolve();
      prefetchQueueRef.current = [];
      // clear any pending (unresolved promise) hotspot cache entries
      for (const key of Object.keys(hotspotCache)) {
        if (typeof hotspotCache[key]?.then === "function") delete hotspotCache[key];
      }
    };
  }, [setCollapsed]);
  const [checklist, setChecklist] = useState(null);
  const [hotspot, setHotspot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [guess, setGuess] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [round, setRound] = useState(0);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const prefetchQueueRef = React.useRef([]);

  const totalScore = results.reduce((s, r) => s + r.pts, 0);

  const fillPrefetchQueue = useCallback(() => {
    const q = prefetchQueueRef.current;
    while (q.length < 4) {
      const p = fetchRandomChecklist();
      p.catch(() => {});
      q.push(p);
    }
  }, []);

  const loadRound = useCallback(async (currentRound = 0) => {
    setLoading(true);
    setError(null);
    console.log(`[eBird] loadRound(${currentRound}), queue=${prefetchQueueRef.current.length}`);
    try {
      const q = prefetchQueueRef.current;
      const promise = q.length > 0 ? q.shift() : fetchRandomChecklist();
      const { hotspot: hs, detail } = await promise;
      setHotspot(hs);
      setChecklist(detail);
      setGuess(null);
      setSubmitted(false);
      fillPrefetchQueue();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [fillPrefetchQueue]);

  const initialLoadDone = React.useRef(false);
  useEffect(() => {
    if (savedKey && !initialLoadDone.current) {
      initialLoadDone.current = true;
      getTaxonomy().catch(() => {});
      loadRound();
    }
  }, [loadRound, savedKey]);

  const handleSubmit = () => {
    if (!guess) return;
    const actualLat = hotspot.lat;
    const actualLng = hotspot.lng;
    const km = haversineKm(guess.lat, guess.lng, actualLat, actualLng);
    const pts = scoreFromKm(km);
    setResults((r) => [...r, { km, pts, locName: hotspot.locName, subId: checklist.subId }]);
    setSubmitted(true);
  };

  const handleNext = () => {
    const nextRound = round + 1;
    if (nextRound >= TOTAL_ROUNDS) {
      setGameOver(true);
      // prefetch round 1 of the next game while user is on summary screen
      if (prefetchQueueRef.current.length === 0) {
        const p = fetchRandomChecklist();
        p.catch(() => {});
        prefetchQueueRef.current.push(p);
      }
    } else {
      setRound(nextRound);
      loadRound(nextRound);
    }
  };

  const handleSaveKey = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    localStorage.setItem(LS_KEY, trimmed);
    ebirdKey = trimmed;
    initialLoadDone.current = true;
    getTaxonomy().catch(() => {});
    loadRound();
    setSavedKey(trimmed);
  };

  const handlePlayAgain = () => {
    seenSubIds.clear();
    // reset the fetch chain so loadRound doesn't wait behind abandoned prefetches
    fetchChain = Promise.resolve();
    // keep at most the one prefetched round-1 promise, discard the rest
    prefetchQueueRef.current = prefetchQueueRef.current.slice(0, 1);
    setRound(0);
    setResults([]);
    setGameOver(false);
    loadRound(0);
  };

  if (!savedKey) {
    return (
      <KeyScreen>
        <Title>eBird GeoGuessr</Title>
        <p style={{ maxWidth: 340, textAlign: "center", color: "#555", margin: "12px 0 0" }}>
          This game uses the eBird API. Enter your personal API key so requests use your own quota.
        </p>
        <KeyInput
          type="text"
          placeholder="e.g. a1b2c3d4e5f6"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
          autoFocus
        />
        <KeyHint>
          Free key at <a href="https://ebird.org/api/keygen" target="_blank" rel="noreferrer">ebird.org/api/keygen</a>. Saved in your browser only.
        </KeyHint>
        <Button style={{ maxWidth: 340 }} onClick={handleSaveKey} disabled={!keyInput.trim()}>
          Start playing
        </Button>
      </KeyScreen>
    );
  }

  const actualLat = hotspot?.lat;
  const actualLng = hotspot?.lng;
  const lastResult = results[results.length - 1];

  if (gameOver) {
    return (
      <SummaryPage>
        <Title style={{ fontSize: "2rem" }}>Game Over</Title>
        <FinalScore>{totalScore.toLocaleString()}</FinalScore>
        <MaxScore>out of {(TOTAL_ROUNDS * 5000).toLocaleString()} possible points</MaxScore>
        <SummaryTable>
          <thead>
            <tr>
              <th>Round</th>
              <th>Location</th>
              <th>Distance</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td><a href={`https://ebird.org/checklist/${r.subId}`} target="_blank" rel="noreferrer">{r.locName}</a></td>
                <td>{r.km < 1 ? "<1" : r.km.toFixed(0)} km</td>
                <td>{r.pts.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </SummaryTable>
        <Button style={{ maxWidth: 300 }} onClick={handlePlayAgain}>Play again</Button>
      </SummaryPage>
    );
  }

  return (
    <Page>
      <Title>eBird GeoGuessr</Title>
      <Subtitle>
        Round {round + 1} of {TOTAL_ROUNDS} &nbsp;|&nbsp; score: {totalScore.toLocaleString()}
        &nbsp;|&nbsp;{" "}
        <button
          onClick={() => { localStorage.removeItem(LS_KEY); setSavedKey(""); setKeyInput(""); }}
          style={{ background: "none", border: "none", color: "#888", fontSize: "0.75rem", cursor: "pointer", textDecoration: "underline", padding: 0 }}
        >
          change key
        </button>
      </Subtitle>

      {loading && <LoadingMsg>Loading checklists</LoadingMsg>}
      {error && <LoadingMsg static style={{ color: "red", maxWidth: 320 }}>Error: {error} — <button onClick={loadRound}>retry</button></LoadingMsg>}

      {checklist && !loading && (
        <GameArea>
          <Panel>
            {submitted ? (
              <ResultBanner good={lastResult.pts > 2500}>
                <div>Distance: <strong>{lastResult.km < 1 ? "<1" : lastResult.km.toFixed(0)} km</strong> from <strong>{hotspot.locName}</strong></div>
                <ScoreDisplay>+{lastResult.pts.toLocaleString()}</ScoreDisplay>
                <Button onClick={handleNext}>
                  {round + 1 >= TOTAL_ROUNDS ? "See results →" : "Next round →"}
                </Button>
              </ResultBanner>
            ) : (
              <Button onClick={handleSubmit} disabled={!guess}>
                {guess ? "Submit guess" : "Click the map to place a pin"}
              </Button>
            )}
            <MetaRow style={{ marginTop: 8 }}><strong>Date:</strong> {checklist.obsDt}</MetaRow>
            {checklist.durationHrs && (
              <MetaRow><strong>Duration:</strong> {(checklist.durationHrs * 60).toFixed(0)} min</MetaRow>
            )}
            <SpeciesList>
              {checklist.obs?.map((o, i) => (
                <SpeciesItem key={i}>
                  <span>{o.comName}</span>
                  {o.howManyStr && <span className="count">{o.howManyStr}</span>}
                </SpeciesItem>
              ))}
            </SpeciesList>
          </Panel>

          <MapWrapper>
            <MapContainer
              center={[20, 0]}
              zoom={1}
              style={{ height: "100%", width: "100%" }}
              worldCopyJump={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <ClickHandler onMapClick={setGuess} disabled={submitted} />
              {guess && <Marker position={guess} icon={guessIcon} />}
              {submitted && actualLat && (
                <>
                  <Marker position={[actualLat, actualLng]} icon={actualIcon} />
                  <Polyline
                    positions={[guess, [actualLat, actualLng]]}
                    pathOptions={{ color: "red", weight: 2, dashArray: "6 4" }}
                  />
                  <FitBounds guess={guess} actual={[actualLat, actualLng]} />
                </>
              )}
            </MapContainer>
          </MapWrapper>
        </GameArea>
      )}
    </Page>
  );
}
