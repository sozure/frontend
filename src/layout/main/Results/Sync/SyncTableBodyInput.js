import React, { useState } from "react";

const SyncTableBodyInput = ({ idPrefix, variable, optionalValue }) => {
  const [newVariableName, setNewVariableName] = useState(optionalValue !== null? optionalValue : variable);

  return (
    <input
      type="text"
      id={`${idPrefix}-${variable}`}
      name={`${idPrefix}-${variable}`}
      value={newVariableName}
      onChange={(event) => setNewVariableName(event.target.value)}
    />
  );
};

export default SyncTableBodyInput;
