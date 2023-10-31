import "../../../../CSS/style.css";
import React, { useContext } from "react";
import { v4 } from "uuid";

import {
  PaginationCounterContext,
  VariablesContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import OtherVGTableRow from "./OtherVGTableRow";
import TableHeader from "../TableHeader";

function OtherVGTable() {
  const { variables } = useContext(VariablesContext);
  const { paginationCounter } = useContext(PaginationCounterContext);

  const number = 10;

  const findIndexOfVariableGroup = (variableGroups, variableGroup) => {
    const isMatch = (variableG) =>
      variableG.variableGroupName === variableGroup.variableGroupName &&
      variableG.variableGroupKey === variableGroup.variableGroupKey &&
      variableG.variableGroupValue === variableGroup.variableGroupValue;
    return variableGroups.findIndex(isMatch);
  };

  return (
    <div className="matched-variables-table">
      {(variables === null) |
      (variables === undefined) |
      (variables.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>Matched variables (Found variables: {variables.length})</h2>
          <br />
          <table className="matched-variables-table">
            <thead>
              <TableHeader
                columnList={[
                  "Project",
                  "Variable group name",
                  "Variable key",
                  "Variable value",
                  "Operations",
                ]}
              />
            </thead>

            <tbody>
              {variables
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
                    <OtherVGTableRow
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
          <PaginationButtons collection={variables} />
        </>
      )}
    </div>
  );
}

export default OtherVGTable;
