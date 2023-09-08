import React, { useContext } from "react";
import "../../../../CSS/Buttons.css";
//import { sendDeleteSecretRequest } from "../../../../services/SecretService";
import KeyVaultBaseForm from "./KeyVaultBaseForm";

import {
  KeyVaultNameContext,
  SecretRegexContext,
  // SecretContext,
  // LoadingContext,
} from "../../../../contexts/Contexts";

const KeyVaultDeleteForm = () => {
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex } = useContext(SecretRegexContext);
  // const { setLoading } = useContext(LoadingContext);
  // const { setSecrets } = useContext(SecretContext);

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
      //sendDeleteSecretRequest(keyVaultName, secretRegex, setLoading, setSecrets, setLoading);
      alert("Everything is fine! Delete KV!");
    }
  };

  return <KeyVaultBaseForm send={send} />;
};

export default KeyVaultDeleteForm;
