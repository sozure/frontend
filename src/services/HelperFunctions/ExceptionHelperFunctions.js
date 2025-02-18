const getFilteredVariableGroupsByExceptions = (
  variableGroups,
  vgChangeExceptions
) => {
  let variableGroupNamesFromExceptions = [];
  vgChangeExceptions.forEach((exception) => {
    variableGroupNamesFromExceptions.push(exception.variableGroupName);
  });
  let result = variableGroups.filter(
    (variableGroup) =>
      !variableGroupNamesFromExceptions.includes(
        variableGroup.variableGroupName
      )
  );
  return result;
};

const getFilteredVariablesByExceptions = (
  variables,
  vgChangeExceptions
) => {
  let variableGroupNamesFromExceptions = [];
  vgChangeExceptions.forEach((exception) => {
    variableGroupNamesFromExceptions.push(exception.variableGroupName);
  });
  let result = variables.filter(
    (variable) =>
      !variableGroupNamesFromExceptions.includes(
        variable.variableGroupName
      )
  );
  return result;
};

export { getFilteredVariableGroupsByExceptions, getFilteredVariablesByExceptions };
