import React, { useContext, useState } from "react";
import { sendCopyRequest } from "../../../../services//SecretServices/SecretService";
import { v4 } from "uuid";
import {
  DestinationKeyVaultContext,
  OriginKeyVaultContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  PaginationCounterContext,
  ProfileNameContext,
  KeyVaultsContext,
} from "../../../../contexts/Contexts";

import {
  Button,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkRequiredInputs,
  toastErrorPopUp,
} from "../../../../services/CommonService";

const KeyVaultCopyForm = () => {
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { originKeyVault, setOriginKeyVault } = useContext(
    OriginKeyVaultContext
  );
  const { destinationKeyVault, setDestinationKeyVault } = useContext(
    DestinationKeyVaultContext
  );
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { profileName } = useContext(ProfileNameContext);
  const { keyVaults } = useContext(KeyVaultsContext);

  const [override, setOverride] = useState(false);

  const mandatoryFields = [
    tenantId,
    clientId,
    clientSecret,
    originKeyVault,
    destinationKeyVault,
  ];

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "copy-form", 1500);

    if (!incorrectFill) {
      if (originKeyVault === destinationKeyVault) {
        toastErrorPopUp(
          "Origin key vault and destination key vault shouldn't be the same!",
          "copy-form",
          1500
        );
      } else {
        let body = {
          tenantId: tenantId,
          clientId: clientId,
          clientSecret: clientSecret,
          userName: profileName,
          fromKeyVault: originKeyVault,
          toKeyVault: destinationKeyVault,
          overrideSecret: override,
        };
        await sendCopyRequest(body);
        setPaginationCounter(0);
      }
    }
  };

  return (
    <div className="form">
      <FormControl fullWidth>
        <InputLabel>Select origin key vault</InputLabel>
        <Select
          label="Select origin key vault"
          value={originKeyVault}
          onChange={(event) => setOriginKeyVault(event.target.value)}
        >
          {keyVaults.map((keyVault) => (
            <MenuItem key={v4()} value={keyVault}>
              {keyVault}
            </MenuItem>
          ))}
        </Select>
      </FormControl>{" "}
      <FormControl fullWidth>
        <InputLabel>Select destination key vault</InputLabel>
        <Select
          label="Select destination key vault"
          value={destinationKeyVault}
          onChange={(event) => setDestinationKeyVault(event.target.value)}
        >
          {keyVaults.map((keyVault) => (
            <MenuItem key={v4()} value={keyVault}>
              {keyVault}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
