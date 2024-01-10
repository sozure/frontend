const buildRequestBody = (message) => {
  return {
    organization: message["organizationName"],
    project: message["projectName"],
    userName: message["userName"],
    pat: message["pat"],
    variableGroupFilter: message["vgRegex"],
    keyFilter: message["keyRegex"],
    containsSecrets: message["secretIncluded"],
    keyIsRegex: message["keyIsRegex"],
    containsKey: message["containsKey"]
  };
};

export { buildRequestBody };
