import "../../../../CSS/style.css";
import React, { useContext } from "react";

import { PaginationCounterContext, VariableGroupsContext } from "../../../../contexts/Contexts";
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
                  let project = variableGroup.project;
                  return (
                    <tr key={Math.random()}>
                      <td key={Math.random()}>
                        {project.length > 11
                          ? `${project.slice(0, 11)}...`
                          : project}
                      </td>
                      <td key={Math.random()}>{variableGroupName}</td>
                      <td key={Math.random()}>
                        {variableGroup.variableGroupKey}
                      </td>
                      <td key={Math.random()}>
                        <span
                          className={
                            variableGroupName
                              .toLowerCase()
                              .includes("secrets") |
                            variableGroup.variableGroupKey
                              .toLowerCase()
                              .includes("serilog")
                              ? "error"
                              : ""
                          }
                        >
                          {variableGroupName
                            .toLowerCase()
                            .includes("secrets") ? (
                            "Secret variable, can't show it's value."
                          ) : variableGroup.variableGroupKey
                              .toLowerCase()
                              .includes("serilog") ? (
                            <button
                              onClick={() =>
                                alert(variableGroup.variableGroupValue)
                              }
                            >
                              Show Serilog value
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
