import React, { useContext } from "react";
import { ChangesContext, PaginationCounterContext } from "../../../contexts/Contexts";
import TableHeader from "../../main/Results/TableHeader";
import { v4 } from "uuid";
import PaginationButtons from "../../main/Results/PaginationButtons";

export const ModificationsTable = () => {
  const { changes } = useContext(ChangesContext);
  const { paginationCounter } = useContext(PaginationCounterContext);

  const number = 10;

  return (
    <div>
      {changes.length === 0 ? (
        <h2>No records found.</h2>
      ) : (
        <>
          <table>
            <thead>
              <TableHeader
                columnList={[
                  "Organization",
                  "Project",
                  "User",
                  "Variable group regex",
                  "Operation type",
                ]}
              />
            </thead>

            <tbody>
              {changes
                .slice(paginationCounter, paginationCounter + number)
                .map((change) => {
                  return (
                    <tr key={v4()}>
                      <td key={v4()}>{change.organization}</td>
                      <td key={v4()}>{change.project}</td>
                      <td key={v4()}>{change.user}</td>
                      <td key={v4()}>{change.variableGroupFilter}</td>
                      <td key={v4()}>{change.type}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <PaginationButtons collection={changes} />
        </>
      )}
    </div>
  );
};
