import React, { useState } from "react";

const OtherVGTableRowInput = ({ inputKey, variableValue }) => {
  const [singleNewValue, setSingleNewValue] = useState(variableValue);

  return (
    <input
      type="text"
      key={inputKey}
      id={`single_update${inputKey}`}
      name={`single_update${inputKey}`}
      value={singleNewValue}
      onChange={(event) => setSingleNewValue(event.target.value)}
    />
  );
};

export default OtherVGTableRowInput;
