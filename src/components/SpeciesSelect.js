import React from 'react';

type SpeciesSelectProps = {
  speciesList: { id: string; name: string }[];
  value: string;
  onChange: (id: string) => void;
};

export const SpeciesSelect = ({ speciesList, value, onChange, groupings, hideNullOption }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value || null)}>
      {!hideNullOption && <option value="">-- Select a species --</option>}
      {groupings.map(({ label, species }) => (
        <optgroup key={label} label={label}>
          {species.map((sp) => (
            <option key={sp.id} value={sp.id}>
              {sp.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};
