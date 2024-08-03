import "../../../../../../CSS/style.css";
import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import {
  PaginationCounterContext,
  VariablesContext,
  VGChangeExceptionsContext,
} from "../../../../../../contexts/Contexts";
import PaginationButtons from "../../../PaginationButtons";
import TableHeader from "../../../TableHeader";
import { getFilteredVariableGroupsByExceptions } from "../../../../../../services/HelperFunctions/ExceptionHelperFunctions";
import DeleteVGTableRow from "./DeleteVGTableRow";

function DeleteVGTable() {
  const { variables } = useContext(VariablesContext);
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { vgChangeExceptions } = useContext(VGChangeExceptionsContext);

  const [
    filteredVariableGroupsByExceptions,
    setFilteredVariableGroupsByExceptions,
  ] = useState([variables]);

  const number = 5;

  useEffect(() => {
    if (variables.length !== 0) {
      let filteredVariableGroups = getFilteredVariableGroupsByExceptions(
        variables,
        vgChangeExceptions
      );
      setFilteredVariableGroupsByExceptions(filteredVariableGroups);
    }
  }, [variables, vgChangeExceptions]);

  const findIndexOfVariableGroup = (variableGroups, variableGroup) => {
    const isMatch = (variableG) =>
      variableG.variableGroupName === variableGroup.variableGroupName &&
      variableG.variableGroupKey === variableGroup.variableGroupKey &&
      variableG.variableGroupValue === variableGroup.variableGroupValue;
    return variableGroups.findIndex(isMatch);
  };

  return (
    <div className="form">
      {(filteredVariableGroupsByExceptions === null) |
      (filteredVariableGroupsByExceptions === undefined) |
      (filteredVariableGroupsByExceptions.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>
            Matched variables (Found variables:{" "}
            {filteredVariableGroupsByExceptions.length})
          </h2>
          <br />
          <table className="matched-variables-table">
            <TableHeader
              columnList={[
                "Project",
                "Variable group name",
                "Variable key",
                "Variable value",
                "Remove",
              ]}
            />

            <tbody>
              {filteredVariableGroupsByExceptions
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroup) => {
                  let variableGroupName = variableGroup.variableGroupName;
                  let variableGroupValue = variableGroup.variableGroupValue;
                  let isSecretVariableGroup = variableGroup.secretVariableGroup;
                  let project = variableGroup.project;
                  let keyVaultName = variableGroup.keyVaultName;
                  let index = findIndexOfVariableGroup(
                    variables,
                    variableGroup
                  );
                  return (
                    <DeleteVGTableRow
                      key={v4()}
                      variableGroup={variableGroup}
                      variableGroupName={variableGroupName}
                      variableGroupValue={variableGroupValue}
                      project={project}
                      isSecretVariableGroup={isSecretVariableGroup}
                      keyVaultName={keyVaultName}
                      index={index}
                    />
                  );
                })}
            </tbody>
          </table>
          <br />
          <PaginationButtons collection={filteredVariableGroupsByExceptions} />
        </>
      )}
    </div>
  );
}

export default DeleteVGTable;
