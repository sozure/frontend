import axios from "axios";
import { getLibraryBaseUrl, handleError2, getResponseMessage, toastErrorPopUp, toastSuccessPopUp, getToastOnClose } from "./CommonService";

const baseUrl = `${getLibraryBaseUrl()}/changes`;
const toastMs = getToastOnClose();

const getVGChanges = async (body, setLoading, setChanges) => {
  const url = `${baseUrl}/variables`;
  await getChanges(url, body, setLoading, setChanges);
};

const getSecretChanges = async (body, setLoading, setChanges) => {
  const url = `${baseUrl}/secrets`;
  await getChanges(url, body, setLoading, setChanges);
};

const getKVChanges = async (body, setLoading, setChanges) => {
  const url = `${baseUrl}/keyvaults`;
  await getChanges(url, body, setLoading, setChanges);
}

const getChanges = async (url, body, setLoading, setChanges) => {
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let operations = res.data.data;
      setLoading(false);
      if (status === 1) {
        toastSuccessPopUp("Successful changes requesting!", "changes_requesting", toastMs);
        setChanges(operations);
      } else {
        toastErrorPopUp(getResponseMessage(status), "record_requesting", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getVGChanges, getSecretChanges, getKVChanges };
