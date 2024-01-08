import axios from "axios";
import { getBaseUrl, handleError2, getResponseMessage, toastErrorPopUp } from "./CommonService";

const baseUrl = `${getBaseUrl()}/profile`;

const getProfile = async (organizationName, PAT, setProfileName, statusList) => {
  const url = `${baseUrl}/get`;
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
      } else {
        toastErrorPopUp(getResponseMessage(status), "profile_requesting", 1500);
      }
      statusList.push(status);
    })
    .catch((err) => {
      handleError2(err);
      statusList.push(-1);
    });
};

export { getProfile };