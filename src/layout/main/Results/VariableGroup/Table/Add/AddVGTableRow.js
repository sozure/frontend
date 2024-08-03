import PropTypes from "prop-types";
import React, { useContext } from "react";
import { v4 } from "uuid";
import MatUIButton from "../../../../../MatUIButton";
import { VGChangeExceptionsContext } from "../../../../../../contexts/Contexts";

const AddVGTableRow = ({ variableGroup }) => {
  const { vgChangeExceptions, setVgChangeExceptions } = useContext(
    VGChangeExceptionsContext
  );

  const variableGroupName = variableGroup.variableGroupName;

  const addVgToExceptions = (name) => {
    setVgChangeExceptions([...vgChangeExceptions, { variableGroupName: name }]);
  };

  return (
    <tr key={v4()}>
      <td key={v4()}>{variableGroup.project}</td>
      <td key={v4()}>{variableGroupName}</td>
      <td key={v4()}>
        <MatUIButton
          id={"remove_add_suggestion"}
          send={() => {
            addVgToExceptions(variableGroupName);
          }}
          displayName={"X"}
        />
      </td>
    </tr>
  );
};

AddVGTableRow.propTypes = {
  variableGroup: PropTypes.object.isRequired,
};

export default AddVGTableRow;
