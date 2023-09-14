import React, {useContext} from "react";
import KeyVaultBaseForm from "./KeyVaultBaseForm";
import { KeyVaultNameContext, SecretRegexContext } from "../../../../../contexts/Contexts";

const KeyVaultBaseOperationForm = ({ send }) => {
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  return (
    <div className="form">
      <KeyVaultBaseForm />

      <input
        type="text"
        id="keyVaultName"
        name="keyVaultName"
        placeholder="Name of key vault"
        value={keyVaultName}
        onChange={(event) => setKeyVaultName(event.target.value)}
      />

      <input
        type="text"
        id="filter"
        name="filter"
        placeholder={"Secret name (regex)"}
        value={secretRegex}
        onChange={(event) => setSecretRegex(event.target.value)}
      />

      <button id="submit_button" onClick={() => send()}>
        Send request
      </button>
    </div>
  );
};

export default KeyVaultBaseOperationForm;
