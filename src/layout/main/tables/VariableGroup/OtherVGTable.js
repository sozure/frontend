import "../../../../CSS/ResultTable.css";
import React, { useContext, useState } from "react";

import { VariableGroupsContext } from "../../../../contexts/Contexts";

function OtherVGTable() {
  const { variableGroups } = useContext(VariableGroupsContext);
  const [paginationCounter, setPaginationCounter] = useState(0);

  const number = 10;

  const increasePaginationCounter = () => {
    let increasedPaginationCounter = paginationCounter + number;
    setPaginationCounter(increasedPaginationCounter);
  };

  const decreasedPaginationCounter = () => {
    let increasedPaginationCounter =
      paginationCounter - number <= 0 ? 0 : paginationCounter - number;
    setPaginationCounter(increasedPaginationCounter);
  };

  return (
    <div>
      <h2>Matched variable groups</h2>
      {variableGroups.length === 0 ? (
        <p>No variable group found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
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
                  return (
                    <tr key={Math.random()}>
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
                          {variableGroupName.toLowerCase().includes("secrets")
                            ? "Secret variable, can't show it's value."
                            : variableGroup.variableGroupKey
                                .toLowerCase()
                                .includes("serilog")
                            ? "Serilog's value is too long."
                            : variableGroup.variableGroupValue}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {variableGroups.length <= 10 ? (
            <></>
          ) : (
            <>
              <button
                className={paginationCounter === 0 ? "previous" : "next"}
                disabled={paginationCounter === 0}
                onClick={() => decreasedPaginationCounter()}
              >
                &laquo; Previous
              </button>
              <button
                className={
                  paginationCounter + number >= variableGroups.length
                    ? "previous"
                    : "next"
                }
                disabled={
                  (paginationCounter + number >= variableGroups.length) |
                  (variableGroups.length < 10)
                }
                onClick={() => increasePaginationCounter()}
              >
                Next &raquo;
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default OtherVGTable;
