import axios from "axios";
import {
  getLibraryBaseUrl,
  handleError,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
  toastSuccessPopUp,
  getToastOnClose,
} from "../CommonService";

const secretUrl = `${getLibraryBaseUrl()}/secret`;
const toastMs = getToastOnClose();

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
  callbackForDataSaving,
  setDefaultSubscription,
  setLoading
) => {
  let url = `${secretUrl}/GetKeyVaults`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let keyVaults = res.data.data;
      setLoading(false);
      if (status === 1) {
        callbackForDataSaving(keyVaults);
        setDefaultSubscription(res.data.additionalData);
        toastSuccessPopUp("Success", "secret_requesting", toastMs);
      } else {
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
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
      let secrets = res.data.data;
      callbackForLoading(false);
      if (status === 1) {
        callbackForDataSaving(secrets);
        toastSuccessPopUp("Success", "secret_requesting", toastMs);
      } else {
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", toastMs);
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendCopyRequest = async (body) => {
  let url = `${secretUrl}/Copy`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data;
      let statusMessage = getResponseMessage(status);
      if(status === 1){
        toastSuccessPopUp(statusMessage, "secret_requesting", toastMs);
      } else {
        toastErrorPopUp(statusMessage, "secret_requesting", toastMs);
      }
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
      let secrets = res.data.data;
      callbackForLoading(false);
      callbackForOnSet(false);
      if (status === 1) {
        callbackForDataSaving(secrets);
      } else {
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", toastMs);
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
