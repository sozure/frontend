import React from "react";
import PropTypes from "prop-types";
import MatUISelect from "./MatUISelect";

const KeyVaultSelectMenu = ({
  id,
  inputLabel,
  keyVaults,
  keyVaultName,
  setKeyVaultName,
}) => {
  return (
    <MatUISelect
      collection={keyVaults}
      inputLabel={inputLabel}
      id={id}
      selectValue={keyVaultName}
      setSelectValue={setKeyVaultName}
      allOption={false}
      required={true}
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
