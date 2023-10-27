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
  NewKeyContext,
  NewValueContext,
  TableTypeContext,
  VariableGroupsContext,
  ActionTypeContext,
  ValueRegexContext,
} from "../../../../contexts/Contexts";

const ActionButtons = () => {
  const { setActionType } = useContext(ActionTypeContext);
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { variableGroups, setVariableGroups } = useContext(
    VariableGroupsContext
  );
  const { tableType } = useContext(TableTypeContext);
  const { onAdd, setOnAdd } = useContext(OnAddContext);
  const { onUpdate, setOnUpdate } = useContext(OnUpdateContext);
  const { message } = useContext(MessageContext);
  const { newKey } = useContext(NewKeyContext);
  const { newValue } = useContext(NewValueContext);
  const { valueRegex } = useContext(ValueRegexContext);

  const deleteVariables = () => {
    sendDeleteRequest(message, "", setOnDelete);
  };

  const addVariables = () => {
    sendAddRequest(message, newKey, newValue, "", setOnAdd);
  };

  const updateVariables = () => {
    sendUpdateRequest(message, newValue, valueRegex, setOnUpdate);
  };

  const addOrUpdate = () => {
    return onAdd ? "add" : "update";
  };

  const getAreYouSureParagraph = () => {
    return (
      <p>
        Are you sure you want to {onDelete ? "delete" : addOrUpdate()}{" "}
        {variableGroups.length > 1 ? "variables?" : "variable?"}
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
      {tableType === "VG" && variableGroups.length > 0 ? (
        getActionSegment()
      ) : (
        <></>
      )}
    </>
  );
};

export default ActionButtons;
