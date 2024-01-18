import axios from "axios";
import { getLibraryBaseUrl, handleError2, getResponseMessage, toastErrorPopUp } from "./CommonService";

const baseUrl = `${getLibraryBaseUrl()}/changes`;

const getVGChanges = async (body, setLoading, setChanges) => {
  const url = `${baseUrl}/variables`;
  await getChanges(url, body, setLoading, setChanges);
};

const getSecretChanges = async (body, setLoading, setChanges) => {
  const url = `${baseUrl}/secrets`;
  await getChanges(url, body, setLoading, setChanges);
};

const getKVChanges = async (body, setLoading, setChanges) => {
  const url = `${baseUrl}/keyvaultcopies`;
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
        setChanges(operations);
      } else {
        toastErrorPopUp(getResponseMessage(status), "record_requesting", 1500);
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getVGChanges, getSecretChanges, getKVChanges };
