import React, { useContext } from "react";
import { v4 } from "uuid";
import GetVGTableRowInput from "./GetVGTableRowInput";
import GetVGTableRowButtons from "./GetVGTableRowButtons";
import { SingleModificationContext } from "../../../../../../contexts/Contexts";

const GetVGTableRow = ({
  variableGroup,
  variableGroupKey,
  variableGroupName,
  variableGroupValue,
  project,
  isSecretVariableGroup,
  keyVaultName,
  index,
}) => {
  const { onSingleModification } = useContext(SingleModificationContext);
  const inputKey = v4();
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
  return (
    <tr key={v4()}>
      <>
        <td key={v4()}>
          {project.length > 11 ? `${project.slice(0, 11)}...` : project}
        </td>

        {isSecretVariableGroup ? (
          <td key={v4()}>{`${variableGroupName} (${keyVaultName})`}</td>
        ) : (
          <td key={v4()}>{variableGroupName}</td>
        )}

        <td key={v4()}>{getVariableGroupKey(variableGroupKey)}</td>

        <td key={v4()}>
          {onSingleModification.modification &&
          onSingleModification.operation === "update" &&
          onSingleModification.row === index ? (
            <GetVGTableRowInput
              inputKey={inputKey}
              variableValue={variableGroupValue}
            />
          ) : (
            <span className={isSecretVariableGroup ? "error" : ""}>
              {isSecretVariableGroup
                ? "Secret variable, can't show it's value."
                : getVariableGroupValue(variableGroupValue)}
            </span>
          )}
        </td>
        <GetVGTableRowButtons
          variableGroup={variableGroup}
          isSecretVariableGroup={isSecretVariableGroup}
          index={index}
          inputKey={inputKey}
        />
      </>
    </tr>
  );
};

export default GetVGTableRow;
