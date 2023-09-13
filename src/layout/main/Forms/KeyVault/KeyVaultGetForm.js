import React, { useContext, useState } from "react";
import { sendListSecretRequest } from "../../../../services/SecretService";
import KeyVaultBaseForm from "./KeyVaultBaseForm";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  LoadingContext,
  SecretContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
} from "../../../../contexts/Contexts";

const KeyVaultGetForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const [deleted, setDeleted] = useState(false);
  const { setSecrets } = useContext(SecretContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);

  const mandatoryFields = [
    tenantId,
    clientId,
    clientSecret,
    keyVaultName,
    secretRegex,
  ];

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      sendListSecretRequest(
        tenantId,
        clientId,
        clientSecret,
        keyVaultName,
        secretRegex,
        setSecrets,
        setLoading,
        deleted
      );
    }
  };

  return (
    <div className="form">
      <KeyVaultBaseForm />

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

      <label className="checkbox-inline" htmlFor="secret_needed">
        Get deleted secrets:{" "}
      </label>

      <input
        type="checkbox"
        id="getDeletedSecrets"
        name="getDeletedSecrets"
        onChange={() => setDeleted(!deleted)}
      />
      <br />

      <button id="submit_button" onClick={() => send()}>
        Send request
      </button>
    </div>
  );
};

export default KeyVaultGetForm;
