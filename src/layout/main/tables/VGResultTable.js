import "../../../CSS/ResultTable.css";
import React, { useContext } from "react";

import { 
  VariableGroupsContext
 } from "../../../contexts/Contexts";

function VGResultTable() {

  const { variableGroups }  = useContext(VariableGroupsContext);

  return (
    <div>
      <h2>Found variable groups</h2>
      {variableGroups.length === 0? <p>No variable group found.</p>: 
      <>
      <input type="search" id="variable_groups_search" placeholder="Filter by Title"/>
      <table>
        <thead>
          <tr>
            <th>Variable group name</th>
            <th>Variable Key</th>
            <th>Variable value</th>
          </tr>
        </thead>
        
        <tbody>
        {variableGroups.map(variableGroup => {
          return (<tr key={Math.random()}>
            <td key={Math.random()}>{variableGroup.variableGroupName}</td>
            <td key={Math.random()}>{variableGroup.variableGroupKey}</td>
            <td key={Math.random()}>{variableGroup.variableGroupValue}</td>
          </tr>)
        })}
        </tbody>
      </table>
      </>}
    </div>
  )
}

export default VGResultTable;
