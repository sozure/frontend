import axios from "axios";
import {
  getBaseUrl,
  getResponseMessage,
  getToastOnClose,
  handleError2,
  toastErrorPopUp,
  toastSuccessPopUp,
} from "./CommonService";

const baseUrl = `${getBaseUrl()}/gitpullrequest`;
const toastMs = getToastOnClose();

const getPullRequests = async (
  basicData,
  setLoading,
  setPullRequests
) => {
  let organization = basicData["organization"];
  let pat = basicData["pat"];
  let project = basicData["project"];
  let body = {
    organization: organization,
    pat: pat,
    project: project,
  };
  axios
    .post(`${baseUrl}/get`, body)
    .then(async (res) => {
      let status = res.data.status;
      let pullRequests = res.data.data;
      if (status === 1) {
        await setPullRequests(pullRequests);
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

const createPullRequests = async (
  basicData,
  repositories,
  sourceBranch,
  targetBranch,
  title,
  autocomplete
) => {
  let organization = basicData["organization"];
  let pat = basicData["pat"];
  let project = basicData["project"];
  let body = {
    organization: organization,
    pat: pat,
    project: project,
    repositories: repositories,
    sourceBranch: sourceBranch,
    targetBranch: targetBranch,
    title: title,
    autoComplete: autocomplete
  };
  axios
    .post(`${baseUrl}/createmultiple`, body)
    .then(async (res) => {
      let status = res.data.status;
      let statusMessage = getResponseMessage(status);
      if (status === 1) {
        toastSuccessPopUp(statusMessage, "create-prs", toastMs);
      } else {
        toastErrorPopUp(statusMessage, "create_prs", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

const createPullRequest = async (
  basicData,
  repository,
  sourceBranch,
  targetBranch,
  title,
  autoComplete
) => {
  let organization = basicData["organization"];
  let pat = basicData["pat"];
  let project = basicData["project"];
  let body = {
    organization: organization,
    pat: pat,
    project: project,
    repository: repository,
    sourceBranch: sourceBranch,
    targetBranch: targetBranch,
    title: title,
    autoComplete: autoComplete
  };
  axios
    .post(`${baseUrl}/create`, body)
    .then(async (res) => {
      let status = res.data.status;
      let statusMessage = getResponseMessage(status);
      if (status === 1) {
        toastSuccessPopUp(statusMessage, "create-pr", toastMs);
      } else {
        toastErrorPopUp(statusMessage, "create_pr", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

export { getPullRequests, createPullRequests, createPullRequest };
