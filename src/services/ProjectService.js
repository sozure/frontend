import axios from "axios";
import { getBaseUrl, handleError2, getResponseMessage } from "./CommonService";

const baseUrl = `${getBaseUrl()}/project`;

const getProjects = (
  organizationName,
  PAT,
  setResult,
  setAuthorized,
  setProjectName,
  setLoading
) => {
  const url = `${baseUrl}/get`;
  const body = {
    organization: organizationName,
    pat: PAT
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let projects = res.data.projects;
      setLoading(false);
      if (status === 0) {
        setResult(projects);
        setProjectName(projects[0].name);
      } else {
        alert(getResponseMessage(status));
      }
      setAuthorized(status === 0);
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getProjects };
