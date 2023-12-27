import PropTypes from "prop-types";
import React, { useContext } from "react";
import {
  KeyVaultNameContext,
  KeyVaultsContext,
  SecretRegexContext,
} from "../../../../../contexts/Contexts";

import {
  Button,
  Box,
  Input,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const KeyVaultBaseOperationForm = ({ send }) => {
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex, setSecretRegex } = useContext(SecretRegexContext);
  const { keyVaults } = useContext(KeyVaultsContext);

  return (
    <div className="form">
      <FormControl fullWidth>
        <InputLabel>Select KeyVault</InputLabel>
        <Select
          id="keyVaultName"
          value={keyVaultName}
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

      <Box>
        <Button id="submit_button" onClick={send} variant="contained">
          Send request
        </Button>
      </Box>
    </div>
  );
};

KeyVaultBaseOperationForm.propTypes = {
  send: PropTypes.func.isRequired,
};

export default KeyVaultBaseOperationForm;
