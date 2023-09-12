import "../../../../CSS/style.css";
import React, { useContext, useState, useEffect } from "react";

import { SecretContext } from "../../../../contexts/Contexts";

function KVResultTable() {
  const { secrets } = useContext(SecretContext);
  const [paginationCounter, setPaginationCounter] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [actualPageNumber, setActualPageNumber] = useState(1);

  const number = 10;

  useEffect(() => {
    let variableGroupsLength = secrets.length;
    setPageNumber(Math.ceil(variableGroupsLength / number));
  }, [secrets]);

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
      {secrets.length === 0 ? (
        <h2>No secrets found.</h2>
      ) : (
        <>
          <h2>Matched secrets (Found secrets: {secrets.length}).</h2>
          <table>
            <thead>
              <tr>
                <th>Secret name</th>
                <th>Secret value</th>
              </tr>
            </thead>
            <tbody>
              {secrets
                .slice(paginationCounter, paginationCounter + number)
                .map((secret) => {
                  let secretName = secret.secretName;
                  let secretValue = secret.secretValue;
                  return (
                    <tr key={Math.random()}>
                      <td key={Math.random()}>{secretName}</td>
                      {secretValue.length > 85 ? (
                        <button onClick={() => alert(secretValue)}>
                          Show secret value
                        </button>
                      ) : (
                        <td key={Math.random()}>{secretValue}</td>
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {secrets.length > 10 ? (
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
                  paginationCounter + number >= secrets.length
                    ? "previous"
                    : "next"
                }
                disabled={paginationCounter + number >= secrets.length}
                onClick={() => increasePaginationCounter()}
              >
                Next &raquo;
              </button>
            </>
          ) : (
            <></>
          )}
          <span>{`Page: ${actualPageNumber}/${pageNumber}`}</span>
        </>
      )}
    </div>
  );
}

export default KVResultTable;
