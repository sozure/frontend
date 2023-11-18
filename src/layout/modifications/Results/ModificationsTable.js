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
        <h3>{`Records (found ${changes.length} elements):`}</h3>
          <table>
            <thead>
              <TableHeader
                columnList={[
                  "Organization",
                  "Project",
                  "User",
                  "Variable group regex",
                  "Key",
                  "Operation type",
                  "Date",
                ]}
              />
            </thead>

            <tbody>
              {changes
                .slice(paginationCounter, paginationCounter + number)
                .map((change) => {
                  let date = new Date(change.date);
                  return (
                    <tr key={v4()}>
                      <td key={v4()}>{change.organization}</td>
                      <td key={v4()}>{change.project}</td>
                      <td key={v4()}>{change.user}</td>
                      <td key={v4()}>{change.variableGroupFilter}</td>
                      <td key={v4()}>{change.key}</td>
                      <td key={v4()}>{change.type}</td>
                      <td key={v4()}>{date.toUTCString()}</td>
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
