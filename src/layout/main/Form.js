import "../../CSS/Form.css";
import React, { useContext, useEffect } from 'react';
import { sendListSecretRequest } from "../../services/SecretService";
import { sendListRequest } from "../../services/VariableGroupService";

import { 
  ActionTypeContext, 
  TableTypeContext, 
  KeyVaultNameContext, 
  PATContext, 
  ProjectNameContext,
  ValueRegexContext,
  VGRegexContext,
  SecretRegexContext,
  KeyRegexContext,
  SecretContext,
  VariableGroupsContext,
  LoadingContext,
  MessageContext,
  OrganizationContext
 } from "../../contexts/Contexts";

function Form() {

  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { setActionType } = useContext(ActionTypeContext);
  const { tableType, setTableType } = useContext(TableTypeContext);
  const { pat, setPat } = useContext(PATContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { valueRegexChange, setValueRegexChange } = useContext(ValueRegexContext);
  const { vgRegex, setVgRegex } = useContext(VGRegexContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  const { keyRegex, setKeyRegex } = useContext(KeyRegexContext);
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { organizationName, setOrganizationName } = useContext(OrganizationContext);

  const { message, setMessage } = useContext(MessageContext);

  useEffect(() => {
    setMessage(
      {
        projectName: projectName,
        pat: pat,
        vgRegex: vgRegex,
        keyRegex: keyRegex,
        setLoading: setLoading,
        setVariableGroups: setVariableGroups,
        setSecrets: setSecrets,
        organizationName: organizationName
      }
    )
  }, [projectName, pat, vgRegex, keyRegex, setLoading, setVariableGroups, setSecrets, setMessage, organizationName])

  const checkFormFilling = () => {
    if(tableType === "KV"){
      if(keyVaultName === "" || secretRegex === ""){
        alert("Fill every field!")
      } else {
        sendListSecretRequest(keyVaultName, secretRegex, setSecrets, setLoading);
      }
    } else {
      if(pat === "" || projectName === "" || vgRegex === "" || keyRegex === ""){
        alert("Fill every field!")
      } else {
        sendListRequest(message, valueRegexChange, setVariableGroups);
      }
    }
  }

  return (
    <div>
      <div id="form">
        <select id="action_type" onChange={(event) => setActionType(event.target.value)}>
          <option value="List">List elements</option>
          <option value="Copy">Copy elements</option>
        </select><br/>
        <select id="change_type_select" onChange={(event) => setTableType(event.target.value)}>
          <option value="KV">Secrets</option>
          <option value="VG">Variable groups</option>
        </select>
        {tableType === "KV"
        ? 
        <input type="text" id="keyVaultName" name="keyVaultName" placeholder="Name of KeyVault" onChange={
          (event) => setKeyVaultName(event.target.value)}/>
        : 
        <>
          <input type="password" id="pat" name="pat" placeholder="Personal Access Token" onChange={
            (event) => setPat(event.target.value)}/>
          <input type="text" id="organizationName" name="organizationName" placeholder="Name of organization" onChange={
          (event) => setOrganizationName(event.target.value)}/>
          <input type="text" id="projectName" name="projectName" placeholder="Name of project" onChange={
            (event) => setProjectName(event.target.value)}/>
        </>
        }
        <input type="text" id="filter" name="filter" placeholder={
          tableType === "VG"? "Variable group regex": "Secret regex"
          } onChange={tableType === "VG"? (event) => setVgRegex(event.target.value): 
          (event) => setSecretRegex(event.target.value)}/>
        {tableType === "VG"
        ? 
        <>
          <input type="text" id="keyFilter" name="keyFilter" placeholder={"Key regex"} onChange={
            (event) => setKeyRegex(event.target.value)}/>
          <input type="text" id="valueFilter" name="valueFilter" placeholder="Value regex (Optional)" onChange={
            (event) => setValueRegexChange(event.target.value)}/>
        </>
        : 
        <></>
        }
        <button id="submit_button" onClick={() => checkFormFilling()}>Send request</button>
      </div>
    </div>
  )
}

export default Form;