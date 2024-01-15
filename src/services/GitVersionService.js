import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
} from "./CommonService";
const baseUrl = `${getBaseUrl()}/GitVersion`;

const getBody = (organization, repositoryId, pat) => {
  return {
    organization: organization,
    repositoryId: repositoryId,
    pat: pat,
  }
}

const getBranches = async (organization, repositoryId, pat, setLoading, setBranches) => {
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
          1500
        );
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

const getTags = async (organization, repositoryId, pat, setLoading, setTags) => {
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
        toastErrorPopUp(
          getResponseMessage(status),
          "tag_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getBranches, getTags };