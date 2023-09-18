import React from "react";

const AddVGTableRow = ({ variableGroup }) => {
  return (
    <tr key={Math.random()}>
      <td key={Math.random()}>{variableGroup.project}</td>
      <td key={Math.random()}>{variableGroup.variableGroupName}</td>
    </tr>
  );
};

export default AddVGTableRow;
