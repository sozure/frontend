import React, { useContext } from "react";
import "../../../../CSS/style.css";
import { sendListSecretRequest } from "../../../../services/SecretService";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  SecretContext,
  LoadingContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  OnDeleteContext,
  PaginationCounterContext
} from "../../../../contexts/Contexts";
import KeyVaultBaseOperationForm from "./BaseForms/KeyVaultBaseOperationForm";

const KeyVaultDeleteForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex } = useContext(SecretRegexContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  
  const mandatoryFields = [tenantId, clientId, clientSecret, keyVaultName, secretRegex];

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

      sendListSecretRequest(body, setSecrets, setLoading, false);
      setPaginationCounter(0);
      setOnDelete(true);
    }
  };

  return (
    <KeyVaultBaseOperationForm send={send}/>
  );
};

export default KeyVaultDeleteForm;
