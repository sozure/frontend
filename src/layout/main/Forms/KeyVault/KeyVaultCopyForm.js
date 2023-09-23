import React, { useContext, useState } from "react";
import KeyVaultBaseForm from "./BaseForms/KeyVaultBaseForm";
import { sendCopyRequest } from "../../../../services//SecretServices/SecretService";
import {
  DestinationKeyVaultContext,
  OriginKeyVaultContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  KeyVaultNameContext,
  SecretRegexContext,
  PaginationCounterContext,
} from "../../../../contexts/Contexts";

import { Button, Box } from "@mui/material";

const KeyVaultCopyForm = () => {
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex } = useContext(SecretRegexContext);
  const { originKeyVault, setOriginKeyVault } = useContext(
    OriginKeyVaultContext
  );
  const { destinationKeyVault, setDestinationKeyVault } = useContext(
    DestinationKeyVaultContext
  );
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const [override, setOverride] = useState(false);

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
      let body = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        originKeyVault: originKeyVault,
        destinationKeyVault: destinationKeyVault,
        override: override,
      };
      sendCopyRequest(body);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <KeyVaultBaseForm />
      <input
        type="text"
        id="toKeyVaultName"
        name="toKeyVaultName"
        placeholder={"Name of origin key vault"}
        value={originKeyVault}
        onChange={(event) => setOriginKeyVault(event.target.value)}
      />

      <input
        type="text"
        id="fromKeyVaultName"
        name="fromKeyVaultName"
        placeholder={"Name of destination key vault"}
        value={destinationKeyVault}
        onChange={(event) => setDestinationKeyVault(event.target.value)}
      />

      <label className="checkbox-inline" htmlFor="overrideNeeded">
        Override secret if it exists on destination key vault:{" "}
      </label>
      <input
        type="checkbox"
        id="overrideNeeded"
        name="overrideNeeded"
        onChange={() => setOverride(!override)}
      />
      <br />

      <Box>
        <Button
          id="submit_button"
          onClick={() => send()}
          variant="contained"
        >
          Send request
        </Button>
      </Box>
    </div>
  );
};

export default KeyVaultCopyForm;
