import React, { useContext, useState } from "react";
import {
  SingleModificationContext,
} from "../../../../contexts/Contexts";
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
  const [inputKey] = useState(Math.random());

  return (
    <tr key={Math.random()}>
      <td key={Math.random()}>
        {project.length > 11 ? `${project.slice(0, 11)}...` : project}
      </td>

      {isSecretVariableGroup ? (
        <td key={Math.random()}>{`${variableGroupName} (${keyVaultName})`}</td>
      ) : (
        <td key={Math.random()}>{variableGroupName}</td>
      )}

      <td key={Math.random()}>{variableGroup.variableGroupKey}</td>

      <td key={Math.random()}>
        {onSingleModification.modification &&
        onSingleModification.operation === "update" &&
        onSingleModification.row === index ? (
          <OtherVGTableRowInput inputKey={inputKey} variableValue={variableGroupValue} />
        ) : (
          <span className={isSecretVariableGroup ? "error" : ""}>
            {isSecretVariableGroup ? (
              "Secret variable, can't show it's value."
            ) : variableGroupValue.length > 60 ? (
              <button onClick={() => alert(variableGroupValue)}>
                Show long variable value
              </button>
            ) : (
              variableGroupValue
            )}
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

export default OtherVGTableRow;
