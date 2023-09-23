import React, { useContext } from "react";
import { Input } from "@mui/material";

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
      <Input fullWidth
        type="password"
        id="tenantId"
        name="tenantId"
        placeholder="Tenant ID"
        value={tenantId}
        onChange={(event) => setTenantId(event.target.value)}
      />
      <br />
      <br />
      <Input fullWidth
        type="password"
        id="clientId"
        name="clientId"
        placeholder="Client ID"
        value={clientId}
        onChange={(event) => setClientId(event.target.value)}
      />

      <br />
      <br />

      <Input fullWidth
        type="password"
        id="clientSecret"
        name="clientSecret"
        placeholder="Client secret"
        value={clientSecret}
        onChange={(event) => setClientSecret(event.target.value)}
      />
      <br />
      <br />
    </>
  );
};

export default KeyVaultBaseForm;
