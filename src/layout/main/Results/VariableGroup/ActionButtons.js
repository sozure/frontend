import React, { useContext } from "react";
import {
  sendDeleteRequest,
  sendAddRequest,
  sendUpdateRequest,
} from "../../../../services/VariableGroupServices/VariableGroupService";

import {
  OnDeleteContext,
  OnAddContext,
  OnUpdateContext,
  MessageContext,
  VariableNewKeyContext,
  VariableNewValueContext,
  TableTypeContext,
  VariablesContext,
  ActionTypeContext,
  VariableValueRegexContext,
  VariableGroupsContext,
} from "../../../../contexts/Contexts";

const ActionButtons = () => {
  const { setActionType } = useContext(ActionTypeContext);
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { variables, setVariables } = useContext(
    VariablesContext
  );
  const { variableGroups, setVariableGroups } = useContext(VariableGroupsContext);
  const { tableType } = useContext(TableTypeContext);
  const { onAdd, setOnAdd } = useContext(OnAddContext);
  const { onUpdate, setOnUpdate } = useContext(OnUpdateContext);
  const { message } = useContext(MessageContext);
  const { newKey } = useContext(VariableNewKeyContext);
  const { newValue } = useContext(VariableNewValueContext);
  const { valueRegex } = useContext(VariableValueRegexContext);

  const deleteVariables = async () => {
    await sendDeleteRequest(message, "", setOnDelete);
  };

  const addVariables = async () => {
    await sendAddRequest(message, newKey, newValue, "", setOnAdd);
  };

  const updateVariables = async () => {
    await sendUpdateRequest(message, newValue, valueRegex, setOnUpdate);
  };

  const addOrUpdate = () => {
    return onAdd ? "add" : "update";
  };

  const getAreYouSureParagraph = () => {
    return (
      <p>
        Are you sure you want to {onDelete ? "delete" : addOrUpdate()}{" "}
        {variables.length > 1 ? "variables?" : "variable?"}
      </p>
    );
  };

  const getActionSegment = () => {
    return onDelete | onAdd | onUpdate ? (
      <div>
        {getAreYouSureParagraph()}
        <br />
        <button
          onClick={() => {
            if (onDelete) {
              deleteVariables();
            } else if (onAdd) {
              addVariables();
            } else {
              updateVariables();
            }
            setActionType("List");
            setVariables([]);
            setVariableGroups([]);
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            if (onDelete) {
              setOnDelete(false);
            } else if (onAdd) {
              setOnAdd(false);
            } else {
              setOnUpdate(false);
            }
            setVariables([]);
            setVariableGroups([]);
          }}
        >
          No
        </button>
      </div>
    ) : (
      <></>
    );
  };

  return (
    <>
      {tableType === "VG" &&
      (variables.length > 0 || variableGroups.length > 0) ? (
        getActionSegment()
      ) : (
        <></>
      )}
    </>
  );
};

export default ActionButtons;
