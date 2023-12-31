import React, { useContext, useState } from "react";
import TableHeader from "../TableHeader";
import {
  PaginationCounterContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import { v4 } from "uuid";

const SyncTable = () => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { syncVariables } = useContext(VariablesSyncContext);
  const [tableHeader] = useState([
    "Variable",
    "Containing variable groups",
    "Operation",
  ]);

  const number = 10;

  return (
    <div className="matched-variables-table">
      {(syncVariables === null) |
      (syncVariables === undefined) |
      (syncVariables.length === 0) ? (
        <h2>No variables found.</h2>
      ) : (
        <>
          <h2>Matched variables (Found variables: {syncVariables.length})</h2>
          <br />
          <table className="matched-variables-table">
            <thead>
              <TableHeader columnList={tableHeader} />
            </thead>

            <tbody>
              {syncVariables
                .slice(paginationCounter, paginationCounter + number)
                .map((variable) => {
                  return (
                    <tr key={v4()}>
                      <td key={v4()}>{variable}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <br />
          <PaginationButtons collection={syncVariables} />
        </>
      )}
    </div>
  );
};

export default SyncTable;
