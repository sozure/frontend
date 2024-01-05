import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
} from "./CommonService";
const baseUrl = `${getBaseUrl()}/GitFile`;

const getConfigFiles = async (
  organization,
  pat,
  repositoryId,
  branch,
  setConfigFiles,
  setLoading
) => {
  setLoading(true);

  let url = `${baseUrl}/ConfigFiles`;
  let body = {
    organization: organization,
    repositoryId: repositoryId,
    pat: pat,
    branch: branch,
    extension: "",
  };
  axios
    .post(url, body)
    .then(async (res) => {
      let status = res.data.status;
      let configFiles = res.data.configFiles;
      if (status === 1) {
        await setConfigFiles(configFiles);
        setLoading(false);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "config_files_requesting",
          1500
        );
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getConfigFiles };
