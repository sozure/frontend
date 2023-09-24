import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getBaseUrl()}/VariableGroup`;

const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const sendListRequest = (message, valueRegex, callbackForDataSaving) => {
  let callbackForLoading = message["setLoading"];
  let secretIncluded = message["secretIncluded"];
  let url = `${variableGroupUrl}/Get`;
  callbackForLoading(true);
  const body = {
    organization: message["organizationName"],
    project: message["projectName"],
    pat: message["pat"],
    variableGroupFilter: message["vgRegex"],
    keyFilter: message["keyRegex"],
    containsSecrets: secretIncluded,
    valueFilter: valueRegex
  }
  axios
    .post(url, body, axiosConfig)
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

const sendRequest = (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariableGroups"];
  callbackForLoading(true);
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body, axiosConfig)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.variableGroups;
      callbackForLoading(false);
      callback(false);
      if (status === 0 || status === 1) {
        callbackForDataSaving(variableGroups);
      }
      alert(getResponseMessage(res.data.status));
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
  sendListRequest,
  sendAddRequest,
  sendDeleteRequest,
  sendUpdateRequest,
};
