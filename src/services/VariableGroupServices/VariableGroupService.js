import axios from "axios";
import {
  getLibraryBaseUrl,
  handleError,
  getResponseMessage,
  toastErrorPopUp,
  toastSuccessPopUp,
  getToastOnClose,
} from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getLibraryBaseUrl()}/variablegroup`;
const toastMs = getToastOnClose();

const sendListVariablesRequest = async (
  message,
  valueRegex,
  callbackForDataSaving
) => {
  await sendListRequest(message, valueRegex, "", callbackForDataSaving);
};

const sendListVariableGroupsRequest = async (
  message,
  valueRegex,
  callbackForDataSaving
) => {
  await sendListRequest(
    message,
    valueRegex,
    "variablegroups",
    callbackForDataSaving
  );
};

const syncVariableGroups = async (
  message,
  results,
  syncVariablesLength,
  setContainingVGs,
  setLoading
) => {
  let index = message["index"];
  let url = `${variableGroupUrl}/variablegroups`;
  let body = buildRequestBody(message);
  body["potentialVariableGroups"] = message["potentialVariableGroups"];
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.data;
      if (status === 1) {
        let variableGroupType = getVariableGroupType(variableGroups);
        results.push({
          index: index,
          key: message["keyRegex"],
          result: variableGroups,
          variableGroupType: variableGroupType,
        });
        if (results.length === syncVariablesLength) {
          setContainingVGs(results);
        }
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_requesting",
          toastMs
        );
        setLoading(false);
      }
    })
    .catch((err) => {
      handleError(setLoading, err);
    });
};

const syncVariableGroup = async (
  index,
  message,
  results,
  setResults,
  setLoading
) => {
  let url = `${variableGroupUrl}/variablegroups`;
  setLoading(true);
  let body = buildRequestBody(message);
  body["potentialVariableGroups"] = message["potentialVariableGroups"];
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.data;
      if (status === 1) {
        let variableGroupType = getVariableGroupType(variableGroups);
        results.push({
          index: index,
          key: message["keyRegex"],
          result: variableGroups,
          variableGroupType: variableGroupType,
        });
        setResults(results);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_requesting",
          toastMs
        );
        setLoading(false);
      }
    })
    .catch((err) => {
      handleError(setLoading, err);
    });
};

const sendListRequest = async (
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
      let variableGroups = res.data.data;
      callbackForLoading(false);
      if (status === 1) {
        callbackForDataSaving(variableGroups);
      } else {
        toastErrorPopUp(
          getResponseMessage(status),
          "variable_requesting",
          toastMs
        );
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
    });
};

const sendRequest = async (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariables"];
  callbackForLoading(true);
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let variableGroups = res.data.data;
      callbackForLoading(false);
      callback(false);
      let statusMessage = getResponseMessage(status);
      if (status === 1 || status === 2) {
        callbackForDataSaving(variableGroups);
        toastSuccessPopUp(statusMessage, "variable_requesting", toastMs);
      } else {
        toastErrorPopUp(statusMessage, "variable_requesting", toastMs);
      }
    })
    .catch((err) => {
      handleError(callbackForLoading, err);
      callback(false);
    });
};

const sendUpdateRequest = async (
  message,
  newValue,
  valueRegex,
  callbackForOnUpdate
) => {
  let body = buildRequestBody(message);
  body["newValue"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Update";
  await sendRequest(endpoint, body, callbackForOnUpdate, message);
};

const sendAddRequest = async (
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
  await sendRequest(endpoint, body, callbackForOnAdd, message);
};

const sendDeleteRequest = async (message, valueRegex, callbackForOnDelete) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Delete";
  await sendRequest(endpoint, body, callbackForOnDelete, message);
};

const getVariableGroupType = (variableGroups) => {
  if (variableGroups.length === 0) return "Unknown";
  let modeMap = { Vsts: 0, AzureKeyVault: 0, Unknown: 0 };
  let maxEl = variableGroups[0].variableGroupType,
    maxCount = 1;
  for (let variableGroup of variableGroups) {
    let el = variableGroup.variableGroupType;
    modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};

export {
  sendListVariablesRequest,
  sendListVariableGroupsRequest,
  syncVariableGroup,
  syncVariableGroups,
  sendAddRequest,
  sendDeleteRequest,
  sendUpdateRequest,
};
