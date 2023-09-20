import React, { useContext } from "react";
import {
  AiFillMedicineBox,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import {
  ClientIdContext,
  ClientSecretContext,
  LocalLoadingContext,
  SecretContext,
  SingleModificationContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import {
  sendDeleteSecretRequest2,
  sendRecoverSecretRequest2,
} from "../../../../services/SecretService";
import { setOnSingleModificationBack } from "../../../../services/CommonService";

const KVResultTableRow = ({ keyVault, secretName, secretValue, index }) => {
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { secrets, setSecrets } = useContext(SecretContext);
  const { localLoading, setLocalLoading } = useContext(LocalLoadingContext);

  const sendRecover = () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVault,
      secretFilter: secretName,
    };
    setLocalLoading(true);
    sendRecoverSecretRequest2(
      body,
      secrets,
      setSecrets,
      index,
      setLocalLoading
    );
    setOnSingleModificationBack(setOnSingleModification);
  };

  const startRecover = (row) => {
    let model = { row: row, operation: "recover", modification: true };
    setOnSingleModification(model);
  };

  const cancelRecover = () => {
    setOnSingleModificationBack(setOnSingleModification);
  };

  const sendDelete = () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVault,
      secretFilter: secretName,
    };
    setLocalLoading(true);
    sendDeleteSecretRequest2(body, secrets, setSecrets, index, setLocalLoading);
    setOnSingleModificationBack(setOnSingleModification);
  };

  const startDelete = (row) => {
    let model = { row: row, operation: "deletion", modification: true };
    setOnSingleModification(model);
  };

  const cancelDelete = () => {
    setOnSingleModificationBack(setOnSingleModification);
  };

  return (
    <tr key={Math.random()}>
      <td key={Math.random()}>{keyVault}</td>
      <td key={Math.random()}>{secretName}</td>
      {secretValue === null || secretValue === undefined ? (
        <td key={Math.random()}>Deleted secret. Can't show it's value.</td>
      ) : secretValue.length > 85 ? (
        <button onClick={() => alert(secretValue)}>Show secret value</button>
      ) : (
        <td key={Math.random()}>{secretValue}</td>
      )}
      {secretValue === null || secretValue === undefined ? (
        onSingleModification.modification &&
        onSingleModification.row === index ? (
          <>
            <button onClick={() => sendRecover()}>
              <AiOutlineCheck />
            </button>

            <button onClick={() => cancelRecover()}>
              <AiOutlineClose />
            </button>
            {localLoading ? <span>Loading...</span> : <></>}
          </>
        ) : (
          <abbr title="Recover">
            <button onClick={() => startRecover(index)}>
              <AiFillMedicineBox />
            </button>
          </abbr>
        )
      ) : onSingleModification.modification &&
        onSingleModification.row === index ? (
        <>
          <button onClick={() => sendDelete()}>
            <AiOutlineCheck />
          </button>

          <button onClick={() => cancelDelete()}>
            <AiOutlineClose />
          </button>
          {localLoading ? <span>Loading...</span> : <></>}
        </>
      ) : (
        <abbr title="Delete">
          <button onClick={() => startDelete(index)}>
            <AiFillDelete />
          </button>
        </abbr>
      )}
    </tr>
  );
};

export default KVResultTableRow;
