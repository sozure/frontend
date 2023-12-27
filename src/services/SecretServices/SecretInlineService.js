import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage, toastErrorPopUp } from "../CommonService";

const secretUrl = `${getBaseUrl()}/secret`;

const sendRecoverSecretRequest = async (
  body,
  secrets,
  setSecrets,
  index,
  setLoading
) => {
  let url = `${secretUrl}/RecoverInline`;
  await sendRequest(url, body, secrets, setSecrets, index, setLoading);
};

const sendDeleteSecretRequest = async (
  body,
  secrets,
  setSecrets,
  index,
  setLoading
) => {
  let url = `${secretUrl}/DeleteInline`;
  await sendRequest(url, body, secrets, setSecrets, index, setLoading);
};

const sendRequest = async (url, body, secrets, setSecrets, index, setLoading) => {
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data;
      if (status === 0) {
        secrets.splice(index, 1);
        setSecrets(secrets);
      } else {
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", 1500);
      }
      setLoading(false);
    })
    .catch((err) => {
      handleError(setLoading, err);
    });
};

export { sendRecoverSecretRequest, sendDeleteSecretRequest };
