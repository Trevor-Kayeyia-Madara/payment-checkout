// ExtrasSelection.js

import React, { useState } from 'react';

const ExtrasSelection = ({ extras, onExtrasSelect }) => {
  const [selectedExtras, setSelectedExtras] = useState([]);

  const handleExtrasToggle = (extra) => {
    const isSelected = selectedExtras.includes(extra);
    if (isSelected) {
      setSelectedExtras(selectedExtras.filter((selected) => selected !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
    onExtrasSelect(selectedExtras);
  };

  return (
    <div>
      <h2>Extras Selection</h2>
      <ul>
        {extras.map((extra) => (
          <li
            key={extra.id}
            onClick={() => handleExtrasToggle(extra)}
            className={selectedExtras.includes(extra) ? 'selected' : ''}
          >
            {extra.name} - ${extra.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExtrasSelection;
