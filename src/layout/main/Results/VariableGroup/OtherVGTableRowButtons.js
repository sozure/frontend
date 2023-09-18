import React, { useContext } from "react";
import {
  sendDeleteRequest2,
  sendUpdateRequest2,
} from "../../../../services/VariableGroupService";
import {
  OrganizationContext,
  PATContext,
  SingleModificationContext
} from "../../../../contexts/Contexts";

const OtherVGTableRowButtons = ({
  variableGroups,
  variableGroup,
  isSecretVariableGroup,
  index,
  inputKey
}) => {
  const { pat } = useContext(PATContext);
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );
  const { organizationName } = useContext(OrganizationContext);

  const sendUpdate = (variableGroup) => {
    let message = {
      projectName: variableGroup.project,
      pat: pat,
      vgRegex: variableGroup.variableGroupName,
      organizationName: organizationName,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false,
    };
    let value = document.getElementById(`single_update${inputKey}`).value;
    sendUpdateRequest2(message, value, variableGroup.variableGroupValue);
    variableGroup.variableGroupValue = value;
    setOnSingleModificationBack();
  };

  const startUpdate = (row) => {
    let model = { row: row, operation: "update", modification: true };
    setOnSingleModification(model);
  };

  const cancelUpdate = () => {
    setOnSingleModificationBack();
  };

  const sendDelete = (variableGroup, index) => {
    console.log("Send deletion!");
    let message = {
      projectName: variableGroup.project,
      pat: pat,
      vgRegex: variableGroup.variableGroupName,
      organizationName: organizationName,
      keyRegex: variableGroup.variableGroupKey,
      secretIncluded: false,
    };
    sendDeleteRequest2(message, variableGroup.variableGroupValue);
    variableGroups.splice(index, 1);
    setOnSingleModificationBack();
  };

  const startDelete = (row) => {
    let model = { row: row, operation: "deletion", modification: true };
    setOnSingleModification(model);
  };

  const cancelDelete = () => {
    setOnSingleModificationBack();
  };

  const setOnSingleModificationBack = () => {
    let model = { row: 0, operation: "", modification: false };
    setOnSingleModification(model);
  };

  return (
    <td key={Math.random()}>
      {isSecretVariableGroup |
      (variableGroup.variableGroupValue.length > 60) ? (
        <span className={"error"}>Can't change variable.</span>
      ) : (
        <div className="tableButtons">
          {onSingleModification.operation === "deletion" &&
          onSingleModification.row === index ? (
            <></>
          ) : (
            <>
              {onSingleModification.modification &&
              onSingleModification.row === index ? (
                <>
                  <button onClick={() => sendUpdate(variableGroup)}>
                    Save changes
                  </button>
                  <button onClick={() => cancelUpdate()}>Cancel</button>
                </>
              ) : (
                <button onClick={() => startUpdate(index)}>Update</button>
              )}
            </>
          )}

          {onSingleModification.operation === "update" &&
          onSingleModification.row === index ? (
            <></>
          ) : (
            <>
              {onSingleModification.modification &&
              onSingleModification.row === index ? (
                <>
                  <button onClick={() => sendDelete(variableGroup, index)}>
                    Approve deletion
                  </button>
                  <button onClick={() => cancelDelete()}>Cancel</button>
                </>
              ) : (
                <button onClick={() => startDelete(index)}>Delete</button>
              )}
            </>
          )}
        </div>
      )}
    </td>
  );
};

export default OtherVGTableRowButtons;
