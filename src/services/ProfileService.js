import axios from "axios";
import { getBaseUrl, handleError2, getResponseMessage, toastErrorPopUp, toastSuccessPopUp, getToastOnClose } from "./CommonService";

const baseUrl = `${getBaseUrl()}/profile`;
const toastMs = getToastOnClose();

const getProfile = async (organizationName, PAT, setProfileName, statusList) => {
  const url = `${baseUrl}`;
  const body = {
    organization: organizationName,
    pat: PAT,
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let profile = res.data.data;
      if (status === 1) {
        setProfileName(profile.displayName);
        toastSuccessPopUp("Successful profile requesting!", "project_requesting", toastMs);
      } else {
        toastErrorPopUp(getResponseMessage(status), "profile_requesting", toastMs);
      }
      statusList.push(status);
    })
    .catch((err) => {
      handleError2(err);
      statusList.push(-1);
    });
};

export { getProfile };