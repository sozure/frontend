import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import PropTypes from "prop-types";

const KeyVaultSelectMenu = ({id, inputLabel, keyVaults, keyVaultName, setKeyVaultName}) => {
  return (
    <FormControl fullWidth>
        <InputLabel>{inputLabel}</InputLabel>
        <Select
          id={id}
          value={keyVaultName}
          label={inputLabel}
          onChange={(event) => setKeyVaultName(event.target.value)}
        >
          {keyVaults.map((keyVault) => (
            <MenuItem value={keyVault} key={keyVault}>
              {keyVault}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  )
}

KeyVaultSelectMenu.propTypes = {
    id: PropTypes.string.isRequired,
    inputLabel: PropTypes.string.isRequired,
    keyVaults: PropTypes.arrayOf(PropTypes.string).isRequired,
    keyVaultName: PropTypes.string.isRequired,
    setKeyVaultName: PropTypes.func.isRequired
  };
  

export default KeyVaultSelectMenu