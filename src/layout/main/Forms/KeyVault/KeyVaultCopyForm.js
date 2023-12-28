import React, { useContext, useState } from "react";
import { sendCopyRequest } from "../../../../services//SecretServices/SecretService";
import {
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
  FormControlLabel
} from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkRequiredInputs,
  toastErrorPopUp,
} from "../../../../services/CommonService";
import KeyVaultSelectMenu from "../../../KeyVaultSelectMenu";

const KeyVaultCopyForm = () => {
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { profileName } = useContext(ProfileNameContext);
  const { keyVaults } = useContext(KeyVaultsContext);

  const [ originKeyVault, setOriginKeyVault ] = useState("");
  const [ destinationKeyVault, setDestinationKeyVault ] = useState("");
  const [ override, setOverride ] = useState(false);

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
      <KeyVaultSelectMenu
        id={"origin"}
        inputLabel={"Select origin key vault"}
        keyVaults={keyVaults}
        keyVaultName={originKeyVault}
        setKeyVaultName={setOriginKeyVault}
      />{" "}
      <KeyVaultSelectMenu
        id={"destination"}
        inputLabel={"Select destination key vault"}
        keyVaults={keyVaults}
        keyVaultName={destinationKeyVault}
        setKeyVaultName={setDestinationKeyVault}
      />
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
