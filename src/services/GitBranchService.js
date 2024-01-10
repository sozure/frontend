import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
} from "./CommonService";
const baseUrl = `${getBaseUrl()}/gitbranch`;

const getBranches = async (organization, repositoryId, pat, setLoading, setBranches) => {
  let body = {
    organization: organization,
    repositoryId: repositoryId,
    pat: pat,
  };

  axios
    .post(baseUrl, body)
    .then((res) => {
      let status = res.data.status;
      let branches = res.data.data;
      setLoading(false);
      if (status === 1) {
        setBranches(branches);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "repository_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getBranches };