import PropTypes from "prop-types";
import React, { useContext } from "react";
import { v4 } from "uuid";

import {
  OnUpdateContext,
  VGChangeExceptionsContext,
} from "../../../../../../contexts/Contexts";
import MatUIButton from "../../../../../MatUIButton";

const UpdateVGTableRow = ({
  variableGroup,
  variableGroupName,
  variableGroupValue,
  project,
  isSecretVariableGroup,
  keyVaultName,
}) => {
  const { onUpdate } = useContext(OnUpdateContext);
  const { vgChangeExceptions, setVgChangeExceptions } = useContext(
    VGChangeExceptionsContext
  );
  const maxLengthOfVariableValue = 60;

  const getVariableGroupValue = (variableGroupValue) => {
    return variableGroupValue.length > maxLengthOfVariableValue
      ? `${variableGroupValue.substring(0, maxLengthOfVariableValue)}...`
      : variableGroupValue;
  };

  const getVariableGroupKey = (variableGroupKey) => {
    return variableGroupKey.length > 30
      ? `${variableGroupKey.substring(0, 30)}...`
      : variableGroupKey;
  };

  const addVgToExceptions = (name, variableKey) => {
    setVgChangeExceptions([
      ...vgChangeExceptions,
      { variableGroupName: name, variableKey: variableKey },
    ]);
  };

  return (
    <tr key={v4()}>
      {project !== undefined && (
        <>
          <td key={v4()}>
            {project.length > 11 ? `${project.slice(0, 11)}...` : project}
          </td>

          {isSecretVariableGroup ? (
            <td key={v4()}>{`${variableGroupName} (${keyVaultName})`}</td>
          ) : (
            <td key={v4()}>{variableGroupName}</td>
          )}

          <td key={v4()}>
            {getVariableGroupKey(variableGroup.variableGroupKey)}
          </td>

          <td key={v4()}>
            <span className={isSecretVariableGroup ? "error" : ""}>
              {isSecretVariableGroup
                ? "Secret variable, can't show it's value."
                : getVariableGroupValue(variableGroupValue)}
            </span>
          </td>
          {onUpdate && (
            <MatUIButton
              id={"remove_delete_or_update_suggestion"}
              send={() => {
                addVgToExceptions(
                  variableGroupName,
                  variableGroup.variableGroupKey
                );
              }}
              displayName={"X"}
            />
          )}
        </>
      )}
    </tr>
  );
};

UpdateVGTableRow.propTypes = {
  variableGroup: PropTypes.object.isRequired,
  variableGroupName: PropTypes.string.isRequired,
  variableGroupValue: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  isSecretVariableGroup: PropTypes.bool.isRequired,
  keyVaultName: PropTypes.string,
};

export default UpdateVGTableRow;
