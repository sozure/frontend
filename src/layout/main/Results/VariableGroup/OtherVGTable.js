import "../../../../CSS/style.css";
import React, { useContext } from "react";

import {
  PaginationCounterContext,
  VariableGroupsContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import OtherVGTableRow from "./OtherVGTableRow";

function OtherVGTable() {
  const { variableGroups } = useContext(VariableGroupsContext);
  const { paginationCounter } = useContext(PaginationCounterContext);

  const number = 10;

  const findIndexOfVariableGroup = (variableGroups, variableGroup) => {
    const isMatch = (variableG) =>
      variableG.variableGroupName === variableGroup.variableGroupName &&
      variableG.variableGroupValue === variableGroup.variableGroupValue;
    return variableGroups.findIndex(isMatch);
  };

  return (
    <div>
      {(variableGroups === null) |
      (variableGroups === undefined) |
      (variableGroups.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>Matched variables (Found variables: {variableGroups.length}).</h2>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Variable group name</th>
                <th>Variable Key</th>
                <th>Variable value</th>
                <th>Operations</th>
              </tr>
            </thead>

            <tbody>
              {variableGroups
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroup) => {
                  let variableGroupName = variableGroup.variableGroupName;
                  let variableGroupValue = variableGroup.variableGroupValue;
                  let isSecretVariableGroup = variableGroup.secretVariableGroup;
                  let project = variableGroup.project;
                  let keyVaultName = variableGroup.keyVaultName;
                  let index = findIndexOfVariableGroup(
                    variableGroups,
                    variableGroup
                  );
                  return (
                    <OtherVGTableRow
                      key={Math.random()}
                      variableGroups={variableGroups}
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
          <PaginationButtons collection={variableGroups} />
        </>
      )}
    </div>
  );
}

export default OtherVGTable;
