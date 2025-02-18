import React, { useContext, useEffect, useState } from "react";
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
  PaginationCounterContext,
  VGChangeExceptionsContext,
} from "../../../../contexts/Contexts";
import MatUIButton from "../../../MatUIButton";
import { getFilteredVariableGroupsByExceptions, getFilteredVariablesByExceptions } from "../../../../services/HelperFunctions/ExceptionHelperFunctions";

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
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { vgChangeExceptions, setVgChangeExceptions } = useContext(VGChangeExceptionsContext);

  const [filteredVariableGroupsByExceptions, setFilteredVariableGroupsByExceptions] = useState([]);

  useEffect(() => {
    if(onAdd){
      if (variableGroups.length > 0) {
        let result = getFilteredVariableGroupsByExceptions(variableGroups, vgChangeExceptions);
        setFilteredVariableGroupsByExceptions(result);
      }
    } else if(onDelete || onUpdate){
      if (variables.length > 0) {
        let result = getFilteredVariablesByExceptions(variables, vgChangeExceptions);
        setFilteredVariableGroupsByExceptions(result);
      }
    }
    
  }, [variableGroups, variables, vgChangeExceptions, onAdd, onDelete, onUpdate]);

  const deleteVariables = async () => {
    message["exceptions"] = vgChangeExceptions;
    await sendDeleteRequest(message, "", setOnDelete);
  };

  const addVariables = async () => {
    message["exceptions"] = vgChangeExceptions;
    await sendAddRequest(message, newKey, newValue, "", setOnAdd);
  };

  const updateVariables = async () => {
    message["exceptions"] = vgChangeExceptions;
    await sendUpdateRequest(message, newValue, valueRegex, setOnUpdate);
  };

  const addOrUpdate = () => {
    return onAdd ? "add" : "update";
  };

  const getAreYouSureParagraph = () => {
    return (
      <p>
        Are you sure you want to {onDelete ? "delete" : addOrUpdate()}{" "}
        {filteredVariableGroupsByExceptions.length > 1 ? "variables?" : "variable?"}
      </p>
    );
  };

  const topStyles = {
    display: "flex",
    flexDirection: "row", // Align children horizontally
  };

  const getActionSegment = () => {
    return (
      ((onDelete || onAdd || onUpdate) && filteredVariableGroupsByExceptions.length > 0) && (
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
                setPaginationCounter(0);
                setVgChangeExceptions([]);
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
                setPaginationCounter(0);
                setVgChangeExceptions([]);
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
        (filteredVariableGroupsByExceptions.length > 0) &&
        getActionSegment()}
    </>
  );
};

export default ActionButtons;
