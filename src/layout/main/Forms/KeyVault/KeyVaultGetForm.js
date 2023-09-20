import React, { useContext } from "react";
import { sendListSecretRequest } from "../../../../services/SecretService";
import KeyVaultBaseForm from "./BaseForms/KeyVaultBaseForm";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  LoadingContext,
  SecretContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  GetDeletedSecretsContext,
  PaginationCounterContext,
} from "../../../../contexts/Contexts";

const KeyVaultGetForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { deleted, setDeleted } = useContext(GetDeletedSecretsContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  const {setPaginationCounter} = useContext(PaginationCounterContext);

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
      let message = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        keyVaultName: keyVaultName,
        secretRegex: secretRegex,
      };

      sendListSecretRequest(message, setSecrets, setLoading, deleted);
      setPaginationCounter(0);
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
        onChange={(e) => setDeleted(e.target.checked)}
      />
      <br />

      <button id="submit_button" onClick={() => send()}>
        Send request
      </button>
    </div>
  );
};

export default KeyVaultGetForm;
