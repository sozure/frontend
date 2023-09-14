import "../../../../CSS/style.css";
import React, { useContext } from "react";

import { PaginationCounterContext, SecretContext, GetDeletedSecretsContext } from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";

function KVResultTable() {
  const { secrets } = useContext(SecretContext);
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { deleted } = useContext(GetDeletedSecretsContext);


  const number = 10;

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
                      {deleted ? (<p>Deleted secret. Can't show it's value.</p>) : secretValue.length > 85 ? (
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
          <PaginationButtons collection={secrets}/>
        </>
      )}
    </div>
  );
}

export default KVResultTable;
