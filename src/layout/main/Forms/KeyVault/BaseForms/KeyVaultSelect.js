import React, { useContext } from "react";

import {
  KeyVaultNameContext,
  KeyVaultsContext,
} from "../../../../../contexts/Contexts";
import KeyVaultSelectMenu from "../../../../KeyVaultSelectMenu";

const KeyVaultSelect = () => {
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { keyVaults } = useContext(KeyVaultsContext);

  return (
    <>
      <KeyVaultSelectMenu
        id={"keyVaultName"}
        inputLabel={"Select KeyVault"}
        keyVaults={keyVaults}
        keyVaultName={keyVaultName}
        setKeyVaultName={setKeyVaultName}
      />
      <br />
      <br />
    </>
  );
};

export default KeyVaultSelect;
