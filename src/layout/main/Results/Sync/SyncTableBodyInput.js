import React, { useState } from "react";

const SyncTableBodyInput = ({ idPrefix, variable }) => {
  const [newVariableName, setNewVariableName] = useState(variable);

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
