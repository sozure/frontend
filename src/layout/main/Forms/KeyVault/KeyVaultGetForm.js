import React, { useContext } from "react";
import { sendListSecretRequest } from "../../../../services/SecretService";
import KeyVaultBaseForm from "./KeyVaultBaseForm";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  LoadingContext,
  SecretContext,
} from "../../../../contexts/Contexts";

const KeyVaultGetForm = () => {
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex } = useContext(SecretRegexContext);
  const { setLoading } = useContext(LoadingContext);
  const { setSecrets } = useContext(SecretContext);

  const mandatoryFields = [keyVaultName, secretRegex];

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      sendListSecretRequest(keyVaultName, secretRegex, setSecrets, setLoading);
    }
  };

  return <KeyVaultBaseForm send={send} />;
};

export default KeyVaultGetForm;
