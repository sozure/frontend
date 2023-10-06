const buildRequestBody = (message) => {
    return {
      organization: message["organizationName"],
      project: message["projectName"],
      pat: message["pat"],
      variableGroupFilter: message["vgRegex"],
      keyFilter: message["keyRegex"],
      containsSecrets: message["secretIncluded"],
      keyIsRegex: message["keyIsRegex"]
    };
  };

export{
    buildRequestBody
}