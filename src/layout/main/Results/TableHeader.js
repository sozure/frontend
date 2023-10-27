
import React from "react";
import { v4 } from 'uuid';
import { PropTypes } from "prop-types";

const TableHeader = ({ columnList }) => {
  let columnListMap = (column) => columnList.map(column);
  return (
    <tr>
      {columnListMap((column) => {
        return <th key={v4()}>{column}</th>;
      })}
    </tr>
  );
};

TableHeader.propTypes = {
  columnList : PropTypes.arrayOf(PropTypes.string).isRequired,
  columnListMap: PropTypes.func.isRequired
}

export default TableHeader;
