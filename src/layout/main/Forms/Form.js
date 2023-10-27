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
  NewValueContext,
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
import KeyVaultRecoverForm from "./KeyVault/KeyVaultRecoverForm";

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

  const getKeyVaultForm = () =>{
    switch(actionType){
      case "List":
        return <KeyVaultGetForm/>
      case "Copy":
        return <KeyVaultCopyForm/>
      case "Delete":
        return <KeyVaultDeleteForm/>
      default:
        return <KeyVaultRecoverForm/>
    }
  }  

  const getVGForm = () =>{
    switch(actionType){
      case "List":
        return <VariableGroupGetForm/>
      case "Add":
        return <VariableGroupAddForm/>
      case "Delete":
        return <VariableGroupDeleteForm/>
      default:
        return <VariableGroupUpdateForm/>
    }
  }  

  return (
    <div>
      <MainSelects />
      {tableType === "KV" ? (
        getKeyVaultForm()
      ) : (
        <AuthorizeForm />
      )}
      {tableType === "VG" && vgAuthorized ? (
        getVGForm()
      ) : (
        <></>
      )}
    </div>
  );
}

export default Form;
