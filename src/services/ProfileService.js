import axios from "axios";
import { getBaseUrl, handleError2, getResponseMessage } from "./CommonService";

const baseUrl = `${getBaseUrl()}/profile`;

const getProfile = (organizationName, PAT, setProfileName, setAuthorized, setLoading) => {
  const url = `${baseUrl}/get`;
  const body = {
    organization: organizationName,
    pat: PAT,
  };
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let profile = res.data.profile;
      setLoading(false);
      if (status === 0) {
        setProfileName(profile.displayName);
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

export { getProfile };