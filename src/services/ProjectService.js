import axios from "axios";
import {
  getLibraryBaseUrl,
  handleError2,
  getResponseMessage,
  toastErrorPopUp,
  toastSuccessPopUp,
  getToastOnClose,
} from "./CommonService";

const baseUrl = `${getLibraryBaseUrl()}/project`;
const toastMs = getToastOnClose();

const getProjects = async (
  organizationName,
  PAT,
  setResult,
  setProjectName,
  setSubscriptions,
  setLoading
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
        toastSuccessPopUp("Successful project requesting!", "project_requesting", toastMs);
        setResult(projects);
        setProjectName(projects[0].name);
        setSubscriptions(subscriptions);
      } else {
        toastErrorPopUp(getResponseMessage(status), "project_requesting", toastMs);
        setLoading(false);
      }
    })
    .catch((err) => {
      handleError2(err);
      setLoading(false);
    });
};

export { getProjects };
