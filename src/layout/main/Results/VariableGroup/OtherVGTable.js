import "../../../../CSS/ResultTable.css";
import React, { useContext, useEffect, useState } from "react";

import { VariableGroupsContext } from "../../../../contexts/Contexts";

function OtherVGTable() {
  const { variableGroups } = useContext(VariableGroupsContext);
  const [paginationCounter, setPaginationCounter] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [actualPageNumber, setActualPageNumber] = useState(1);

  const number = 10;


  useEffect(() => {
    let variableGroupsLength = variableGroups.length;
    setPageNumber(Math.ceil(variableGroupsLength / number));
  }, [variableGroups])

  const increasePaginationCounter = () => {
    let helperPageNum = actualPageNumber + 1;
    setActualPageNumber(helperPageNum);
    let increasedPaginationCounter = paginationCounter + number;
    setPaginationCounter(increasedPaginationCounter);
  };

  const decreasedPaginationCounter = () => {
    let helperPageNum = actualPageNumber - 1;
    setActualPageNumber(helperPageNum);
    let increasedPaginationCounter =
      paginationCounter - number <= 0 ? 0 : paginationCounter - number;
    setPaginationCounter(increasedPaginationCounter);
  };

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
                      <td key={Math.random()}>{project.length > 11? `${project.slice(0, 11)}...`: project}</td>
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
          <span>{`Page: ${actualPageNumber}/${pageNumber}`}</span>
        </>
      )}
    </div>
  );
}

export default OtherVGTable;
