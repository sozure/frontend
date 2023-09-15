import React, { useContext } from "react";

import {
  ClientIdContext,
  ClientSecretContext,
  TenantIdContext,
} from "../../../../../contexts/Contexts";

const KeyVaultBaseForm = () => {
  const { tenantId, setTenantId } = useContext(TenantIdContext);
  const { clientId, setClientId } = useContext(ClientIdContext);
  const { clientSecret, setClientSecret } = useContext(ClientSecretContext);

  return (
    <>
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
    </>
  );
};

export default KeyVaultBaseForm;
