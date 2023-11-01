import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getBaseUrl()}/VariableGroup`;

const sendListVariablesRequest = (
  message,
  valueRegex,
  callbackForDataSaving
) => {
  sendListRequest(message, valueRegex, "Get", callbackForDataSaving);
};

const sendListVariableGroupsRequest = (
  message,
  valueRegex,
  callbackForDataSaving
) => {
  sendListRequest(
    message,
    valueRegex,
    "GetVariableGroups",
    callbackForDataSaving
  );
};

const sendListRequest = (
  message,
  valueRegex,
  endpoint,
  callbackForDataSaving
) => {
  let callbackForLoading = message["setLoading"];
  let url = `${variableGroupUrl}/${endpoint}`;
  callbackForLoading(true);
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups =
        endpoint === "GetVariableGroups"
          ? res.data.variableGroups
          : res.data.variables;
      callbackForLoading(false);
      if (status === 0) {
        callbackForDataSaving(variableGroups);
      } else {
        alert(getResponseMessage(status));
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendRequest = (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariables"];
  callbackForLoading(true);
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.variables;
      callbackForLoading(false);
      callback(false);
      if (status === 0 || status === 1) {
        callbackForDataSaving(variableGroups);
      }
      alert(getResponseMessage(status));
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
  let endpoint = "Update";
  sendRequest(endpoint, body, callbackForOnUpdate, message);
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
  let endpoint = "Add";
  sendRequest(endpoint, body, callbackForOnAdd, message);
};

const sendDeleteRequest = (message, valueRegex, callbackForOnDelete) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Delete";
  sendRequest(endpoint, body, callbackForOnDelete, message);
};

export {
  sendListVariablesRequest,
  sendListVariableGroupsRequest,
  sendAddRequest,
  sendDeleteRequest,
  sendUpdateRequest,
};
