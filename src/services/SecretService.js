import axios from "axios";
import {
  getBaseUrl,
  handleError,
  handleError2,
  getResponseMessage,
} from "./CommonService";

const secretUrl = `${getBaseUrl()}/secret`;

const sendDeleteSecretRequest = (
  body,
  callbackForLoading,
  callbackForDataSaving,
  setOnDelete
) => {
  let url = `${secretUrl}/delete`;
  sendRequest(
    url,
    body,
    callbackForLoading,
    callbackForDataSaving,
    setOnDelete
  );
};

const sendDeleteSecretRequest2 = (
  body,
  secrets,
  setSecrets,
  index,
  setLoading
) => {
  let url = `${secretUrl}/delete`;
  sendRequest2(url, body, secrets, setSecrets, index, setLoading);
};

const sendListSecretRequest = (
  body,
  callbackForDataSaving,
  callbackForLoading,
  getDeleted
) => {
  let tenantId = body["tenantId"];
  let clientId = body["clientId"];
  let clientSecret = body["clientSecret"];
  let keyVaultName = body["keyVaultName"];
  let secretRegex = body["secretRegex"];

  let url = `${secretUrl}${
    getDeleted ? "/deleted" : ""
  }?keyVaultName=${keyVaultName}&secretFilter=${secretRegex}&tenantId=${tenantId}&clientId=${clientId}&clientSecret=${clientSecret}`;

  callbackForLoading(true);

  axios
    .get(url)
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
  let url = `${secretUrl}/recover`;
  sendRequest(
    url,
    body,
    callbackForLoading,
    callbackForDataSaving,
    setOnRecover
  );
};

const sendRecoverSecretRequest2 = (
  body,
  secrets,
  setSecrets,
  index,
  setLoading
) => {
  let url = `${secretUrl}/recover`;
  sendRequest2(url, body, secrets, setSecrets, index, setLoading);
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

const sendRequest2 = (url, body, secrets, setSecrets, index, setLoading) => {
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      if (status === 0) {
        secrets.splice(index, 1);
        setSecrets(secrets);
      } else {
        alert(getResponseMessage(status));
      }
      setLoading(false);
    })
    .catch((err) => {
      handleError(setLoading, err);
    });
};

export {
  sendDeleteSecretRequest,
  sendDeleteSecretRequest2,
  sendListSecretRequest,
  sendCopyRequest,
  sendRecoverSecretRequest,
  sendRecoverSecretRequest2,
};
