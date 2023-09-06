import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "./CommonService";

const variableGroupUrl = `${getBaseUrl()}/variablegroups`;

const buildRequestBody = (message) => {
  let projectName = message["projectName"];
  let pat = message["pat"];
  let vgRegex = message["vgRegex"];
  let keyRegex = message["keyRegex"];
  let organizationName = message["organizationName"];
  let secretIncluded = message["secretIncluded"];
  return {
    organization: organizationName,
    project: projectName,
    pat: pat,
    variableGroupFilter: vgRegex,
    keyFilter: keyRegex,
    containsSecrets: secretIncluded,
  };
};

const sendListRequest = (message, valueRegex, callbackForDataSaving) => {
  let callbackForLoading = message["setLoading"];
  let url = buildUrl(message, valueRegex);
  callbackForLoading(true);
  axios
    .get(url)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.variableGroups;
      callbackForLoading(false);
      if (status === 0) {
        callbackForDataSaving(variableGroups);
      } else {
        alert(getResponseMessage(res.data.status));
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendRequest = async (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariableGroups"];
  callbackForLoading(true);
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.variableGroups;
      callbackForLoading(false);
      callback(false);
      if (status === 0) {
        callbackForDataSaving(variableGroups);
      } else {
        alert(getResponseMessage(res.data.status));
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
      callback(false);
    });
};

const sendUpdateRequest = (
  message,
  newValue,
  valueRegex,
  callbackForOnUpdate
) => {
  let body = buildRequestBody(message);
  body["newValue"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  sendRequest("updatevariablegroups", body, callbackForOnUpdate, message);
};

const sendAddRequest = (
  message,
  newKey,
  newValue,
  valueRegex,
  callbackForOnAdd
) => {
  let body = buildRequestBody(message);
  body["key"] = newKey;
  body["value"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  sendRequest("addvariable", body, callbackForOnAdd, message);
};

const sendDeleteRequest = (message, valueRegex, callbackForOnDelete) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  sendRequest("deletevariable", body, callbackForOnDelete, message);
};

const buildUrl = (message, valueRegex) => {
  let secretIncluded = message["secretIncluded"];
  let projectName = message["projectName"];
  let pat = message["pat"];
  let vgRegex = message["vgRegex"];
  let keyRegex = message["keyRegex"];
  let organizationName = message["organizationName"];
  return `${variableGroupUrl}?Organization=${organizationName}&Project=${projectName}&PAT=${pat}&VariableGroupFilter=${vgRegex}&KeyFilter=${keyRegex}&ContainsSecrets=${secretIncluded}${
    valueRegex !== "" ? "&ValueFilter=" + valueRegex : ""
  }`;
};

export {
  sendListRequest,
  sendAddRequest,
  sendDeleteRequest,
  sendUpdateRequest,
};
