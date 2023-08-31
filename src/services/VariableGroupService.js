import axios from "axios";
import { GetBaseUrl, handleError } from "./CommonService";

const variableGroupUrl = `${GetBaseUrl()}/variablegroups`;

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
  let callbackForLoading = message["setLoading"];
  let url = buildUrl(message, valueRegexChange);
  callbackForLoading(true);
  axios.get(url, )
    .then(res => {
      callbackForDataSaving(res.data);
      callbackForLoading(false);
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

const buildUrl = (message, valueRegexChange) => {
  let projectName = message["projectName"];
  let pat = message["pat"];
  let vgRegex = message["vgRegex"];
  let keyRegex = message["keyRegex"];
  let organizationName = message["organizationName"];
  return `${variableGroupUrl}?Organization=${organizationName}&Project=${projectName}&PAT=${pat}&VariableGroupFilter=${vgRegex}&KeyFilter=${keyRegex}${valueRegexChange !== ""? "&ValueFilter=" + valueRegexChange: ""}`;
}

export {
    sendListRequest,
    sendAddRequest,
    sendDeleteRequest,
    sendUpdateRequest
};
