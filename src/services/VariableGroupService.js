import axios from "axios";

var backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;
var backendPort = process.env.REACT_APP_BACKEND_PORT_NUM;

const baseUrl = `${backendUrl}:${backendPort}/api`;
const variableGroupUrl = `${baseUrl}/variablegroups`;
const secretUrl = `${baseUrl}/secrets`;

const buildRequestBody = (message) => {
    let projectName = message["projectName"];
    let pat = message["pat"];
    let vgRegex = message["vgRegex"];
    let keyRegex = message["keyRegex"];
    let organizationName = message["organizationName"];
    return {
      "organization": organizationName, 
      "project": projectName, 
      "pat": pat, 
      "variableGroupFilter": vgRegex, 
      "keyFilter": keyRegex, 
    };
}

const sendListRequest = (message, valueRegexChange, callbackForDataSaving) => {
  let projectName = message["projectName"];
  let pat = message["pat"];
  let vgRegex = message["vgRegex"];
  let keyRegex = message["keyRegex"];
  let callbackForLoading = message["setLoading"];
  let organizationName = message["organizationName"];
  let url = `${variableGroupUrl}/getvariablegroups?organization=${organizationName}&project=${projectName}&pat=${pat}&variableGroupFilter=${vgRegex}&keyFilter=${keyRegex}${valueRegexChange !== ""? "&valueFilter=" + valueRegexChange: ""}`;
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

const sendRequest = async (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariableGroups"];
  callbackForLoading(true)
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios.post(url, body)
    .then(res => {
      callbackForDataSaving(res.data);
      callbackForLoading(false);
      callback(false);
    })
    .catch(err => {
      handleError(callbackForLoading, err);
    }); 
}

const sendUpdateRequest = (message, newValue, valueRegexChange, callbackForOnUpdate) => {
  let body = buildRequestBody(message);
  body["newValue"] = newValue;
  body["valueFilter"] = valueRegexChange !== ""? valueRegexChange: null;
  sendRequest("updatevariablegroups", body, callbackForOnUpdate, message)
}

const sendAddRequest = (message, newKey, newValue, callbackForOnAdd) => {
  let body = buildRequestBody(message);
  body["key"] = newKey;
  body["value"] = newValue;
  sendRequest("addvariable", body, callbackForOnAdd, message)
}

const sendDeleteRequest = (message, valueRegexChange, callbackForOnDelete) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegexChange !== ""? valueRegexChange: null;
  sendRequest("deletevariable", body, callbackForOnDelete, message);
}

export {
    sendListRequest,
    sendDeleteSecretRequest,
    sendAddRequest,
    sendDeleteRequest,
    sendUpdateRequest,
    sendListSecretRequest
};

const handleError = (callbackForLoading, err) => {
  callbackForLoading(false);
  console.log(err);
  alert(`${err.message} occur during request. Check inspector for detailed error message!`);
}