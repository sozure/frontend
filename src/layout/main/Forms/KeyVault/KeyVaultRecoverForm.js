import React, { useContext } from "react";
import KeyVaultBaseOperationForm from "./BaseForms/KeyVaultBaseOperationForm";
import {
  ClientIdContext,
  ClientSecretContext,
  KeyVaultNameContext,
  LoadingContext,
  OnRecoverContext,
  PaginationCounterContext,
  ProfileNameContext,
  SecretsContext,
  SecretNameRegexContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import { sendListSecretRequest } from "../../../../services/SecretServices/SecretService";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkRequiredInputs, getToastOnClose } from "../../../../services/CommonService";

const KeyVaultRecoverForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretsContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { profileName } = useContext(ProfileNameContext);
  const { secretRegex } = useContext(SecretNameRegexContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { setOnRecover } = useContext(OnRecoverContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const mandatoryFields = [
    tenantId,
    clientId,
    clientSecret,
    keyVaultName,
    secretRegex,
  ];
  const toastMs = getToastOnClose();

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "recoverform", toastMs);
    if (!incorrectFill) {
      let body = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        keyVaultName: keyVaultName,
        secretRegex: secretRegex,
        userName: profileName
      };

      await sendListSecretRequest(body, setSecrets, setLoading, true);
      setPaginationCounter(0);
      setOnRecover(true);
      setPaginationCounter(0);
    }
  };

  return (
    <>
      <KeyVaultBaseOperationForm send={send} />
      <ToastContainer />
    </>
  );
};

export default KeyVaultRecoverForm;
