import React, { useContext } from "react";
import KeyVaultBaseOperationForm from "./BaseForms/KeyVaultBaseOperationForm";
import {
  ClientIdContext,
  ClientSecretContext,
  KeyVaultNameContext,
  LoadingContext,
  OnRecoverContext,
  PaginationCounterContext,
  SecretContext,
  SecretRegexContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import { sendListSecretRequest } from "../../../../services/SecretService";

const KeyVaultRecoverForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex } = useContext(SecretRegexContext);
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
        keyVaultName: keyVaultName,
        secretRegex: secretRegex,
      };

      sendListSecretRequest(body, setSecrets, setLoading, true);
      setPaginationCounter(0);
      setOnRecover(true);
    }
  };

  return <KeyVaultBaseOperationForm send={send} />;
};

export default KeyVaultRecoverForm;
