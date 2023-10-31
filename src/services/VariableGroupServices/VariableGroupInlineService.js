import axios from "axios";
import { getBaseUrl, getResponseMessage } from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getBaseUrl()}/VariableGroup`;

const sendRequest = (
  controllerSegment,
  body,
  setSingleOperation,
  row,
  variableGroups,
  setVariables,
  setLocalLoading
) => {
  let url = `${variableGroupUrl}/${controllerSegment}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data;
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
        if (controllerSegment === "DeleteInline") {
          variableGroups.splice(row, 1);
        } else {
          let variableGroup = variableGroups[row];
          variableGroup.variableGroupValue = body["newValue"];
        }
        setVariables(variableGroups);
      }
      setLocalLoading({ loading: false, row: -1 });
    })
    .catch((err) => {
      setSingleOperation({
        row: row,
        modificationHappened: true,
        success: false,
        response: err.message,
        operation: controllerSegment,
      });
      setLocalLoading({ loading: false, row: -1 });
    });
};

const sendUpdateRequest = (
  message,
  setSingleOperation,
  row,
  variableGroups,
  setVariables,
  setLocalLoading
) => {
  let body = buildRequestBody(message);
  let valueRegex = message["vgValueRegex"];
  body["newValue"] = message["newValue"];
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "UpdateInline";
  sendRequest(
    endpoint,
    body,
    setSingleOperation,
    row,
    variableGroups,
    setVariables,
    setLocalLoading
  );
};

const sendDeleteRequest = (
  message,
  valueRegex,
  setSingleOperation,
  row,
  variableGroups,
  setVariables,
  setLocalLoading
) => {
  let body = buildRequestBody(message);
  body["valueFilter"] = valueRegex !== "" ? valueRegex : null;
  let endpoint = "DeleteInline";
  sendRequest(
    endpoint,
    body,
    setSingleOperation,
    row,
    variableGroups,
    setVariables,
    setLocalLoading
  );
};

export { sendDeleteRequest, sendUpdateRequest };
