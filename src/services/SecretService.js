import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "./CommonService";

const secretUrl = `${ getBaseUrl() }/secrets`;

const sendDeleteSecretRequest = (keyVaultName, secretRegex, callbackForLoading, callbackForDataSaving, callbackForOnDelete) => {
    callbackForLoading(true);
    let url = `${secretUrl}/deletesecret`;
    let body = {
      "keyVaultName": keyVaultName,
      "secretFilter": secretRegex
    }
    axios.post(url, body)
      .then(res => {
        callbackForDataSaving(res.data.secrets);
        callbackForLoading(false)
        callbackForOnDelete(false)
        alert(getResponseMessage(res.data.status))
      })
      .catch(err => {
        handleError(callbackForLoading, err);
      });
  }
  
  const sendListSecretRequest = (keyVaultName, secretRegex, callbackForDataSaving, callbackForLoading) => {
    let url = `${secretUrl}/getsecrets?keyVaultName=${keyVaultName}&secretFilter=${secretRegex}`;
    callbackForLoading(true);
    axios.get(url)
      .then(res => {
        let status = res.data.status;
        callbackForDataSaving(res.data.secrets);
        callbackForLoading(false);
        if (status !== 0) {
          alert(getResponseMessage(res.data.status));
        }
      })
      .catch(err => {
        handleError(callbackForLoading, err);
      });
  }

  export {
    sendDeleteSecretRequest,
    sendListSecretRequest
};