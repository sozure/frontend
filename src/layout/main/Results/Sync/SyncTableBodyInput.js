import React, { useState } from "react";

const SyncTableBodyInput = ({ variable }) => {
  const [newVariableName, setNewVariableName] = useState(variable);

  return (
    <input
      type="text"
      id={`inline-var-${variable}`}
      name={`inline-var-${variable}`}
      value={newVariableName}
      onChange={(event) => setNewVariableName(event.target.value)}
    />
  );
};

export default SyncTableBodyInput;
