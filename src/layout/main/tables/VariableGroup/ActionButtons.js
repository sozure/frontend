import React, { useContext } from "react";
import {
  sendDeleteRequest,
  sendAddRequest,
  sendUpdateRequest,
} from "../../../../Services/VariableGroupService";

import {
  OnDeleteContext,
  OnAddContext,
  OnUpdateContext,
  MessageContext,
  NewKeyContext,
  NewValueContext,
  TableTypeContext,
  VariableGroupsContext,
  ProjectNameContext
} from "../../../../contexts/Contexts";

const ActionButtons = () => {
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { variableGroups } = useContext(VariableGroupsContext);
  const { tableType } = useContext(TableTypeContext);
  const { onAdd, setOnAdd } = useContext(OnAddContext);
  const { onUpdate, setOnUpdate } = useContext(OnUpdateContext);
  const { message } = useContext(MessageContext);
  const { newKey } = useContext(NewKeyContext);
  const { newValue } = useContext(NewValueContext);
  const { projectName } = useContext(ProjectNameContext);

  const deleteVariables = () => {
    sendDeleteRequest(message, "", setOnDelete, projectName === "All");
  };

  const addVariables = () => {
    sendAddRequest(message, newKey, newValue, "", setOnAdd, projectName === "All");
  };

  const updateVariables = () => {
    sendUpdateRequest(message, newValue, "", setOnUpdate, projectName === "All");
  };

  return (
    <>
      {tableType === "VG" && variableGroups.length > 0? (
        onDelete | onAdd | onUpdate ? (
          <div>
            <p>
              Are you sure you want to{" "}
              {onDelete ? "delete" : onAdd ? "add" : "update"} variables?
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
              }}
            >
              Yes
            </button>
            <button>No</button>
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
