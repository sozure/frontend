import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
  getToastOnClose,
} from "./CommonService";

const baseUrl = `${getBaseUrl()}/gitrepository`;
const toastMs = getToastOnClose();

const getRepositories = async (
  organization,
  project,
  pat,
  setLoading,
  setRepositories
) => {
  let body = {
    organization: organization,
    project: project,
    pat: pat,
  };
  axios
    .post(baseUrl, body)
    .then(async (res) => {
      let status = res.data.status;
      let repositories = res.data.data;
      if (status === 1) {
        await setRepositories(repositories);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "repository_requesting",
          toastMs
        );
      }
      setLoading(false);
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

const getVariables = async (body, setLoading, setVariables) => {
  const url = `${baseUrl}/variables`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variables = res.data.data;
      setLoading(false);
      if (status === 1) {
        setVariables(variables);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variables_requesting",
          toastMs
        );
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getRepositories, getVariables };
