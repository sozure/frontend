import React, { useState, useContext, useEffect } from 'react';
import "../../../CSS/Buttons.css";
import { sendUpdateRequest, sendAddRequest, sendDeleteRequest } from "../../../services/VariableGroupService";

import { 
  KeyRegexContext, 
  PATContext, 
  ProjectNameContext, 
  VGRegexContext, 
  ValueRegexContext,
  OnUpdateContext,
  OnAddContext,
  OnDeleteContext,
  LoadingContext,
  MessageContext,
  VariableGroupsContext,
  OrganizationContext
} from "../../../contexts/Contexts";

function VGButtonOptions() {

  const [ newValue, setNewValue ] = useState("");
  const [ key, setKey ] = useState("");
  const [ value, setValue ] = useState("");

  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { valueRegexChange } = useContext(ValueRegexContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { keyRegex } = useContext(KeyRegexContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setLoading } = useContext(LoadingContext);
  const { onUpdate, setOnUpdate } = useContext(OnUpdateContext);
  const { onAdd, setOnAdd } = useContext(OnAddContext);
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { organizationName } = useContext(OrganizationContext);
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
        organizationName: organizationName
      }
    )
  }, [projectName, pat, vgRegex, keyRegex, setLoading, setVariableGroups, setMessage, organizationName])

  return (
    <>
        <button className='button' onClick={() => setOnAdd(true)}>Add</button>
        <button className='button' onClick={() => setOnUpdate(true)}>Update</button>
        <button className='button' onClick={() => setOnDelete(true)}>Delete</button>
        {onUpdate? 
          <>
            <input type="text" id="newValue" name="newValue" placeholder="New value of variable" onChange={
              (event) => setNewValue(event.target.value)
              }/>
            <button id="update_submit" disabled={newValue === ""} onClick={
              () => sendUpdateRequest(
                message,
                newValue, 
                valueRegexChange, 
                setOnUpdate, 
                )}>Send update request</button>
          </>
        : onAdd? 
        
          <>
            <input type="text" id="newKey" name="newKey" placeholder="Key of new variable" onChange={
              (event) => setKey(event.target.value)
              }/>
            <input type="text" id="newValueToNewKey" name="newValueToNewKey" placeholder="Value of new variable" onChange={
              (event) => setValue(event.target.value)
              }/>
            <button id="add_submit" disabled={key === "" || value === "" } onClick={
              () => sendAddRequest(
                message,
                key, 
                value, 
                setOnAdd,
                )}>Send add request</button>
          </>
        : onDelete? 
          <>
            <p>Are you sure you want to delete variable in variable groups listed above?</p>
            <button id="delete_submit" onClick={
              () => sendDeleteRequest(
                message,
                valueRegexChange, 
                setOnDelete
                )}>Yes</button>
            <button onClick={() => setOnDelete(false)}>No</button>
          </>
        :
          <></>
        }
    </>
  )
}

export default VGButtonOptions;