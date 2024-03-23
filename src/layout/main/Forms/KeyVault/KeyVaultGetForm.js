import React, { useContext, useEffect, useState } from "react";
import { sendListSecretRequest } from "../../../../services//SecretServices/SecretService";
import {
  Checkbox,
  FormControlLabel,
  FormGroup
} from "@mui/material";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  KeyVaultNameContext,
  SecretNameRegexContext,
  LoadingContext,
  SecretsContext,
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
  getToastOnClose,
  setOnSingleModificationBack,
  setSingleOperationBack,
  toastErrorPopUp,
} from "../../../../services/CommonService";
import KeyVaultSelect from "./BaseForms/KeyVaultSelect";
import SecretRegexInput from "./BaseForms/SecretRegexInput";
import MatUIButton from "../../../MatUIButton";

const KeyVaultGetForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretsContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { profileName } = useContext(ProfileNameContext);
  const [deleted, setDeleted] = useState(false);
  const { secretRegex } = useContext(SecretNameRegexContext);
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

  const toastMs = getToastOnClose();

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
      toastErrorPopUp(
        "PAT doesn't match with default Azure subscription!",
        "pat-error",
        toastMs
      );
      setKvAuthorized(false);
    }
  }, [
    kvAuthorized,
    setKvAuthorized,
    subscriptions,
    defaultSubscription,
    profileName,
    toastMs
  ]);

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "getform", toastMs);
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
      <KeyVaultSelect />
      <SecretRegexInput />

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
      <MatUIButton id={"submit_button"} send={send} displayName={"Send request"}/>
      <ToastContainer />
    </div>
  );
};

export default KeyVaultGetForm;
