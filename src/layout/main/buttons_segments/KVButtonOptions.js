import React, {useContext} from 'react'
import "../../../CSS/Buttons.css";
import { sendDeleteSecretRequest } from '../../../services/SecretService';

import { 
  KeyVaultNameContext,
  OnDeleteContext,
  SecretRegexContext,
  SecretContext,
  ActionTypeContext,
  LoadingContext
 } from "../../../contexts/Contexts";

function KVButtonOptions() {

  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex }  = useContext(SecretRegexContext);
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { actionType } = useContext(ActionTypeContext);

  return (
    <>
    {actionType === "List"? 
    <>
      <button className='button' onClick={() => setOnDelete(true)}>Delete</button>
        {onDelete? 
          <>
              <p>Are you sure you want to delete listed secrets?</p>
              <button id="delete_kv_submit" onClick={
                () => sendDeleteSecretRequest(keyVaultName, secretRegex, setLoading, setSecrets, setOnDelete)
                }>Yes</button>
              <button onClick={() => setOnDelete(false)}>No</button>
          </>
        : 
        <></>
        }
    </>
    : <></>
    }
    </>
  )
}

export default KVButtonOptions;