import React from "react";

const TableHeader = ({ columnList }) => {
  return (
    <tr>
      {columnList.map((column) => {
        return <th>{column}</th>;
      })}
    </tr>
  );
};

export default TableHeader;
