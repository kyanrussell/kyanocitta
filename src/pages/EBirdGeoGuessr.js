import React, { useState, useEffect, useCallback } from "react";
import { useHeader } from "../HeaderContext";
import styled from "styled-components";
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

const EBIRD_KEY = "m9amn1136h7r";

function randomLatLng() {
  // Bias toward land/birded latitudes (-60 to 75) using uniform lng
  const lat = Math.random() * 135 - 60;
  const lng = Math.random() * 360 - 180;
  return { lat, lng };
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

// Fetch full taxonomy once and cache it for the session
let taxonomyCache = null;
async function getTaxonomy() {
  if (!taxonomyCache) {
    taxonomyCache = fetch(
      "https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json",
      { headers: { "X-eBirdApiToken": EBIRD_KEY } }
    )
      .then((r) => r.json())
      .then((data) => Object.fromEntries(data.map((t) => [t.speciesCode, t.comName])));
  }
  return taxonomyCache;
}

async function fetchRandomChecklist() {
  for (let attempts = 0; attempts < 15; attempts++) {
    if (attempts > 0) await new Promise((r) => setTimeout(r, 300));
    // Pick a random point and find nearby hotspots
    const { lat, lng } = randomLatLng();
    const hotspotRes = await fetch(
      `https://api.ebird.org/v2/ref/hotspot/geo?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}&dist=50&fmt=json`,
      { headers: { "X-eBirdApiToken": EBIRD_KEY } }
    );
    if (hotspotRes.status === 429) throw new Error("eBird rate limit hit — please wait a minute and try again");
    if (!hotspotRes.ok) continue;
    const hotspots = await hotspotRes.json();
    if (!hotspots.length) continue;

    // Pick a hotspot weighted toward those with more checklists
    const hotspot = hotspots[Math.floor(Math.random() * Math.min(hotspots.length, 5))];
    const count = hotspot.numChecklistsAllTime;
    if (!count) continue;

    const offset = Math.floor(Math.random() * count);
    const listRes = await fetch(
      `https://api.ebird.org/v2/product/lists/${hotspot.locId}?maxResults=1&offset=${offset}`,
      { headers: { "X-eBirdApiToken": EBIRD_KEY } }
    );
    if (listRes.status === 429) throw new Error("eBird rate limit hit — please wait a minute and try again");
    if (!listRes.ok) continue;
    const list = await listRes.json();
    if (!list.length) continue;

    const subId = list[0].subId;
    const detailRes = await fetch(
      `https://api.ebird.org/v2/product/checklist/view/${subId}`,
      { headers: { "X-eBirdApiToken": EBIRD_KEY } }
    );
    if (detailRes.status === 429) throw new Error("eBird rate limit hit — please wait a minute and try again");
    if (!detailRes.ok) continue;
    const detail = await detailRes.json();

    if (!detail.allObsReported) continue;
    if (detail.obs.length < 5) continue;
    if (seenSubIds.has(detail.subId)) continue;
    seenSubIds.add(detail.subId);

    const nameMap = await getTaxonomy();
    detail.obs = detail.obs.map((o) => ({ ...o, comName: nameMap[o.speciesCode] ?? o.speciesCode }));

    return { hotspot, detail };
  }
  throw new Error("Could not find a complete checklist after 15 attempts");
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

const LoadingMsg = styled.p`
  font-family: Arial, sans-serif;
  color: #555;
  text-align: center;
  margin-top: 40px;
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

export default function EBirdGeoGuessr() {
  const { setCollapsed } = useHeader();
  useEffect(() => {
    const isMobile = window.innerWidth <= 700;
    if (isMobile) setCollapsed(true);
    return () => setCollapsed(false);
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
  const prefetchRef = React.useRef(null);

  const totalScore = results.reduce((s, r) => s + r.pts, 0);

  const loadRound = useCallback(async () => {
    setLoading(true);
    setError(null);
    setChecklist(null);
    setHotspot(null);
    setGuess(null);
    setSubmitted(false);
    try {
      const { hotspot: hs, detail } = await fetchRandomChecklist();
      setHotspot(hs);
      setChecklist(detail);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadRound(); }, [loadRound]);

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
    } else {
      setRound(nextRound);
      loadRound();
    }
  };

  const handlePlayAgain = () => {
    seenSubIds.clear();
    setRound(0);
    setResults([]);
    setGameOver(false);
    loadRound();
  };

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
      </Subtitle>

      {loading && <LoadingMsg>Loading checklist...</LoadingMsg>}
      {error && <LoadingMsg style={{ color: "red" }}>Error: {error} — <button onClick={loadRound}>retry</button></LoadingMsg>}

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
              zoom={2}
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
