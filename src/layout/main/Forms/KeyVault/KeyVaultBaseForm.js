import React, { useContext } from "react";

import {
  KeyVaultNameContext,
  SecretRegexContext,
} from "../../../../contexts/Contexts";

const KeyVaultBaseForm = ({ send }) => {
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  return (
    <div>
      <div id="form">
        <input
          type="text"
          id="keyVaultName"
          name="keyVaultName"
          placeholder="Name of KeyVault"
          value={keyVaultName}
          onChange={(event) => setKeyVaultName(event.target.value)}
        />

        <input
          type="text"
          id="filter"
          name="filter"
          placeholder={"Secret regex"}
          value={secretRegex}
          onChange={(event) => setSecretRegex(event.target.value)}
        />

        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
    </div>
  );
};

export default KeyVaultBaseForm;
