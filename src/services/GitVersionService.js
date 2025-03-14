import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
  getToastOnClose,
} from "./CommonService";
import { runBuildPipeline } from "./BuildPipelineService";
import { sortVersions } from "./HelperFunctions/TagHelperFunctions";

const baseUrl = `${getBaseUrl()}/gitversion`;
const toastMs = getToastOnClose();

const getBody = (organization, repositoryId, pat) => {
  return {
    organization: organization,
    repositoryId: repositoryId,
    pat: pat,
  };
};

const getBody2 = (organization, repositoryIds, pat) => {
  return {
    organization: organization,
    repositoryIds: repositoryIds,
    pat: pat,
  };
};

const getBranches = async (
  organization,
  repositoryId,
  pat,
  setLoading,
  setBranches
) => {
  let url = `${baseUrl}/branches`;
  let body = getBody(organization, repositoryId, pat);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let branches = res.data.data;
      setLoading(false);
      if (status === 1) {
        setBranches(branches);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "branch_requesting",
          toastMs
        );
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

const getTags = async (
  organization,
  repositoryId,
  pat,
  setLoading,
  setTags
) => {
  let url = `${baseUrl}/tags`;
  let body = getBody(organization, repositoryId, pat);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let tags = res.data.data;
      let sortedTags = sortVersions(tags);
      setLoading(false);
      if (status === 1) {
        setTags(sortedTags);
      } else {
        toastErrorPopUp(getResponseMessage(status), "tag_requesting", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

const queryLatestTags = async (
  organization,
  pat,
  repositories,
  setLoading,
  setLatestTags
) => {
  let url = `${baseUrl}/latesttags`;
  let repositoryIds = repositories.map((repository) => repository.repositoryId);
  let body = getBody2(organization, repositoryIds, pat);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let tags = res.data.data;
      if (status === 1) {
        setLatestTags(tags);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "latest_tags_requesting",
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

const createTag = async (
  model,
  latestTags,
  possibleNewTag,
  setLatestTags,
  cancel
) => {
  let url = `${baseUrl}/tagcreation`;
  let body = {
    organization: model.organization,
    project: model.project,
    pat: model.pat,
    repositoryId: model.repositoryId,
    tagName: model.tagName,
    userName: model.userName,
    description: model.description,
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let tag = res.data.data;
      if (status === 1) {
        let result = {};
        const keys = Object.keys(latestTags);
        keys.forEach((key) => {
          if (key === model.repositoryId) {
            result[key] = possibleNewTag;
          } else {
            result[key] = tag;
          }
        });
        setLatestTags(result);
        runBuildPipeline(
          model.organization,
          model.project,
          model.pat,
          model.definitionId,
          tag
        );
        cancel();
      } else {
        toastErrorPopUp(getResponseMessage(status), "tag_requesting", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

export { getBranches, getTags, createTag, queryLatestTags };
