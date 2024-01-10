import {
  getBaseUrl,
  getResponseMessage,
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
  configFile,
  setResults
) => {
  let url = `${baseUrl}/GetEnvironments`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
    repositoryName: repositoryName,
    configFile: configFile
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let environments = res.data.data;
      if (status === 1) {
        setResults(environments);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "environment_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

const getVariableGroups = async (
  organization,
  project,
  pat,
  repositoryName,
  configFile,
  setResults
) => {
  let url = `${baseUrl}/GetVariableGroups`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
    repositoryName: repositoryName,
    configFile: configFile
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.data;
      if (status === 1) {
        setResults(variableGroups);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_group_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

const getProjectsWithReleasePipeline = async (
  organization,
  projects,
  pat,
  repositoryName,
  configFile,
  setResults,
  setLoading
) => {
  let url = `${baseUrl}/GetProjects`;
  let body = {
    organization: organization,
    projects: projects,
    pat: pat,
    repositoryName: repositoryName,
    configFile: configFile
  };
  setLoading(true);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let projects = res.data.data;
      if (status === 1) {
        setResults(projects);
      } else {
        toastErrorPopUp(getResponseMessage(status), "project_requesting", 1500);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })
    .catch((err) => {
      handleError2(err);
    });
};

export { getEnvironments, getVariableGroups, getProjectsWithReleasePipeline };
