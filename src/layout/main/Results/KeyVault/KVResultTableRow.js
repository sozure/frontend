import PropTypes from "prop-types";
import React, { useContext } from "react";
import { v4 } from "uuid";

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
  OnDeleteContext,
  OnRecoverContext,
  ProfileNameContext,
  SecretsContext,
  SingleModificationContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import {
  sendDeleteSecretRequest,
  sendRecoverSecretRequest,
} from "../../../../services/SecretServices/SecretInlineService";
import { setOnSingleModificationBack } from "../../../../services/CommonService";
import CopyButton from "../../CopyButton";

const KVResultTableRow = ({ keyVault, secretName, secretValue, index }) => {
  const { onSingleModification, setOnSingleModification } = useContext(
    SingleModificationContext
  );
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { secrets, setSecrets } = useContext(SecretsContext);
  const { localLoading, setLocalLoading } = useContext(LocalLoadingContext);
  const { onRecover } = useContext(OnRecoverContext);
  const { profileName } = useContext(ProfileNameContext);
  const { onDelete } = useContext(OnDeleteContext);
  const maxLengthOfSecretValue = 60;

  const sendRecover = async () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVault,
      secretFilter: secretName,
      userName: profileName,
    };
    setLocalLoading({ loading: true, row: index });
    await sendRecoverSecretRequest(
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

  const sendDelete = async () => {
    let body = {
      tenantId: tenantId,
      clientId: clientId,
      clientSecret: clientSecret,
      keyVaultName: keyVault,
      secretFilter: secretName,
      userName: profileName,
    };
    setLocalLoading({ loading: true, row: index });
    await sendDeleteSecretRequest(
      body,
      secrets,
      setSecrets,
      index,
      setLocalLoading
    );
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
      <td key={v4()}>
        `${secretValue.substring(0, maxLengthOfSecretValue)}...`
      </td>
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

  const getButtonSection = () => {
    return (
      <td key={v4()}>
        {secretValue === null ||
        (onSingleModification.modification &&
          onSingleModification.row === index) ||
        (localLoading.row === index && localLoading.loading) ? (
          <></>
        ) : (
          <CopyButton value={secretValue} />
        )}{" "}
        {secretValue === null || secretValue === undefined
          ? getRecoverSection()
          : getActionSection()}
        {localLoading.row === index && localLoading.loading ? (
          <span>Loading...</span>
        ) : (
          <></>
        )}
      </td>
    );
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
      {!onDelete && !onRecover ? getButtonSection() : <></>}
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
