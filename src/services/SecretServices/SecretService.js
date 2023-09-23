import axios from "axios";
import {
  getBaseUrl,
  handleError,
  handleError2,
  getResponseMessage,
} from "../CommonService";

const secretUrl = `${getBaseUrl()}/secret`;

const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

let secrets = [
  {
    keyVault: "keyVault1",
    secretName: "secretName1",
    secretValue: "secretValue1",
  },
  {
    keyVault: "keyVault2",
    secretName: "secretName2",
    secretValue: "secretValue1",
  },
  {
    keyVault: "keyVault1",
    secretName: "secretName3",
    secretValue: "secretValue1",
  },
  {
    keyVault: "keyVault2",
    secretName: "secretName4",
    secretValue: "secretValue1",
  },
  {
    keyVault: "keyVault1",
    secretName: "secretName5",
    secretValue: "secretValue1",
  },
];

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

  // axios
  //   .get(url, axiosConfig)
  //   .then((res) => {
  //     let status = res.data.status;
  //     let secrets = getDeleted ? res.data.deletedSecrets : res.data.secrets;
  //     callbackForLoading(false);
  //     if (status === 0) {
  //       callbackForDataSaving(secrets);
  //     } else {
  //       alert(getResponseMessage(status));
  //     }
  //   })
  //   .catch((err) => {
  //     handleError(callbackForLoading, err);
  //   });
  
  callbackForLoading(false);
  callbackForDataSaving(secrets);
};

const sendCopyRequest = (body) => {
  let url = `${secretUrl}/copy`;
  // axios
  //   .post(url, body, axiosConfig)
  //   .then((res) => {
  //     let status = res.data.status;
  //     alert(getResponseMessage(status));
  //   })
  //   .catch((err) => {
  //     handleError2(err);
  //   });
  alert(getResponseMessage(0));
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
  // axios
  //   .post(url, body, axiosConfig)
  //   .then((res) => {
  //     let status = res.data.status;
  //     let secrets = res.data.deletedSecrets;
  //     callbackForLoading(false);
  //     callbackForOnSet(false);
  //     if (status === 0) {
  //       callbackForDataSaving(secrets);
  //     } else {
  //       alert(getResponseMessage(status));
  //     }
  //   })
  //   .catch((err) => {
  //     handleError(callbackForLoading, err);
  //     callbackForOnSet(false);
  //   });

  callbackForLoading(false);
  callbackForOnSet(false);
  callbackForDataSaving(secrets);
};

export {
  sendDeleteSecretRequest,
  sendListSecretRequest,
  sendCopyRequest,
  sendRecoverSecretRequest,
};