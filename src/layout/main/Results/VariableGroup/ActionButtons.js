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
import MatUIButton from "../../../MatUIButton";

const ActionButtons = () => {
  const { setActionType } = useContext(ActionTypeContext);
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { variables, setVariables } = useContext(VariablesContext);
  const { variableGroups, setVariableGroups } = useContext(
    VariableGroupsContext
  );
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

  const topStyles = {
    display: "flex",
    flexDirection: "row", // Align children horizontally
  };

  const getActionSegment = () => {
    return (
      (onDelete || onAdd || onUpdate) && (
        <div>
          {getAreYouSureParagraph()}
          <br />
          <div style={topStyles}>
            <MatUIButton
              id={"add_update_or_delete_vg"}
              send={() => {
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
              displayName={"Yes"}
            />
            <MatUIButton
              id={"cancel_add_update_or_delete_vg"}
              send={() => {
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
              displayName={"No"}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <>
      {tableType === "Variable Groups" &&
        (variables.length > 0 || variableGroups.length > 0) &&
        getActionSegment()}
    </>
  );
};

export default ActionButtons;
