import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "./CommonService";

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

const sendRequest = (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariableGroups"];
  callbackForLoading(true);
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      debugger;
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

const sendRequest2 = (
  controllerSegment,
  body,
  setSingleOperation,
  row,
  variableGroups,
  setVariableGroups
) => {
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data.status;
      let message = getResponseMessage(status);
      let result = {
        row: row,
        modificationHappened: true,
        success: status === 0 || status === 1,
        response: message,
        operation: controllerSegment,
      };
      setSingleOperation(result);

      if (status === 0 || status === 1) {
        if (controllerSegment === "Delete") {
          variableGroups.splice(row, 1);
        } else {
          let variableGroup = variableGroups[row];
          variableGroup.variableGroupValue = body["newValue"];
        }
        setVariableGroups(variableGroups);
      }
    })
    .catch((err) => {
      setSingleOperation({
        row: row,
        modificationHappened: true,
        success: false,
        response: err.message,
        operation: controllerSegment,
      });
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

const sendUpdateRequest2 = (
  message,
  newValue,
  valueRegex,
  setSingleOperation,
  row,
  variableGroups,
  setVariableGroups
) => {
  let body = buildRequestBody(message);
  body["newValue"] = newValue;
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "UpdateInline";
  sendRequest2(
    endpoint,
    body,
    setSingleOperation,
    row,
    variableGroups,
    setVariableGroups
  );
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

const sendDeleteRequest2 = (
  message,
  valueRegex,
  setSingleOperation,
  row,
  variableGroups,
  setVariableGroups
) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "DeleteInline";
  sendRequest2(
    endpoint,
    body,
    setSingleOperation,
    row,
    variableGroups,
    setVariableGroups
  );
};

const buildUrl = (message, valueRegex) => {
  let secretIncluded = message["secretIncluded"];
  let projectName = message["projectName"];
  let pat = message["pat"];
  let vgRegex = message["vgRegex"];
  let keyRegex = message["keyRegex"];
  let organizationName = message["organizationName"];

  let result = `${variableGroupUrl}?Organization=${organizationName}&Project=${projectName}&PAT=${pat}&VariableGroupFilter=${vgRegex}&KeyFilter=${keyRegex}&ContainsSecrets=${secretIncluded}${
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
  sendUpdateRequest2,
};
