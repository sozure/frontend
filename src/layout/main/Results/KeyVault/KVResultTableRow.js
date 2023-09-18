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
  SingleModificationContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import {
  sendDeleteSecretRequest2,
  sendRecoverSecretRequest2,
} from "../../../../services/SecretService";

const KVResultTableRow = ({ secrets, keyVault, secretName, secretValue, index }) => {
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);

  const sendRecover = () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVault,
      secretFilter: secretName,
    };

    sendRecoverSecretRequest2(body);
    setOnSingleModificationBack();
    secrets.splice(index, 1);
  };

  const startRecover = (row) => {
    let model = { row: row, operation: "recover", modification: true };
    setOnSingleModification(model);
  };

  const cancelRecover = () => {
    setOnSingleModificationBack();
  };

  const sendDelete = () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVault,
      secretFilter: secretName,
    };
    
    sendDeleteSecretRequest2(body);
    setOnSingleModificationBack();
    secrets.splice(index, 1);
  };

  const startDelete = (row) => {
    let model = { row: row, operation: "deletion", modification: true };
    setOnSingleModification(model);
  };

  const cancelDelete = () => {
    setOnSingleModificationBack();
  };

  const setOnSingleModificationBack = () => {
    let model = { row: 0, operation: "", modification: false };
    setOnSingleModification(model);
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
