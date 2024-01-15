import axios from "axios";
import {
  getBaseUrl,
  getResponseMessage,
  handleError2,
  toastErrorPopUp,
} from "./CommonService";

const baseUrl = `${getBaseUrl()}/BuildPipeline`;

const getBuildPipelines = async (
  organization,
  project,
  pat,
  setResults,
  setLoading
) => {
  let url = `${baseUrl}/GetAll`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
  };
  setLoading(true);
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
          1500
        );
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })
    .catch((err) => {
      handleError2(err);
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
  let url = `${baseUrl}/GetRepositoryId`;
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
        await callback(organization, id, pat, setLoading, setResult);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "repository_id_build_pipelines_requesting",
          1500
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
  sourceBranch,
  setLoading,
  setResult
) => {
  let url = `${baseUrl}/Run`;
  let body = {
    organization: organization,
    project: project,
    pat: pat,
    definitionId: definitionId,
    sourceBranch: sourceBranch,
  };
  setLoading(true);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data;
      if (status !== 1) {
        toastErrorPopUp(
          getResponseMessage(status),
          "run_build_pipeline_requesting",
          1500
        );
      } else {
        setResult({id: definitionId, success: true});
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })
    .catch((err) => {
      handleError2(err);
    });
};

export { getBuildPipelines, runBuildPipeline, getRepositoryIdByBuildPipeline };
