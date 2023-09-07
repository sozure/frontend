import React, { useEffect, useState, useContext } from "react";

import { VariableGroupsContext } from "../../../../contexts/Contexts";

const AddVGTable = () => {
  const { variableGroups } = useContext(VariableGroupsContext);
  const [paginationCounter, setPaginationCounter] = useState(0);
  const [uniqueVariableGroups, setUniqueVariableGroups] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [actualPageNumber, setActualPageNumber] = useState(1);

  const number = 10;

  useEffect(() => {
    let uniqueVariableGroupsLength = uniqueVariableGroups.length;
    setPageNumber(Math.ceil(uniqueVariableGroupsLength / number));
  }, [uniqueVariableGroups])

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

  useEffect(() => {
    let helperList = [];
    variableGroups.forEach((element) => {
      if (!helperList.includes(element.variableGroupName)) {
        helperList.push(element.variableGroupName);
      }
    });
    setUniqueVariableGroups(helperList);
  }, [variableGroups]);

  return (
    <div>
      {uniqueVariableGroups.length === 0 ? (
        <h2>No variable groups found.</h2>
      ) : (
        <>
        <h2>Add variable to these variable groups (Found variable groups: {uniqueVariableGroups.length}).</h2>
          <table>
            <thead>
              <tr>
                <th>Variable group name</th>
              </tr>
            </thead>

            <tbody>
              {uniqueVariableGroups
                .slice(paginationCounter, paginationCounter + number)
                .map((variableGroupName) => {
                  return (
                    <tr key={Math.random()}>
                      <td key={Math.random()}>{variableGroupName}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {uniqueVariableGroups.length <= 10 ? (
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
                  paginationCounter + number >= uniqueVariableGroups.length
                    ? "previous"
                    : "next"
                }
                disabled={
                  (paginationCounter + number >= uniqueVariableGroups.length) |
                  (uniqueVariableGroups.length < 10)
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
};

export default AddVGTable;
