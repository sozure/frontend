import axios from "axios";
import { GetBaseUrl, handleError } from "./CommonService";

const secretUrl = `${GetBaseUrl()}/secrets`;

const sendDeleteSecretRequest = (keyVaultName, secretRegex, callbackForLoading, callbackForDataSaving, callbackForOnDelete) => {
    callbackForLoading(true);
    let url = `${secretUrl}/deletesecret`;
    let body = {
      "keyVaultName": keyVaultName,
      "secretFilter": secretRegex
    }
    axios.post(url, body)
      .then(res => {
        callbackForDataSaving(res.data);
        callbackForLoading(false)
        callbackForOnDelete(false)
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
        callbackForDataSaving(res.data);
        callbackForLoading(false);
      })
      .catch(err => {
        handleError(callbackForLoading, err);
      });
  }

  export {
    sendDeleteSecretRequest,
    sendListSecretRequest
};