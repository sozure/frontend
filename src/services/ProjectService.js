import axios from "axios";
import {
  getBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
} from "./CommonService";

const baseUrl = `${getBaseUrl()}/project`;

const getProjects = async (
  organizationName,
  PAT,
  setResult,
  setProjectName,
  setSubscriptions,
  statusList
) => {
  const url = `${baseUrl}/get`;
  const body = {
    organization: organizationName,
    pat: PAT,
  };
  let subscriptions = [];
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let projects = res.data.data;
      projects.forEach((project) => {
        project.subscriptionIds.forEach((subscriptionId) =>
          subscriptions.push(subscriptionId)
        );
      });
      if (status === 1) {
        setResult(projects);
        setProjectName(projects[0].name);
        setSubscriptions(subscriptions);
      } else {
        toastErrorPopUp(getResponseMessage(status), "project_requesting", 1500);
      }
      statusList.push(status);
    })
    .catch((err) => {
      handleError2(err);
      statusList.push(-1);
    });
};

export { getProjects };
