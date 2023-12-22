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
  KVAuthorizedContext,
} from "../../../contexts/Contexts";

import KeyVaultGetForm from "./KeyVault/KeyVaultGetForm";
import VariableGroupGetForm from "./VariableGroup/VariableGroupGetForm";
import VariableGroupDeleteForm from "./VariableGroup/VariableGroupDeleteForm";
import VariableGroupAddForm from "./VariableGroup/VariableGroupAddForm";
import VariableGroupUpdateForm from "./VariableGroup/VariableGroupUpdateForm";
import KeyVaultDeleteForm from "./KeyVault/KeyVaultDeleteForm";
import VGAuthorizeForm from "./Authorize/VGAuthorizeForm";
import KVAuthorizeForm from "./Authorize/KVAuthorizeForm";
import KeyVaultCopyForm from "./KeyVault/KeyVaultCopyForm";
import MainSelects from "./MainSelects";
import KeyVaultRecoverForm from "./KeyVault/KeyVaultRecoverForm";
import AuthorizedSection from "./Authorize/AuthorizedSection";

function Form() {
  const { actionType } = useContext(ActionTypeContext);
  const { tableType } = useContext(TableTypeContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { setKeyRegex } = useContext(KeyRegexContext);
  const { setValueRegex } = useContext(ValueRegexContext);
  const { setVgRegex } = useContext(VGRegexContext);
  const { setNewKey } = useContext(NewKeyContext);
  const { setNewValue } = useContext(NewValueContext);
  const { kvAuthorized } = useContext(KVAuthorizedContext);

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
    if(!kvAuthorized){
      return <KVAuthorizeForm/>
    }
    switch(actionType){
      case "List":
        return <><AuthorizedSection/><KeyVaultGetForm/></>
      case "Copy":
        return <><AuthorizedSection/><KeyVaultCopyForm/></>
      case "Delete":
        return <><AuthorizedSection/><KeyVaultDeleteForm/></>
      default:
        return <><AuthorizedSection/><KeyVaultRecoverForm/></>
    }
  }  

  const getVGForm = () =>{
    if(!vgAuthorized){
      return <VGAuthorizeForm/>
    }
    switch(actionType){
      case "List":
        return <><AuthorizedSection/><VariableGroupGetForm/></>
      case "Add":
        return <><AuthorizedSection/><VariableGroupAddForm/></>
      case "Delete":
        return <><AuthorizedSection/><VariableGroupDeleteForm/></>
      default:
        return <><AuthorizedSection/><VariableGroupUpdateForm/></>
    }
  } 
  return (
    <div>
      <MainSelects />
      {tableType === "KV"? (getKeyVaultForm()) : getVGForm()}
    </div>
  );
}

export default Form;
