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
import MatUIButton from "../../../MatUIButton";

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
      userName: profileName,
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
      userName: profileName,
    };

    await sendRecoverSecretRequest(body, setLoading, setSecrets, setOnRecover);
  };

  const topStyles = {
    display: "flex",
    flexDirection: "row", // Align children horizontally
  };

  const getAreYouSureSection = () => {
    return (
      <div>
        <br />
        <p>
          Are you sure you want to {onDelete ? "delete" : "recover"}{" "}
          {secrets.length > 1 ? "secrets?" : "secret?"}
        </p>
        <br />
        <div style={topStyles}>
          <MatUIButton
            id={"delete_or_recover"}
            send={() => {
              if (onDelete) {
                deleteSecrets();
              } else {
                recoverSecrets();
              }
              setActionType("List");
            }}
            displayName={"Yes"}
          />
          <MatUIButton
            id={"cancel_delete_or_recover"}
            send={() => {
              if (onDelete) {
                setOnDelete(false);
              } else {
                setOnRecover(false);
              }
              setSecrets([]);
            }}
            displayName={"No"}
          />
        </div>
      </div>
    );
  };

  const getKeyVaultSection = () => {
    return (onDelete || onRecover) && getAreYouSureSection();
  };

  return (
    <>
      {tableType === "Secrets" &&
        secrets !== undefined &&
        secrets.length > 0 &&
        getKeyVaultSection()}
    </>
  );
};

export default ActionButtons;
