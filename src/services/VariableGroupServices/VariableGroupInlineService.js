import axios from "axios";
import { getBaseUrl, getResponseMessage, handleError2, toastErrorPopUp } from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getBaseUrl()}/VariableGroup`;

const sendRequest = async (
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
        success: status === 1 || status === 2,
        response: message,
        operation: controllerSegment,
      };
      setSingleOperation(result);

      if (status === 1 || status === 2) {
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

const sendUpdateRequest = async (
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
  await sendRequest(
    endpoint,
    body,
    setSingleOperation,
    row,
    variableGroups,
    setVariables,
    setLocalLoading
  );
};

const sendDeleteRequest = async (
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
  await sendRequest(
    endpoint,
    body,
    setSingleOperation,
    row,
    variableGroups,
    setVariables,
    setLocalLoading
  );
};

const sendAddRequest = async(body, setLoading) => {
  setLoading(true);
  let endpoint = "AddInline";
  let url = `${variableGroupUrl}/${endpoint}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data;
      setLoading(false);
      if(status !== 1 && status !== 2){
        toastErrorPopUp("Couldn't added new variable!", "inline-add", 1500);
      }
    })
    .catch((err) => {
      handleError2(err);
    });
}

export { sendDeleteRequest, sendUpdateRequest, sendAddRequest };
