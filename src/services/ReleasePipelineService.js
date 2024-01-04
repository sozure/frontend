import {
  getBaseUrl,
  getResponseMessage,
  handleError,
  handleError2,
  toastErrorPopUp,
} from "./CommonService";
import axios from "axios";

const baseUrl = `${getBaseUrl()}/ReleasePipeline`;

const getEnvironments = async (
  organization,
  project,
  pat,
  repositoryName,
  setResults,
  setLoading
) => {
  let url = `${baseUrl}/GetEnvironments`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
    repositoryName: repositoryName,
  };
  setLoading(true);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let environments = res.data.environments;
      setLoading(false);
      if (status === 1) {
        setResults(environments);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError(setLoading, err);
    });
};

const getVariableGroups = async (
  organization,
  project,
  pat,
  repositoryName,
  setResults
) => {
  let url = `${baseUrl}/GetVariableGroups`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
    repositoryName: repositoryName,
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.variableGroups;
      if (status === 1) {
        setResults(variableGroups);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

export { getEnvironments, getVariableGroups };
