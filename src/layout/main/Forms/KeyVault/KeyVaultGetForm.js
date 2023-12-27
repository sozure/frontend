import React, { useContext, useEffect, useState } from "react";
import { sendListSecretRequest } from "../../../../services//SecretServices/SecretService";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Box,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  LoadingContext,
  SecretContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  PaginationCounterContext,
  SingleModificationContext,
  SingleOperationContext,
  KeyVaultsContext,
  ProfileNameContext,
  SubscriptionsContext,
  DefaultSubscriptionContext,
  KVAuthorizedContext,
} from "../../../../contexts/Contexts";
import {
  checkRequiredInputs,
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

const KeyVaultGetForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { profileName } = useContext(ProfileNameContext);
  const [deleted, setDeleted] = useState(false);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { keyVaults } = useContext(KeyVaultsContext);
  const { subscriptions } = useContext(SubscriptionsContext);
  const { defaultSubscription } = useContext(DefaultSubscriptionContext);
  const { kvAuthorized, setKvAuthorized } = useContext(KVAuthorizedContext);

  const mandatoryFields = [
    tenantId,
    clientId,
    clientSecret,
    keyVaultName,
    secretRegex,
  ];

  useEffect(() => {
    if (keyVaults.length > 0) {
      setKeyVaultName(keyVaults[0]);
    }
  }, [keyVaults, setKeyVaultName]);

  useEffect(() => {
    if (
      kvAuthorized &&
      subscriptions.length > 0 &&
      defaultSubscription !== "" &&
      profileName !== "" &&
      !subscriptions.includes(defaultSubscription)
    ) {
      toast.error("PAT doesn't match with default Azure subscription!", {
        position: toast.POSITION.TOP_CENTER,
        toastId: `pat-error`,
      });
      setKvAuthorized(false);
    }
  }, [
    kvAuthorized,
    setKvAuthorized,
    subscriptions,
    defaultSubscription,
    profileName,
  ]);

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "getform", 1500);
    if (!incorrectFill) {
      let message = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        keyVaultName: keyVaultName,
        secretRegex: secretRegex,
        userName: profileName,
      };

      await sendListSecretRequest(message, setSecrets, setLoading, deleted);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <FormControl fullWidth>
        <InputLabel>Select KeyVault</InputLabel>
        <Select
          id="keyVaultName"
          value={keyVaults[0]}
          label="Select KeyVault"
          onChange={(event) => setKeyVaultName(event.target.value)}
        >
          {keyVaults.map((keyVault) => {
            return (
              <MenuItem value={keyVault} key={keyVault}>
                {keyVault}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br />
      <br />

      <Input
        fullWidth
        type="text"
        id="filter"
        name="filter"
        placeholder={"Secret name (regex)"}
        value={secretRegex}
        onChange={(event) => setSecretRegex(event.target.value)}
      />
      <br />
      <br />

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => setDeleted(e.target.checked)}
              id="getDeletedSecrets"
              name="getDeletedSecrets"
            />
          }
          label="Get deleted secrets"
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

export default KeyVaultGetForm;
