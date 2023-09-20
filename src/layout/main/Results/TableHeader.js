import React from "react";

const TableHeader = ({ columnList }) => {
  return (
    <tr>
      {columnList.map((column) => {
        return <th key={Math.random()}>{column}</th>;
      })}
    </tr>
  );
};

export default TableHeader;
