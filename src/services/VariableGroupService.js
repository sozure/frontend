import axios from "axios";
import { getBaseUrl, handleError, handleError2, getResponseMessage } from "./CommonService";

const variableGroupUrl = `${getBaseUrl()}/VariableGroup`;

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

const sendListRequest = (message, valueRegex, callbackForDataSaving, multipleProjects) => {
  let callbackForLoading = message["setLoading"];
  let url = buildUrl(message, valueRegex, multipleProjects);
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

const sendRequest2 = async (controllerSegment, body) => {
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      if (status !== 0) {
        alert(getResponseMessage(res.data.status));
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

const sendUpdateRequest = (
  message,
  newValue,
  valueRegex,
  callbackForOnUpdate,
  multipleProjects
) => {
  let body = buildRequestBody(message);
  body["newValue"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = multipleProjects ? "UpdateFromMultipleProjects": "Update";
  sendRequest(endpoint, body, callbackForOnUpdate, message);
};

const sendUpdateRequest2 = (
  message,
  newValue,
  valueRegex,
) => {
  let body = buildRequestBody(message);
  body["newValue"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Update";
  sendRequest2(endpoint, body);
};

const sendAddRequest = (
  message,
  newKey,
  newValue,
  valueRegex,
  callbackForOnAdd,
  multipleProjects
) => {
  let body = buildRequestBody(message);
  body["key"] = newKey;
  body["value"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = multipleProjects ? "AddFromMultipleProjects": "Add";
  sendRequest(endpoint, body, callbackForOnAdd, message);
};

const sendDeleteRequest = (message, valueRegex, callbackForOnDelete, multipleProjects) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = multipleProjects ? "DeleteFromMultipleProjects": "Delete";
  sendRequest(endpoint, body, callbackForOnDelete, message);
};

const sendDeleteRequest2 = (message, valueRegex) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "Delete";
  sendRequest2(endpoint, body);
};

const buildUrl = (message, valueRegex, multipleProjects) => {
  let secretIncluded = message["secretIncluded"];
  let projectName = message["projectName"];
  let pat = message["pat"];
  let vgRegex = message["vgRegex"];
  let keyRegex = message["keyRegex"];
  let organizationName = message["organizationName"];

  let result =
  `${
    variableGroupUrl
  }${
    multipleProjects? "/GetFromMultipleProjects": ""
  }?Organization=${
    organizationName
  }&Project=${
    projectName
  }&PAT=${
    pat
  }&VariableGroupFilter=${
    vgRegex
  }&KeyFilter=${
    keyRegex
  }&ContainsSecrets=${
    secretIncluded
  }${
    valueRegex !== "" ? "&ValueFilter=" + valueRegex : ""
  }`;

  return result;
};

export {
  sendListRequest,
  sendAddRequest,
  sendDeleteRequest,
  sendDeleteRequest2,
  sendUpdateRequest,
  sendUpdateRequest2
};
