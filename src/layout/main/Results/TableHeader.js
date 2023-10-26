/* eslint-disable react/prop-types */

import React from "react";
import { v4 } from 'uuid';

const TableHeader = ({ columnList }) => {
  return (
    <tr>
      {columnList.map((column) => {
        return <th key={v4()}>{column}</th>;
      })}
    </tr>
  );
};

export default TableHeader;
