import axios from "axios";
import {
  getBaseUrl,
  handleError,
  handleError2,
  getResponseMessage,
} from "./CommonService";

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
  tenantId,
  clientId,
  clientSecret,
  keyVaultName,
  secretRegex,
  callbackForDataSaving,
  callbackForLoading,
  getDeleted
) => {
  let url = `${secretUrl}${
    getDeleted ? "/deleted" : ""
  }?keyVaultName=${keyVaultName}&secretFilter=${secretRegex}&tenantId=${tenantId}&clientId=${clientId}&clientSecret=${clientSecret}`;

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

const sendCopyRequest = (
  tenantId,
  clientId,
  clientSecret,
  fromKeyVault,
  toKeyVault,
  overrideSecret
) => {
  let url = `${secretUrl}/copy`;

  let body = {
    tenantId: tenantId,
    clientId: clientId,
    clientSecret: clientSecret,
    fromKeyVault: fromKeyVault,
    toKeyVault: toKeyVault,
    overrideSecret: overrideSecret,
  };

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

export { sendDeleteSecretRequest, sendListSecretRequest, sendCopyRequest };
