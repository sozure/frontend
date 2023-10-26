import axios from "axios";
import {
  getBaseUrl,
  handleError,
  handleError2,
  getResponseMessage,
} from "../CommonService";

const secretUrl = `${getBaseUrl()}/secret`;

const sendDeleteSecretRequest = (
  body,
  callbackForLoading,
  callbackForDataSaving,
  setOnDelete
) => {
  let url = `${secretUrl}/Delete`;
  sendRequest(
    url,
    body,
    callbackForLoading,
    callbackForDataSaving,
    setOnDelete
  );
};

const sendListSecretRequest = (
  message,
  callbackForDataSaving,
  callbackForLoading,
  getDeleted
) => {
  let url = `${secretUrl}${getDeleted ? "/GetDeleted" : "/Get"}`;
  const body = {
    tenantId: message["tenantId"],
    clientId: message["clientId"],
    clientSecret: message["clientSecret"],
    keyVaultName: message["keyVaultName"],
    secretFilter: message["secretRegex"]
  }

  callbackForLoading(true);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let secrets = getDeleted ? res.data.deletedSecrets : res.data.secrets;
      callbackForLoading(false);
      if (status === 0) {
        callbackForDataSaving(secrets);
      } else {
        alert(getResponseMessage(status));
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendCopyRequest = (body) => {
  let url = `${secretUrl}/copy`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      alert(getResponseMessage(status));
    })
    .catch((err) => {
      handleError2(err);
    });
};

const sendRecoverSecretRequest = (
  body,
  callbackForLoading,
  callbackForDataSaving,
  setOnRecover
) => {
  let url = `${secretUrl}/Recover`;
  sendRequest(
    url,
    body,
    callbackForLoading,
    callbackForDataSaving,
    setOnRecover
  );
};

const sendRequest = (
  url,
  body,
  callbackForLoading,
  callbackForDataSaving,
  callbackForOnSet
) => {
  callbackForLoading(true);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let secrets = res.data.deletedSecrets;
      callbackForLoading(false);
      callbackForOnSet(false);
      if (status === 0) {
        callbackForDataSaving(secrets);
      } else {
        alert(getResponseMessage(status));
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
      callbackForOnSet(false);
    });
};

export {
  sendDeleteSecretRequest,
  sendListSecretRequest,
  sendCopyRequest,
  sendRecoverSecretRequest,
};
