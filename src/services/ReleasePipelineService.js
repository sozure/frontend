import {
  getBaseUrl,
  getResponseMessage,
  getToastOnClose,
  handleError2,
  toastErrorPopUp,
} from "./CommonService";
import axios from "axios";
import { syncVariableGroups } from "./VariableGroupServices/VariableGroupService";

const baseUrl = `${getBaseUrl()}/ReleasePipeline`;
const toastMs = getToastOnClose();

const getEnvironments = async (
  body,
  setResults
) => {
  let url = `${baseUrl}/GetEnvironments`;
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
          toastMs
        );
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

const getVariableGroups = async (
  body,
  syncVariables,
  profileName,
  setContainingVGs,
  setResults,
  setLoading
) => {
  let url = `${baseUrl}/GetVariableGroups`;
  axios
    .post(url, body)
    .then((res) => {
      let counter = 0;
      let result = [];
      let status = res.data.status;
      let variableGroups = res.data.data;
      if (status === 1) {
        setResults(variableGroups);
        syncVariables.forEach(async (variable) => {
          let newBody = {
            projectName: body["project"],
            pat: body["pat"],
            userName: profileName,
            vgRegex: ".*",
            keyRegex: variable,
            organizationName: body["organization"],
            index: counter,
            secretIncluded: true,
            containsKey: true,
            potentialVariableGroups: variableGroups,
          };
          counter++;
          await syncVariableGroups(
            newBody,
            result,
            syncVariables.length,
            setContainingVGs,
            setLoading
          );
        });
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_group_requesting",
          toastMs
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
    configFile: configFile,
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
        toastErrorPopUp(getResponseMessage(status), "project_requesting", toastMs);
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
