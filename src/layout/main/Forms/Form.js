import "../../../CSS/style.css";
import React, { useContext, useEffect } from "react";

import {
  ActionTypeContext,
  TableTypeContext,
  VGAuthorizedContext,
  KeyRegexContext,
  ValueRegexContext,
  VGRegexContext,
  NewKeyContext,
  NewValueContext
} from "../../../contexts/Contexts";

import KeyVaultGetForm from "./KeyVault/KeyVaultGetForm";
import VariableGroupGetForm from "./VariableGroup/VariableGroupGetForm";
import VariableGroupDeleteForm from "./VariableGroup/VariableGroupDeleteForm";
import VariableGroupAddForm from "./VariableGroup/VariableGroupAddForm";
import VariableGroupUpdateForm from "./VariableGroup/VariableGroupUpdateForm";
import KeyVaultDeleteForm from "./KeyVault/KeyVaultDeleteForm";
import AuthorizeForm from "./Authorize/AuthorizeForm";
import KeyVaultCopyForm from "./KeyVault/KeyVaultCopyForm";
import MainSelects from "./MainSelects";

function Form() {
  const { actionType } = useContext(ActionTypeContext);
  const { tableType } = useContext(TableTypeContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { setKeyRegex } = useContext(KeyRegexContext);
  const { setValueRegex } = useContext(ValueRegexContext);
  const { setVgRegex } = useContext(VGRegexContext);
  const { setNewKey } = useContext(NewKeyContext);
  const { setNewValue } = useContext(NewValueContext);
  
  useEffect(() => {
    setKeyRegex("");
    setValueRegex("");
    setVgRegex("");
    setNewKey("");
    setNewValue("");
  }, [
    actionType,
    setKeyRegex,
    setValueRegex,
    setVgRegex,
    setNewKey,
    setNewValue,
  ]);

  return (
    <div>
      
    <MainSelects/>
      
      {tableType === "KV" ? (
        actionType === "List" ? (
          <KeyVaultGetForm />
        ) : actionType === "Copy" ? (
          <KeyVaultCopyForm />
        ) : (
          <KeyVaultDeleteForm />
        )
      ) : (
        <AuthorizeForm />
      )}
      {tableType === "KV" || !vgAuthorized ? (
        <></>
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
