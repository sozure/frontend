import React, { useContext } from "react";
import CommonFormElements from "./CommonFormElements";
import PropTypes from "prop-types";
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

SecretModificationsForm.propTypes = {
  setUserName: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  setSelectedLimit: PropTypes.func.isRequired,
  selectedLimit: PropTypes.number.isRequired,
  setFrom: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  setTo: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired
}
