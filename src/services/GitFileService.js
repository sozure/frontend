import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
  getToastOnClose,
} from "./CommonService";

const baseUrl = `${getBaseUrl()}/GitFile`;
const toastMs = getToastOnClose();

const yamlFilter = process.env.REACT_APP_YAML_FILTER;
const jsonFilter = process.env.REACT_APP_JSON_FILTER;

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
      let configFiles = res.data.data;
      if (status === 1) {
        let result = [];
        configFiles.forEach(element => {
          if(element.includes(yamlFilter) || element.includes(jsonFilter)){
            result.push(element);
          }
        });
        await setConfigFiles(result);
        setLoading(false);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "config_files_requesting",
          toastMs
        );
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getConfigFiles };
