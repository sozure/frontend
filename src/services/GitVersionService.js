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

const baseUrl = `${getBaseUrl()}/GitVersion`;
const toastMs = getToastOnClose();

const getBody = (organization, repositoryId, pat) => {
  return {
    organization: organization,
    repositoryId: repositoryId,
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
  let url = `${baseUrl}/Branches`;
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
  let url = `${baseUrl}/Tags`;
  let body = getBody(organization, repositoryId, pat);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let tags = res.data.data;
      setLoading(false);
      if (status === 1) {
        setTags(tags);
      } else {
        toastErrorPopUp(getResponseMessage(status), "tag_requesting", toastMs);
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

const queryLatestTag = async (
  organization,
  repositoryId,
  pat,
  setLoading,
  helperLatestTags,
  setLatestTags
) => {
  let url = `${baseUrl}/Tags`;
  let body = getBody(organization, repositoryId, pat);
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let tags = res.data.data;
      if (status === 1) {
        let latestTag = getLatestTag(tags);
        helperLatestTags.push({ repositoryId: repositoryId, tag: latestTag });
        setLatestTags(helperLatestTags);
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
  let result = [];
  repositories.forEach(async (repository) => {
    await queryLatestTag(
      organization,
      repository.repositoryId,
      pat,
      setLoading,
      result,
      setLatestTags
    );
  });
  setLoading(false);
};

const createTag = async (
  model,
  latestTags,
  possibleNewTag,
  setLatestTags,
  cancel
) => {
  let url = `${baseUrl}/Tag/Create`;
  let repositoryName = model.repositoryName;
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
        let result = [];
        latestTags.forEach((tag) => {
          if (tag.name === repositoryName) {
            let newTag = { name: repositoryName, tag: possibleNewTag };
            result.push(newTag);
          } else {
            result.push(tag);
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

const getLatestTag = (tags) => {
  if (tags.length === 0) {
    return "";
  }
  let sortedTags = sortVersions(tags);
  return sortedTags[sortedTags.length - 1].replace("refs/tags/", "");
};

export { getBranches, getTags, createTag, queryLatestTags };
