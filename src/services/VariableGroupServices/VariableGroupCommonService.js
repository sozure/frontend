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

export{
    buildRequestBody
}