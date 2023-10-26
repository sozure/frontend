import PropTypes from 'prop-types';
import React from "react";
import { v4 } from 'uuid';

const AddVGTableRow = ({ variableGroup }) => {
  return (
    <tr key={v4()}>
      <td key={v4()}>{variableGroup.project}</td>
      <td key={v4()}>{variableGroup.variableGroupName}</td>
    </tr>
  );
};

AddVGTableRow.propTypes = {
  variableGroup: PropTypes.object.isRequired
};


export default AddVGTableRow;
