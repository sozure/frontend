import { toast } from "react-toastify";

const responseCodes = {
  0: "None",
  1: "Success",
  2: "Already contains",
  3: "Unauthorized",
  4: "Resource not found",
  5: "Project does not exist",
  6: "No subscriptions found",
  7: "File does not exist",
  8: "Failed request. Consider a more specified query. Size of response message could be too large.",
  9: "Unknown error",
};

const getToastOnClose = () => {
  let strMs = process.env.REACT_APP_TOAST_ON_CLOSE_MS
  if(strMs === undefined) return 2500;
  return parseInt(strMs);
}

const toastMs = getToastOnClose();

const getBaseUrl = () => {
  let backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let backendPort = process.env.REACT_APP_BACKEND_PORT_NUM;
  return `${backendUrl}:${backendPort}/api`;
};

const getLibraryBaseUrl = () => {
  let backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let backendPort = process.env.REACT_APP_LIBRARY_BACKEND_PORT_NUM;
  return `${backendUrl}:${backendPort}/api`;
}

const handleError = (callbackForLoading, err) => {
  callbackForLoading(false);
  console.log(err);
  let errorMessage = `${err.message} occur during request. Check inspector for detailed error message!`;
  toastErrorPopUp(errorMessage, "request-error", toastMs);
};

const handleError2 = (err) => {
  console.log(err);
  let errorMessage = `${err.message} occur during request. Check inspector for detailed error message!`;
  toastErrorPopUp(errorMessage, "request-error", toastMs);
};

const getResponseMessage = (responseCode) => {
  return responseCodes[responseCode];
};

const setOnSingleModificationBack = (setOnSingleModification) => {
  let model = { row: -1, operation: "", modification: false };
  setOnSingleModification(model);
};

const setSingleOperationBack = (setSingleOperation) => {
  setSingleOperation({
    row: -1,
    modificationHappened: false,
    success: false,
    response: "",
    operation: "",
  });
};

const checkRequiredInputs = (mandatoryFields, toastId, autoCloseSec) => {
  let incorrectFill = false;
  mandatoryFields.forEach((element) => {
    if (element === "") {
      toastErrorPopUp("Fill every field!", toastId, autoCloseSec);
      incorrectFill = true;
    }
  });
  return incorrectFill;
};

const toastErrorPopUp = (errorMessage, toastId, autoCloseSec) => {
  toast.error(errorMessage, {
    position: toast.POSITION.TOP_CENTER,
    toastId: toastId,
    autoClose: autoCloseSec,
  });
}

const toastSuccessPopUp = (message, toastId, autoCloseSec) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    toastId: toastId,
    autoClose: autoCloseSec,
  });
}

export {
  getBaseUrl,
  getLibraryBaseUrl,
  handleError,
  handleError2,
  getResponseMessage,
  setOnSingleModificationBack,
  setSingleOperationBack,
  checkRequiredInputs,
  toastSuccessPopUp,
  toastErrorPopUp,
  getToastOnClose
};
