import axios from "axios";
import { getBaseUrl, handleError, getResponseMessage } from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getBaseUrl()}/VariableGroup`;

const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

let variableGroups = [
  {
    variableGroupName: "variableGroupName1",
    variableGroupValue: "variableGroupValue1",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName2",
    variableGroupValue: "variableGroupValue2",
    secretVariableGroup: true,
    project: "project2",
    keyVaultName: "KeyVault-Something"
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName1",
    variableGroupValue: "variableGroupValue1",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName2",
    variableGroupValue: "variableGroupValue2",
    secretVariableGroup: true,
    project: "project2",
    keyVaultName: "KeyVault-Something"
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName1",
    variableGroupValue: "variableGroupValue1",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName2",
    variableGroupValue: "variableGroupValue2",
    secretVariableGroup: true,
    project: "project2",
    keyVaultName: "KeyVault-Something"
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName1",
    variableGroupValue: "variableGroupValue1",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName2",
    variableGroupValue: "variableGroupValue2",
    secretVariableGroup: true,
    project: "project2",
    keyVaultName: "KeyVault-Something"
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName1",
    variableGroupValue: "variableGroupValue1",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName2",
    variableGroupValue: "variableGroupValue2",
    secretVariableGroup: true,
    project: "project2",
    keyVaultName: "KeyVault-Something"
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName1",
    variableGroupValue: "variableGroupValue1",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName2",
    variableGroupValue: "variableGroupValue2",
    secretVariableGroup: true,
    project: "project2",
    keyVaultName: "KeyVault-Something"
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName1",
    variableGroupValue: "variableGroupValue1",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  },
  {
    variableGroupName: "variableGroupName2",
    variableGroupValue: "variableGroupValue2",
    secretVariableGroup: true,
    project: "project2",
    keyVaultName: "KeyVault-Something"
  },
  {
    variableGroupName: "variableGroupName3",
    variableGroupValue: "variableGroupValue3",
    secretVariableGroup: false,
    project: "project1",
    keyVaultName: ""
  }
];

const sendListRequest = (message, valueRegex, callbackForDataSaving) => {
  let callbackForLoading = message["setLoading"];
  let url = buildUrl(message, valueRegex);
  callbackForLoading(true);
  // axios
  //   .get(url, axiosConfig)
  //   .then((res) => {
  //     let status = res.data.status;
  //     let variableGroups = res.data.variableGroups;
  //     callbackForLoading(false);
  //     if (status === 0) {
  //       callbackForDataSaving(variableGroups);
  //     } else {
  //       alert(getResponseMessage(res.data.status));
  //     }
  //   })
  //   .catch((err) => {
  //     handleError(callbackForLoading, err);
  //   });
  callbackForDataSaving(variableGroups);
  callbackForLoading(false);
};

const sendRequest = (controllerSegment, body, callback, message) => {
  let callbackForLoading = message["setLoading"];
  let callbackForDataSaving = message["setVariableGroups"];
  callbackForLoading(true);
  let url = `${variableGroupUrl}/${controllerSegment}`;
  // axios
  //   .post(url, body, axiosConfig)
  //   .then((res) => {
  //     let status = res.data.status;
  //     let variableGroups = res.data.variableGroups;
  //     callbackForLoading(false);
  //     callback(false);
  //     if (status === 0 || status === 1) {
  //       callbackForDataSaving(variableGroups);
  //     }
  //     alert(getResponseMessage(res.data.status));
  //   })
  //   .catch((err) => {
  //     handleError(callbackForLoading, err);
  //     callback(false);
  //   });
  callbackForLoading(false);
  callback(false);
  callbackForDataSaving(variableGroups);
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
  sendUpdateRequest,
};
