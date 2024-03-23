import axios from "axios";
import { getLibraryBaseUrl, handleError, getResponseMessage, toastErrorPopUp, getToastOnClose } from "../CommonService";

const secretUrl = `${getLibraryBaseUrl()}/secret`;
const toastMs = getToastOnClose();

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
      if (status === 1) {
        secrets.splice(index, 1);
        setSecrets(secrets);
      } else {
        toastErrorPopUp(getResponseMessage(status), "secret_requesting", toastMs);
      }
      setLoading(false);
    })
    .catch((err) => {
      handleError(setLoading, err);
    });
};

export { sendRecoverSecretRequest, sendDeleteSecretRequest };
