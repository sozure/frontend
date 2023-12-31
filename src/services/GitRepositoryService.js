import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
} from "./CommonService";
const baseUrl = `${getBaseUrl()}/gitrepository`;

const getRepositories = async (organization, project, pat, setLoading, setRepositories) => {
  let body = {
    organization: organization,
    project: project,
    pat: pat,
  };
  axios
    .post(baseUrl, body)
    .then((res) => {
      let status = res.data.status;
      let repositories = res.data.repositories;
      setLoading(false);
      if (status === 1) {
        setRepositories(repositories);
      } else {
        toastErrorPopUp(getResponseMessage(status), "repository_requesting", 1500);
      }
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
      let variables = res.data.variables;
      setLoading(false);
      if (status === 1) {
        setVariables(variables);
      } else {
        toastErrorPopUp(getResponseMessage(status), "variables_requesting", 1500);
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getRepositories, getVariables };