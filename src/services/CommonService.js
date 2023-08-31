const GetBaseUrl = () => {
    let backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;
    let backendPort = process.env.REACT_APP_BACKEND_PORT_NUM;
    return `${backendUrl}:${backendPort}/api`;
}

const handleError = (callbackForLoading, err) => {
    callbackForLoading(false);
    console.log(err);
    alert(`${err.message} occur during request. Check inspector for detailed error message!`);
  }

export {
    GetBaseUrl,
    handleError
}
