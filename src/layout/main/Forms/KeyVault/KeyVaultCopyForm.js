import React, { useContext, useState } from "react";
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
  ProfileNameContext,
} from "../../../../contexts/Contexts";

import {
  Button,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Input,
} from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkRequiredInputs } from "../../../../services/CommonService";

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
  const { profileName } = useContext(ProfileNameContext);

  const [override, setOverride] = useState(false);

  const mandatoryFields = [
    tenantId,
    clientId,
    clientSecret,
    keyVaultName,
    secretRegex,
  ];

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "copyform");

    if (!incorrectFill) {
      let body = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        originKeyVault: originKeyVault,
        userName: profileName,
        destinationKeyVault: destinationKeyVault,
        override: override,
      };
      await sendCopyRequest(body);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <Input
        fullWidth
        type="text"
        id="toKeyVaultName"
        name="toKeyVaultName"
        placeholder={"Name of origin key vault"}
        value={originKeyVault}
        onChange={(event) => setOriginKeyVault(event.target.value)}
      />
      <br />
      <br />
      <Input
        fullWidth
        type="text"
        id="fromKeyVaultName"
        name="fromKeyVaultName"
        placeholder={"Name of destination key vault"}
        value={destinationKeyVault}
        onChange={(event) => setDestinationKeyVault(event.target.value)}
      />
      <br />
      <br />

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={() => setOverride(!override)}
              id="overrideNeeded"
              name="overrideNeeded"
            />
          }
          label="Override secret if it exists on destination key vault"
        ></FormControlLabel>
      </FormGroup>
      <br />

      <Box>
        <Button id="submit_button" onClick={send} variant="contained">
          Send request
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default KeyVaultCopyForm;
