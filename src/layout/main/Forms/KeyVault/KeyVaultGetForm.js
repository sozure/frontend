import React, { useContext } from "react";
import { sendListSecretRequest } from "../../../../Services/SecretService";

import {
    KeyVaultNameContext,
    SecretRegexContext,
    LoadingContext,
    SecretContext
  } from "../../../../contexts/Contexts";

const KeyVaultGetForm = () => {
    const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
    const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
    const { setLoading } = useContext(LoadingContext);
    const { setSecrets } = useContext(SecretContext);

    const mandatoryFields = [keyVaultName, secretRegex];


    const send = () => {
        let incorrectFill = false;
        mandatoryFields.forEach((element) => {
          if (element === "") {
            alert("Fill every field!");
            incorrectFill = true;
          }
        });
        if (!incorrectFill) {
          //sendListSecretRequest(keyVaultName, secretRegex, setSecrets, setLoading);
          alert("Everything is fine! Get KV!");
        }
      };

  return (
    <div>
      <div id="form">
        <input type="text" id="keyVaultName" name="keyVaultName" placeholder="Name of KeyVault" value={keyVaultName} onChange={(event) => setKeyVaultName(event.target.value)}/>
        
        <input type="text" id="filter" name="filter" placeholder={"Secret regex"} value={secretRegex} onChange={(event) => setSecretRegex(event.target.value)}/>

        <button id="submit_button" onClick={() => send()}>Send request</button>
      </div>
    </div>
  )
}

export default KeyVaultGetForm