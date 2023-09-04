
const responseCodes = {
    0: "Success",
    1: "Unauthorized",
    2: "Organization does not exist",
    3: "Project does not exist",
    4: "Unknown error"
};

const getBaseUrl = () => {
    let backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;
    let backendPort = process.env.REACT_APP_BACKEND_PORT_NUM;
    return `${backendUrl}:${backendPort}/api`;
}

const handleError = (callbackForLoading, err) => {
    callbackForLoading(false);
    console.log(err);
    alert(`${err.message} occur during request. Check inspector for detailed error message!`);
}

const handleError2 = (err) => {
    console.log(err);
    alert(`${err.message} occur during request. Check inspector for detailed error message!`);
}

const getResponseMessage = (responseCode) => {
    return responseCodes[responseCode];
}

export {
    getBaseUrl,
    handleError,
    handleError2,
    getResponseMessage
}
