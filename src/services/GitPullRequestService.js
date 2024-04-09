import axios from "axios";
import { getBaseUrl, getResponseMessage, getToastOnClose, handleError2, toastErrorPopUp } from "./CommonService";

const baseUrl = `${getBaseUrl()}/gitpullrequest`;
const toastMs = getToastOnClose();

const getPullRequests = async (
  organization,
  project,
  pat,
  setLoading,
  setPullRequests
) => {
  let body = {
    organization: organization,
    project: project,
    pat: pat,
  };
  axios
    .post(`${baseUrl}/prs`, body)
    .then(async (res) => {
      let status = res.data.status;
      let pullRequests = res.data.data;
      console.log(res.data);
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

export { getPullRequests };