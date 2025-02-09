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

export { getFilteredVariableGroupsByExceptions };
