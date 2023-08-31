import "../../../CSS/ResultTable.css";
import React, { useContext, useState } from "react";

import { SecretContext } from "../../../contexts/Contexts";

function KVResultTable() {
  const { secrets } = useContext(SecretContext);
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
      <h2>Found secrets</h2>
      {secrets.length === 0 ? (
        <p>No result.</p>
      ) : (
        <>
          <input
            type="search"
            id="secrets_search"
            placeholder="Filter by name"
          />
          <table>
            <thead>
              <tr>
                <th>Secret name</th>
                <th>Secret value</th>
              </tr>
            </thead>
            <tbody>
              {secrets.slice(paginationCounter, paginationCounter + number).map((secret) => {
                return (
                  <tr key={Math.random()}>
                    <td key={Math.random()}>{secret.secretName}</td>
                    <td key={Math.random()}>{secret.secretValue}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button class="previous" disabled={paginationCounter === 0} onClick={() => decreasedPaginationCounter()}>
            &laquo; Previous
          </button>
          <button class="next" disabled={paginationCounter + number >= secrets.length} onClick={() => increasePaginationCounter()}>
            Next &raquo;
          </button>
        </>
      )}
    </div>
  );
}

export default KVResultTable;
