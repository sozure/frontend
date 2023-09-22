import React, { useContext } from "react";

import {
  ActionTypeContext,
  ClientIdContext,
  ClientSecretContext,
  KeyVaultNameContext,
  LoadingContext,
  OnDeleteContext,
  OnRecoverContext,
  SecretContext,
  SecretRegexContext,
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
  const { secretRegex } = useContext(SecretRegexContext);
  const { secrets, setSecrets } = useContext(SecretContext);
  const { tableType } = useContext(TableTypeContext);
  const { setLoading } = useContext(LoadingContext);
  const { onRecover, setOnRecover } = useContext(OnRecoverContext);
  const { onDelete, setOnDelete } = useContext(OnDeleteContext);

  const deleteSecrets = () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVaultName,
      secretFilter: secretRegex,
    };

    sendDeleteSecretRequest(body, setLoading, setSecrets, setOnDelete);
  };

  const recoverSecrets = () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVaultName,
      secretFilter: secretRegex,
    };

    sendRecoverSecretRequest(body, setLoading, setSecrets, setOnRecover);
  };

  return (
    <>
      {tableType === "KV" && secrets !== undefined && secrets.length > 0 ? (
        onDelete | onRecover ? (
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
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default ActionButtons;
