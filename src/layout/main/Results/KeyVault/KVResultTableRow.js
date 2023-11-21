import PropTypes from "prop-types";
import React, { useContext } from "react";
import { v4 } from "uuid";
import { FaCopy } from "react-icons/fa";

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
  sendDeleteSecretRequest,
  sendRecoverSecretRequest,
} from "../../../../services/SecretServices/SecretInlineService";
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
  const maxLengthOfSecretValue = 60;

  const sendRecover = () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVault,
      secretFilter: secretName,
    };
    setLocalLoading({ loading: true, row: index });
    sendRecoverSecretRequest(body, secrets, setSecrets, index, setLocalLoading);
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
    setLocalLoading({ loading: true, row: index });
    sendDeleteSecretRequest(body, secrets, setSecrets, index, setLocalLoading);
    setOnSingleModificationBack(setOnSingleModification);
  };

  const startDelete = (row) => {
    let model = { row: row, operation: "deletion", modification: true };
    setOnSingleModification(model);
  };

  const cancelDelete = () => {
    setOnSingleModificationBack(setOnSingleModification);
  };

  const getSecretValue = () => {
    return secretValue.length > maxLengthOfSecretValue ? (
      `${secretValue.substring(0, maxLengthOfSecretValue)}...`
    ) : (
      <td key={v4()}>{secretValue}</td>
    );
  };

  const getRecoverSection = () => {
    return onSingleModification.modification &&
      onSingleModification.row === index ? (
      <>
        <button onClick={sendRecover}>
          <AiOutlineCheck />
        </button>

        <button onClick={cancelRecover}>
          <AiOutlineClose />
        </button>
      </>
    ) : (
      <>
        {localLoading.row === index && localLoading.loading ? (
          <></>
        ) : (
          <abbr title="Recover">
            <button onClick={() => startRecover(index)}>
              <AiFillMedicineBox />
            </button>
          </abbr>
        )}
      </>
    );
  };

  const getApproveDeniedSection = () => {
    return (
      <>
        <button onClick={sendDelete}>
          <AiOutlineCheck />
        </button>

        <button onClick={cancelDelete}>
          <AiOutlineClose />
        </button>
      </>
    );
  };

  const deleteSection = () => {
    return (
      <>
        {localLoading.row === index && localLoading.loading ? (
          <></>
        ) : (
          <abbr title="Delete">
            <button onClick={() => startDelete(index)}>
              <AiFillDelete />
            </button>
          </abbr>
        )}
      </>
    );
  };

  const getActionSection = () => {
    return onSingleModification.modification &&
      onSingleModification.row === index
      ? getApproveDeniedSection()
      : deleteSection();
  };

  return (
    <tr key={v4()}>
      <td key={v4()}>{keyVault}</td>
      <td key={v4()}>{secretName}</td>
      {secretValue === null || secretValue === undefined ? (
        <td key={v4()}>Deleted secret. Can't show it's value.</td>
      ) : (
        getSecretValue()
      )}
      <td key={v4()}>
      <abbr title={"Copy value to clipboard"}>
          <button
            onClick={() =>
              navigator.clipboard.writeText(secretValue)
            }
          >
            <FaCopy />
          </button>
          </abbr>
          {" "}
        {secretValue === null || secretValue === undefined
          ? getRecoverSection()
          : getActionSection()
          }
        {localLoading.row === index && localLoading.loading ? (
          <span>Loading...</span>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
};

KVResultTableRow.propTypes = {
  keyVault: PropTypes.string.isRequired,
  secretName: PropTypes.string.isRequired,
  secretValue: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default KVResultTableRow;
