/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import KeyVaultBaseForm from "./KeyVaultBaseForm";
import {
  KeyVaultNameContext,
  SecretRegexContext,
} from "../../../../../contexts/Contexts";

import { Button, Box, Input } from "@mui/material";

const KeyVaultBaseOperationForm = ({ send }) => {
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);

  return (
    <div className="form">
      <KeyVaultBaseForm />

      <Input
        fullWidth
        type="text"
        id="keyVaultName"
        name="keyVaultName"
        placeholder="Name of key vault"
        value={keyVaultName}
        onChange={(event) => setKeyVaultName(event.target.value)}
      />
      <br />
      <br />

      <Input fullWidth
        type="text"
        id="filter"
        name="filter"
        placeholder={"Secret name (regex)"}
        value={secretRegex}
        onChange={(event) => setSecretRegex(event.target.value)}
      />
      <br />
      <br />

      <Box>
        <Button id="submit_button" onClick={send} variant="contained">
          Send request
        </Button>
      </Box>
    </div>
  );
};

export default KeyVaultBaseOperationForm;
