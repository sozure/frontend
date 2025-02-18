import axios from "axios";
import {
  getBaseUrl,
  getResponseMessage,
  getToastOnClose,
  handleError2,
  toastErrorPopUp,
  toastSuccessPopUp,
} from "./CommonService";

const baseUrl = `${getBaseUrl()}/buildpipeline`;
const toastMs = getToastOnClose();

const getBuildPipelines = async (
  organization,
  project,
  pat,
  setResults,
  setLoading
) => {
  let url = `${baseUrl}/getall`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
  };
  if (setLoading !== undefined) {
    setLoading(true);
  }
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let buildPipelines = res.data.data;
      if (status === 1) {
        setResults(buildPipelines);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "build_pipelines_requesting",
          toastMs
        );
      }
      if (setLoading !== undefined) {
        setLoading(false);
      }
    })
    .catch((err) => {
      handleError2(err);
      if (setLoading !== undefined) {
        setLoading(false);
      }
    });
};

const getRepositoryIdByBuildPipeline = async (
  organization,
  project,
  pat,
  definitionId,
  callback,
  setLoading,
  setResult
) => {
  let url = `${baseUrl}/getrepositoryid`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
    definitionId: Number(definitionId),
  };
  axios
    .post(url, body)
    .then(async (res) => {
      let status = res.data.status;
      let id = res.data.data;
      if (status === 1) {
        if (id !== "00000000-0000-0000-0000-000000000000") {
          await callback(organization, id, pat, setLoading, setResult);
        } else {
          setLoading(false);
          setResult([]);
          toastErrorPopUp(
            "Repository not found",
            "repository_id_build_pipelines_requesting",
            toastMs
          );
        }
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "repository_id_build_pipelines_requesting",
          toastMs
        );
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

const runBuildPipeline = async (
  organization,
  project,
  pat,
  definitionId,
  sourceBranch
) => {
  let url = `${baseUrl}/run`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
    definitionId: definitionId,
    sourceBranch: sourceBranch,
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data;
      let statusMessage = getResponseMessage(status);
      if (status === 1) {
        toastSuccessPopUp(statusMessage, "run-build", toastMs);
      } else {
        toastErrorPopUp(statusMessage, "run-build", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

export { getBuildPipelines, runBuildPipeline, getRepositoryIdByBuildPipeline };
