import React, { useContext } from "react";

import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import {
  KeyVaultNameContext,
  KeyVaultsContext,
} from "../../../../../contexts/Contexts";

const KeyVaultSelect = () => {
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { keyVaults } = useContext(KeyVaultsContext);

  return (
    <>
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
    </>
  );
};

export default KeyVaultSelect;
