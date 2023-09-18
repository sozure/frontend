import React, { useState } from "react";

const OtherVGTableRowInput = ({ inputKey }) => {
  const [singleNewValue, setSingleNewValue] = useState("");

  return (
    <input
      type="text"
      key={inputKey}
      id={`single_update${inputKey}`}
      name={`single_update${inputKey}`}
      placeholder={"New variable's value"}
      value={singleNewValue}
      onChange={(event) => setSingleNewValue(event.target.value)}
    />
  );
};

export default OtherVGTableRowInput;
