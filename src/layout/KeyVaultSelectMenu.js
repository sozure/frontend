import React from "react";
import PropTypes from "prop-types";
import MatUiSelect from "./MatUiSelect";

const KeyVaultSelectMenu = ({
  id,
  inputLabel,
  keyVaults,
  keyVaultName,
  setKeyVaultName,
}) => {
  return (
    <MatUiSelect
      collection={keyVaults}
      inputLabel={inputLabel}
      id={id}
      selectValue={keyVaultName}
      setSelectValue={setKeyVaultName}
      allOption={false}
    />
  );
};

KeyVaultSelectMenu.propTypes = {
  id: PropTypes.string.isRequired,
  inputLabel: PropTypes.string.isRequired,
  keyVaults: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyVaultName: PropTypes.string.isRequired,
  setKeyVaultName: PropTypes.func.isRequired,
};

export default KeyVaultSelectMenu;
