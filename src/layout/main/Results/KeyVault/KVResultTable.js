import "../../../../CSS/style.css";
import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

import {
  OnDeleteContext,
  OnRecoverContext,
  PaginationCounterContext,
  SecretsContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import TableHeader from "../TableHeader";
import KVResultTableRow from "./KVResultTableRow";

function KVResultTable() {
  const { secrets } = useContext(SecretsContext);
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { onRecover } = useContext(OnRecoverContext);
  const { onDelete } = useContext(OnDeleteContext);
  const [tableHeader, setTableHeader] = useState([]);
  const number = 5;

  useEffect(() => {
    if (onDelete || onRecover) {
      setTableHeader(["Key vault", "Secret name", "Secret value"]);
    } else {
      setTableHeader(["Key vault", "Secret name", "Secret value", "Operation"]);
    }
  }, [onDelete, onRecover]);

  const findIndexOfSecret = (secrets, secret) => {
    const isMatch = (sec) =>
      sec.keyVault === secret.keyVault &&
      sec.secretName === secret.secretName &&
      sec.secretValue === secret.secretValue;
    return secrets.findIndex(isMatch);
  };

  return (
    <div>
      {secrets === undefined || secrets.length === 0 ? (
        <h2>No secrets found.</h2>
      ) : (
        <>
          <h2>Matched secrets (Found secrets: {secrets.length}).</h2>
          <table>
            <TableHeader columnList={tableHeader} />
            <tbody>
              {secrets
                .slice(paginationCounter, paginationCounter + number)
                .map((secret) => {
                  let keyVault = secret.keyVault;
                  let secretName = secret.secretName;
                  let secretValue = secret.secretValue;
                  let index = findIndexOfSecret(secrets, secret);
                  return (
                    <KVResultTableRow
                      key={v4()}
                      keyVault={keyVault}
                      secretName={secretName}
                      secretValue={secretValue}
                      index={index}
                    />
                  );
                })}
            </tbody>
          </table>
          <PaginationButtons collection={secrets} />
        </>
      )}
    </div>
  );
}

export default KVResultTable;
