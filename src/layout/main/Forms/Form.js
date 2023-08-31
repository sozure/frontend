import "../../../CSS/Form.css";
import React, { useContext } from "react";

import { ActionTypeContext, TableTypeContext } from "../../../contexts/Contexts";

import KeyVaultGetForm from "./KeyVault/KeyVaultGetForm";
import VariableGroupGetForm from "./VariableGroup/VariableGroupGetForm";
import VariableGroupDeleteForm from "./VariableGroup/VariableGroupDeleteForm";
import VariableGroupAddForm from "./VariableGroup/VariableGroupAddForm";
import VariableGroupUpdateForm from "./VariableGroup/VariableGroupUpdateForm";
import KeyVaultDeleteForm from "./KeyVault/KeyVaultDeleteForm";

function Form() {
  const { actionType, setActionType } = useContext(ActionTypeContext);
  const { tableType, setTableType } = useContext(TableTypeContext);

  return (
    <div>
      {tableType === "VG" ? (
        <select
          id="action_type"
          onChange={(event) => setActionType(event.target.value)}
        >
          <option value="List">List elements</option>
          <option value="Add">Add elements</option>
          <option value="Delete">Delete elements</option>
          <option value="Update">Update elements</option>
        </select>
      ) : (
        <select
          id="action_type"
          onChange={(event) => setActionType(event.target.value)}
        >
          <option value="List">List elements</option>
          <option value="Delete">Delete elements</option>
        </select>
      )}

      <br />
      <select
        id="change_type_select"
        onChange={(event) => setTableType(event.target.value)}
      >
        <option value="KV">Secrets</option>
        <option value="VG">Variable groups</option>
      </select>
      
      {tableType === "KV" ? (
        actionType === "List" ? (
          <KeyVaultGetForm />
        ) : (
          <KeyVaultDeleteForm />
        )
      ) : actionType === "List" ? (
        <VariableGroupGetForm />
      ) : actionType === "Add" ? (
        <VariableGroupAddForm />
      ) : actionType === "Delete" ? (
        <VariableGroupDeleteForm />
      ) : (
        <VariableGroupUpdateForm />
      )}
    </div>
  );
}

export default Form;
