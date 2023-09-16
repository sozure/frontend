import "../../../../CSS/style.css";
import React, { useContext } from "react";

import {
  PaginationCounterContext,
  VariableGroupsContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";

function OtherVGTable() {
  const { variableGroups } = useContext(VariableGroupsContext);
  const { paginationCounter } = useContext(PaginationCounterContext);
  const number = 10;

  return (
    <div>
      {variableGroups.length === 0 ? (
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
              </tr>
            </thead>

            <tbody>
              {variableGroups
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroup) => {
                  let variableGroupName = variableGroup.variableGroupName;
                  let isSecretVariableGroup = variableGroup.secretVariableGroup;
                  let project = variableGroup.project;
                  let keyVaultName = variableGroup.keyVaultName;
                  return (
                    <tr key={Math.random()}>
                      <td key={Math.random()}>
                        {project.length > 11
                          ? `${project.slice(0, 11)}...`
                          : project}
                      </td>

                      {isSecretVariableGroup ? (
                        <td key={Math.random()}>{`${variableGroupName} (${keyVaultName})`}</td>
                      ) : (
                        <td key={Math.random()}>{variableGroupName}</td>
                      )}

                      <td key={Math.random()}>
                        {variableGroup.variableGroupKey}
                      </td>

                      <td key={Math.random()}>
                        <span className={isSecretVariableGroup ? "error" : ""}>
                          {isSecretVariableGroup ? (
                            "Secret variable, can't show it's value."
                          ) : variableGroup.variableGroupValue.length > 60 ? (
                            <button
                              onClick={() =>
                                alert(variableGroup.variableGroupValue)
                              }
                            >
                              Show long variable value
                            </button>
                          ) : (
                            variableGroup.variableGroupValue
                          )}
                        </span>
                      </td>
                    </tr>
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
