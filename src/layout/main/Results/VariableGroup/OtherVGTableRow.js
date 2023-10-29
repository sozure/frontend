import PropTypes from "prop-types";

import React, { useContext } from "react";
import { v4 } from "uuid";

import { SingleModificationContext } from "../../../../contexts/Contexts";
import OtherVGTableRowInput from "./OtherVGTableRowInput";
import OtherVGTableRowButtons from "./OtherVGTableRowButtons";

const OtherVGTableRow = ({
  variableGroup,
  variableGroupName,
  variableGroupValue,
  project,
  isSecretVariableGroup,
  keyVaultName,
  index,
}) => {
  const { onSingleModification } = useContext(SingleModificationContext);
  const inputKey = v4();

  const getVariableGroupValue = () => {
    return variableGroupValue.length > 60 ? (
      <button onClick={() => alert(variableGroupValue)}>
        Show long variable value
      </button>
    ) : (
      variableGroupValue
    );
  };

  return (
    <tr key={v4()}>
      <td key={v4()}>
        {project.length > 11 ? `${project.slice(0, 11)}...` : project}
      </td>

      {isSecretVariableGroup ? (
        <td key={v4()}>{`${variableGroupName} (${keyVaultName})`}</td>
      ) : (
        <td key={v4()}>{variableGroupName}</td>
      )}

      <td key={v4()}>{variableGroup.variableGroupKey}</td>

      <td key={v4()}>
        {onSingleModification.modification &&
        onSingleModification.operation === "update" &&
        onSingleModification.row === index ? (
          <OtherVGTableRowInput
            inputKey={inputKey}
            variableValue={variableGroupValue}
          />
        ) : (
          <span className={isSecretVariableGroup ? "error" : ""}>
            {isSecretVariableGroup
              ? "Secret variable, can't show it's value."
              : getVariableGroupValue()}
          </span>
        )}
      </td>
      <OtherVGTableRowButtons
        variableGroup={variableGroup}
        isSecretVariableGroup={isSecretVariableGroup}
        index={index}
        inputKey={inputKey}
      />
    </tr>
  );
};

OtherVGTableRow.propTypes = {
  variableGroup: PropTypes.object.isRequired,
  variableGroupName: PropTypes.string.isRequired,
  variableGroupValue: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  isSecretVariableGroup: PropTypes.bool.isRequired,
  keyVaultName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default OtherVGTableRow;
