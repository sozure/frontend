import React, { useContext } from "react";
import CommonFormElements from "./CommonFormElements";
import PropTypes from "prop-types";
import {
  KeyVaultNameContext,
  KeyVaultsContext,
} from "../../../contexts/Contexts";

import KeyVaultSelectMenu from "../../KeyVaultSelectMenu";

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
      <KeyVaultSelectMenu
        id={"modifications"}
        inputLabel={"Select Azure vault"}
        keyVaults={keyVaults}
        keyVaultName={keyVaultName}
        setKeyVaultName={setKeyVaultName}
      />
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
  to: PropTypes.string.isRequired,
};
