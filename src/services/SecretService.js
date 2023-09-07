import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "./CommonService";

const secretUrl = `${getBaseUrl()}/secret`;

const sendDeleteSecretRequest = (
  keyVaultName,
  secretRegex,
  callbackForLoading,
  callbackForDataSaving,
  callbackForOnDelete
) => {
  callbackForLoading(true);
  let url = `${secretUrl}/delete`;
  let body = {
    keyVaultName: keyVaultName,
    secretFilter: secretRegex,
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let secrets = res.data.secrets;
      callbackForLoading(false);
      callbackForOnDelete(false);
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

const sendListSecretRequest = (
  keyVaultName,
  secretRegex,
  callbackForDataSaving,
  callbackForLoading
) => {
  let url = `${secretUrl}?keyVaultName=${keyVaultName}&secretFilter=${secretRegex}`;
  callbackForLoading(true);
  axios
    .get(url)
    .then((res) => {
      let status = res.data.status;
      let secrets = res.data.secrets;
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

export { sendDeleteSecretRequest, sendListSecretRequest };
