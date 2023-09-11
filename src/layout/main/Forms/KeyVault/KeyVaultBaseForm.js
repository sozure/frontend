import React, { useContext } from "react";

import {
  ClientIdContext,
  ClientSecretContext,
  KeyVaultNameContext,
  SecretRegexContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";

const KeyVaultBaseForm = ({ send }) => {
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  const { tenantId, setTenantId } = useContext(TenantIdContext);
  const { clientId, setClientId } = useContext(ClientIdContext);
  const { clientSecret, setClientSecret } = useContext(ClientSecretContext);

  return (
    <div>
      <div id="form">
        <input
          type="password"
          id="tenantId"
          name="tenantId"
          placeholder="Tenant ID"
          value={tenantId}
          onChange={(event) => setTenantId(event.target.value)}
        />

        <input
          type="password"
          id="clientId"
          name="clientId"
          placeholder="Client ID"
          value={clientId}
          onChange={(event) => setClientId(event.target.value)}
        />

        <input
          type="password"
          id="clientSecret"
          name="clientSecret"
          placeholder="Client secret"
          value={clientSecret}
          onChange={(event) => setClientSecret(event.target.value)}
        />

        <input
          type="text"
          id="keyVaultName"
          name="keyVaultName"
          placeholder="Name of KeyVault"
          value={keyVaultName}
          onChange={(event) => setKeyVaultName(event.target.value)}
        />

        <input
          type="text"
          id="filter"
          name="filter"
          placeholder={"Secret regex"}
          value={secretRegex}
          onChange={(event) => setSecretRegex(event.target.value)}
        />

        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
    </div>
  );
};

export default KeyVaultBaseForm;
