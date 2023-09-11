import React, { useContext } from "react";
import {
  sendDeleteRequest,
  sendAddRequest,
  sendUpdateRequest,
} from "../../../../services/VariableGroupService";

import {
  OnDeleteContext,
  OnAddContext,
  OnUpdateContext,
  MessageContext,
  NewKeyContext,
  NewValueContext,
  TableTypeContext,
  VariableGroupsContext,
  ProjectNameContext,
  ActionTypeContext,
  ValueRegexContext
} from "../../../../contexts/Contexts";

const ActionButtons = () => {
  const { setActionType } = useContext(ActionTypeContext);
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { variableGroups, setVariableGroups } = useContext(VariableGroupsContext);
  const { tableType } = useContext(TableTypeContext);
  const { onAdd, setOnAdd } = useContext(OnAddContext);
  const { onUpdate, setOnUpdate } = useContext(OnUpdateContext);
  const { message } = useContext(MessageContext);
  const { newKey } = useContext(NewKeyContext);
  const { newValue } = useContext(NewValueContext);
  const { projectName } = useContext(ProjectNameContext);
  const { valueRegex } = useContext(ValueRegexContext);

  const deleteVariables = () => {
    sendDeleteRequest(message, "", setOnDelete, projectName === "All");
  };

  const addVariables = () => {
    sendAddRequest(message, newKey, newValue, "", setOnAdd, projectName === "All");
  };

  const updateVariables = () => {
    sendUpdateRequest(message, newValue, valueRegex, setOnUpdate, projectName === "All");
  };

  return (
    <>
      {tableType === "VG" && variableGroups.length > 0? (
        onDelete | onAdd | onUpdate ? (
          <div>
            <p>
              Are you sure you want to{" "}
              {onDelete ? "delete" : onAdd ? "add" : "update"} {variableGroups.length > 1? "variables?": "variable?"}
            </p>
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
            <button onClick={() => {
              if (onDelete) {
                setOnDelete(false);
              } else if (onAdd) {
                setOnAdd(false);
              } else {
                setOnUpdate(false);
              }
              setVariableGroups([]);
            }}>No</button>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default ActionButtons;
