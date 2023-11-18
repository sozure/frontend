import axios from "axios";
import { getBaseUrl, handleError2, getResponseMessage } from "./CommonService";

const baseUrl = `${getBaseUrl()}/changes`;

const getChanges = (body, setLoading, setChanges) => {
  const url = `${baseUrl}/get`;
    axios
      .post(url, body)
      .then((res) => {
        let status = res.data.status;
        let operations = res.data.operations;
        setLoading(false);
        if (status === 0) {
            setChanges(operations);
        } else {
          alert(getResponseMessage(status));
        }
      })
      .catch((err) => {
        handleError2(err);
        setLoading(false);
      });
  };

  export { getChanges };