import "../../../CSS/ResultTable.css";
import React, { useContext } from "react";

import {
  SecretContext
 } from "../../../contexts/Contexts";

function KVResultTable() {

  const { secrets } = useContext(SecretContext);

  return (
    <div>
      <h2>Found secrets</h2>
      {secrets.length === 0? <p>No result.</p>: <>
      <input type="search" id="secrets_search" placeholder="Filter by name"/>
      <table>
        <thead>
          <tr>
            <th>Secret name</th>
            <th>Secret value</th>
          </tr>
        </thead>
        <tbody>
        {secrets.map(secret => {
          return (<tr key={Math.random()}>
            <td key={Math.random()}>{secret.secretName}</td>
            <td key={Math.random()}>{secret.secretValue}</td>
          </tr>)
        })}
        </tbody>
        
      </table></>}
      
    </div>
  )
}

export default KVResultTable;
