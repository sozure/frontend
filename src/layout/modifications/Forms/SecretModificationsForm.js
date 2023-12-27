import React, { useContext } from "react";
import CommonFormElements from "./CommonFormElements";
import {
  KeyVaultNameContext,
  KeyVaultsContext,
} from "../../../contexts/Contexts";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const SecretModificationsForm = ({
  setUserName,
  userName,
  setSelectedLimit,
  selectedLimit,
  setFrom,
  from,
  setTo,
  to,
}) => {
  const { keyVaults } = useContext(KeyVaultsContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select Azure vault</InputLabel>
        <Select
          id="project"
          value={keyVaultName}
          label="Select Azure vault"
          onChange={(event) => setKeyVaultName(event.target.value)}
        >
          {keyVaults.map((keyVault) => (
            <MenuItem value={keyVault} key={keyVault}>
              {keyVault}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CommonFormElements
        setUserName={setUserName}
        userName={userName}
        setSelectedLimit={setSelectedLimit}
        selectedLimit={selectedLimit}
        setFrom={setFrom}
        from={from}
        setTo={setTo}
        to={to}
      />
    </>
  );
};
