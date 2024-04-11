import React, { useContext } from "react";

import {
  ActionTypeContext,
  ClientIdContext,
  ClientSecretContext,
  KeyVaultNameContext,
  LoadingContext,
  OnDeleteContext,
  OnRecoverContext,
  ProfileNameContext,
  SecretsContext,
  SecretNameRegexContext,
  TableTypeContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import {
  sendDeleteSecretRequest,
  sendRecoverSecretRequest,
} from "../../../../services/SecretServices/SecretService";

const ActionButtons = () => {
  const { setActionType } = useContext(ActionTypeContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { secretRegex } = useContext(SecretNameRegexContext);
  const { secrets, setSecrets } = useContext(SecretsContext);
  const { tableType } = useContext(TableTypeContext);
  const { setLoading } = useContext(LoadingContext);
  const { onRecover, setOnRecover } = useContext(OnRecoverContext);
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);
  const { profileName } = useContext(ProfileNameContext);

  const deleteSecrets = async () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVaultName,
      secretFilter: secretRegex,
      userName: profileName
    };

    await sendDeleteSecretRequest(body, setLoading, setSecrets, setOnDelete);
  };

  const recoverSecrets = async () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVaultName,
      secretFilter: secretRegex,
      userName: profileName
    };

    await sendRecoverSecretRequest(body, setLoading, setSecrets, setOnRecover);
  };

  const getAreYouSureSection = () => {
    return (
      <div>
        <p>
          Are you sure you want to {onDelete ? "delete" : "recover"}{" "}
          {secrets.length > 1 ? "secrets?" : "secret?"}
        </p>
        <br />
        <button
          onClick={() => {
            if (onDelete) {
              deleteSecrets();
            } else {
              recoverSecrets();
            }
            setActionType("List");
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            if (onDelete) {
              setOnDelete(false);
            } else {
              setOnRecover(false);
            }
            setSecrets([]);
          }}
        >
          No
        </button>
      </div>
    );
  };

  const getKeyVaultSection = () => {
    return (onDelete || onRecover) && getAreYouSureSection();
  };

  return (
    <>
      {tableType === "Secrets" && secrets !== undefined && secrets.length > 0 && (
        getKeyVaultSection()
      )}
    </>
  );
};

export default ActionButtons;
