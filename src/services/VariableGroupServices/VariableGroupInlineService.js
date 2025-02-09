import axios from "axios";
import {
  getLibraryBaseUrl,
  getResponseMessage,
  getToastOnClose,
  handleError2,
  toastErrorPopUp,
  toastSuccessPopUp,
} from "../CommonService";
import { buildRequestBody } from "./VariableGroupCommonService";

const variableGroupUrl = `${getLibraryBaseUrl()}/VariableGroup`;
const toastMs = getToastOnClose();

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
          let helper = [...variableGroups];
          helper.splice(row, 1);
          setVariables(helper);
        } else {
          let variableGroup = variableGroups[row];
          variableGroup.variableValue = body["newValue"];
          setVariables(variableGroups);
        }
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

const sendAddRequest = async (
  body,
  variable,
  actualVg,
  containingVGsProject,
  containingVGs,
  setContainingVGs,
  setModification,
  setLoading
) => {
  setLoading(true);
  let endpoint = "AddInline";
  let url = `${variableGroupUrl}/${endpoint}`;
  axios
    .post(url, body)
    .then((res) => {
      let status = res.data;
      let statusMessage = getResponseMessage(status);
      setLoading(false);
      if (status !== 1) {
        toastErrorPopUp(
          `Couldn't add variable! ${statusMessage}${
            status === 2 ? ". Check VG. Potential case sensitivity error." : ""
          }`,
          "inline-add",
          toastMs
        );
      } else {
        toastSuccessPopUp("New variable added!", "inline-add", toastMs);
        syncVGs(
          variable,
          actualVg,
          containingVGsProject,
          containingVGs,
          setContainingVGs,
          setModification
        );
      }
    })
    .catch((err) => {
      handleError2(err);
    });
};

const syncVGs = async (
  variable,
  actualVg,
  containingVGsProject,
  containingVGs,
  setContainingVGs,
  setModification
) => {
  let newContainingVGs = [];
  containingVGs.forEach((vgElement) => {
    if (vgElement.key === variable) {
      vgElement.result.push({
        project: containingVGsProject,
        variableGroupName: actualVg,
        variableGroupType: "Vsts",
      });
    }
    newContainingVGs.push(vgElement);
  });
  await setContainingVGs(newContainingVGs);
  setModification({});
};

export { sendDeleteRequest, sendUpdateRequest, sendAddRequest };
