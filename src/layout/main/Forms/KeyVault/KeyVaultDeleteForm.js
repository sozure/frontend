import React, { useContext } from "react";
import "../../../../CSS/style.css";
import { sendDeleteSecretRequest } from "../../../../services/SecretService";
import KeyVaultBaseForm from "./KeyVaultBaseForm";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  SecretContext,
  LoadingContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext
} from "../../../../contexts/Contexts";

const KeyVaultDeleteForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);

  const mandatoryFields = [tenantId, clientId, clientSecret, keyVaultName, secretRegex];

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      
      let body = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret,
        keyVaultName: keyVaultName,
        secretFilter: secretRegex,
      };

      sendDeleteSecretRequest(body, setLoading, setSecrets, setLoading);
    }
  };

  return (
    <div className="form">
      <KeyVaultBaseForm/>

      <input
        type="text"
        id="keyVaultName"
        name="keyVaultName"
        placeholder="Name of key vault"
        value={keyVaultName}
        onChange={(event) => setKeyVaultName(event.target.value)}
      />

      <input
        type="text"
        id="filter"
        name="filter"
        placeholder={"Secret name (regex)"}
        value={secretRegex}
        onChange={(event) => setSecretRegex(event.target.value)}
      />

      <button id="submit_button" onClick={() => send()}>
        Send request
      </button>
    </div>
  );
};

export default KeyVaultDeleteForm;
