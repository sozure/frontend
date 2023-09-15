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
  callbackForLoading(true);
  let url = `${secretUrl}/delete`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let secrets = res.data.deletedSecrets;
      callbackForLoading(false);
      setOnDelete(false);
      if (status === 0) {
        callbackForDataSaving(secrets);
      } else {
        alert(getResponseMessage(status));
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
      setOnDelete(false);
    });
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
  callbackForLoading(true);
  let url = `${secretUrl}/recover`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let secrets = res.data.deletedSecrets;
      callbackForLoading(false);
      setOnRecover(false);
      if (status === 0) {
        callbackForDataSaving(secrets);
      } else {
        alert(getResponseMessage(status));
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
      setOnRecover(false);
    });
};

export { sendDeleteSecretRequest, sendListSecretRequest, sendCopyRequest, sendRecoverSecretRequest };
