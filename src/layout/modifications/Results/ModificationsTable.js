import React, { useContext, useEffect, useState } from "react";
import {
  ChangesContext,
  EntityRecordTypeContext,
  PaginationCounterContext,
} from "../../../contexts/Contexts";
import TableHeader from "../../main/Results/TableHeader";
import { v4 } from "uuid";
import PaginationButtons from "../../main/Results/PaginationButtons";

export const ModificationsTable = () => {
  const { changes } = useContext(ChangesContext);
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { entityType } = useContext(EntityRecordTypeContext);
  const [ columnList, setColumnList ] = useState([]);
  const number = 10;

  useEffect(() => {
    let columns = [];
    if (entityType === "env_Variables") {
      columns = [
        "Organization",
        "Project",
        "User",
        "Variable group regex",
        "Key",
        "Operation type",
        "Date",
      ];
    } else {
      columns = [
        "KeyVaultName",
        "User",
        "Secret name regex",
        "Operation type",
        "Date",
      ];
    }
    setColumnList(columns);
  }, [entityType, setColumnList]);

  const getTableRowData = (change, date) => {
    switch (entityType) {
      case "secrets":
        return (
          <tr key={v4()}>
            <td key={v4()}>{change.keyVaultName}</td>
            <td key={v4()}>{change.user}</td>
            <td key={v4()}>{change.secretNameRegex}</td>
            <td key={v4()}>{change.changeType === 0? "Recover": "Delete"}</td>
            <td key={v4()}>{date.toUTCString()}</td>
          </tr>
        );
      case "env_Variables":
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
      default:
        alert("Invalid record requesting!");
    }
  };

  return (
    <div>
      {changes.length === 0 ? (
        <h2>No records found.</h2>
      ) : (
        <>
          <h3>{`Records (found ${changes.length} elements):`}</h3>
          <table>
            <thead>
              <TableHeader columnList={columnList} />
            </thead>

            <tbody>
              {changes
                .slice(paginationCounter, paginationCounter + number)
                .map((change) => {
                  let date = new Date(change.date);
                  return getTableRowData(change, date);
                })}
            </tbody>
          </table>
          <PaginationButtons collection={changes} />
        </>
      )}
    </div>
  );
};
