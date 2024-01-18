import React, { useState } from "react";
import PropTypes from "prop-types";

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

SyncTableBodyInput.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  variable: PropTypes.string.isRequired,
  optionalValue: PropTypes.string.isRequired
};

export default SyncTableBodyInput;
