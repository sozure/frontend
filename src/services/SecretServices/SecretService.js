import axios from "axios";
import {
  getBaseUrl,
  handleError,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
} from "../CommonService";

const secretUrl = `${getBaseUrl()}/secret`;

const sendDeleteSecretRequest = async (
  body,
  callbackForLoading,
  callbackForDataSaving,
  setOnDelete
) => {
  let url = `${secretUrl}/Delete`;
  await sendRequest(
    url,
    body,
    callbackForLoading,
    callbackForDataSaving,
    setOnDelete
  );
};

const sendListKeyVaultsRequest = async (
  body,
  callbackForLoading,
  callbackForDataSaving,
  setDefaultSubscription,
  callbackForAuth
) => {
  let url = `${secretUrl}/getkeyvaults`;
  callbackForLoading(true);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let keyVaults = res.data.keyVaults;
      callbackForLoading(false);
      if (status === 0) {
        callbackForAuth(true);
        callbackForDataSaving(keyVaults);
        setDefaultSubscription(res.data.subscriptionId);
      } else {
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", 1500);
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendListSecretRequest = async (
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
    secretFilter: message["secretRegex"],
    userName: message["userName"],
  };

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
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", 1500);
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendCopyRequest = async (body) => {
  let url = `${secretUrl}/copy`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      toastErrorPopUp(getResponseMessage(status), "secret_requesting", 1500);
    })
    .catch((err) => {
      handleError2(err);
    });
};

const sendRecoverSecretRequest = async (
  body,
  callbackForLoading,
  callbackForDataSaving,
  setOnRecover
) => {
  let url = `${secretUrl}/Recover`;
  await sendRequest(
    url,
    body,
    callbackForLoading,
    callbackForDataSaving,
    setOnRecover
  );
};

const sendRequest = async (
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
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", 1500);
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
  sendListKeyVaultsRequest,
};
