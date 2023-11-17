import axios from "axios";
import { getBaseUrl, handleError2, getResponseMessage } from "./CommonService";

const baseUrl = `${getBaseUrl()}/changes`;

const getChangesByDate = (body, setLoading, setChanges) => {
    const url = `${baseUrl}/getbydate`;
    getChanges(url, body, setLoading, setChanges)
}

const getChangesByMaxLimit = (body, setLoading, setChanges) => {
    const url = `${baseUrl}/getbymaxlimit`;
    getChanges(url, body, setLoading, setChanges)
}

const getChanges = (url, body, setLoading, setChanges) => {
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

  export { getChangesByDate,  getChangesByMaxLimit};