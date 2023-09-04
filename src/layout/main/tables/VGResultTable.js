import "../../../CSS/ResultTable.css";
import React, { useContext, useState } from "react";

import { VariableGroupsContext } from "../../../contexts/Contexts";

function VGResultTable() {
  const { variableGroups } = useContext(VariableGroupsContext);
  const [paginationCounter, setPaginationCounter] = useState(0);

  const number = 10;

  const increasePaginationCounter = () => {
    let increasedPaginationCounter = paginationCounter + number;
    setPaginationCounter(increasedPaginationCounter);
  }

  const decreasedPaginationCounter = () => {
    let increasedPaginationCounter = paginationCounter - number <= 0 ? 0: paginationCounter - number;
    setPaginationCounter(increasedPaginationCounter);
  }

  return (
    <div>
      <h2>Found variable groups</h2>
      {variableGroups.length === 0 ? (
        <p>No variable group found.</p>
      ) : (
        <>
          <input
            type="search"
            id="variable_groups_search"
            placeholder="Filter by Title"
          />
          <table>
            <thead>
              <tr>
                <th>Variable group name</th>
                <th>Variable Key</th>
                <th>Variable value</th>
              </tr>
            </thead>

            <tbody>
              {variableGroups.slice(paginationCounter, paginationCounter + number).map((variableGroup) => {
                return (
                  <tr key={Math.random()}>
                    <td key={Math.random()}>
                      {variableGroup.variableGroupName}
                    </td>
                    <td key={Math.random()}>
                      {variableGroup.variableGroupKey}
                    </td>
                    <td key={Math.random()}>
                      <span className={variableGroup.variableGroupName.toLowerCase().includes("secrets") | variableGroup.variableGroupKey.toLowerCase().includes("serilog")? "error": ""}>
                        {variableGroup.variableGroupName.toLowerCase().includes("secrets")? 
                          "Secret variable, can't show it's value." : 
                          variableGroup.variableGroupKey.toLowerCase().includes("serilog")? "Serilog's value is too long.":
                          variableGroup.variableGroupValue}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className={paginationCounter === 0 ? "previous": "next"} disabled={paginationCounter === 0} onClick={() => decreasedPaginationCounter()}>
            &laquo; Previous
          </button>
          <button className={paginationCounter + number >= variableGroups.length? "previous": "next"} disabled={paginationCounter + number >= variableGroups.length | variableGroups.length < 10} onClick={() => increasePaginationCounter()}>
            Next &raquo;
          </button>
        </>
      )}
    </div>
  );
}

export default VGResultTable;
