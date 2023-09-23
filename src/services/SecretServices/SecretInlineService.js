import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "../CommonService";

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

const sendRecoverSecretRequest = (
  body,
  secrets,
  setSecrets,
  index,
  setLoading
) => {
  let url = `${secretUrl}/RecoverInline`;
  sendRequest(url, body, secrets, setSecrets, index, setLoading);
};

const sendDeleteSecretRequest = (
  body,
  secrets,
  setSecrets,
  index,
  setLoading
) => {
  let url = `${secretUrl}/DeleteInline`;
  sendRequest(url, body, secrets, setSecrets, index, setLoading);
};

const sendRequest = (url, body, secrets, setSecrets, index, setLoading) => {
  // axios
  //   .post(url, body, axiosConfig)
  //   .then((res) => {
  //     let status = res.data;
  //     if (status === 0) {
  //       secrets.splice(index, 1);
  //       setSecrets(secrets);
  //     } else {
  //       alert(getResponseMessage(status));
  //     }
  //     setLoading(false);
  //   })
  //   .catch((err) => {
  //     handleError(setLoading, err);
  //   });

  secrets.splice(index, 1);
  setSecrets(secrets);
};

export { sendRecoverSecretRequest, sendDeleteSecretRequest };
