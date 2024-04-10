import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PaginationCounterContext } from "../../../contexts/Contexts";
import TableHeader from "../../main/Results/TableHeader";
import { v4 } from "uuid";
import PaginationButtons from "../../main/Results/PaginationButtons";
import { getToastOnClose, toastErrorPopUp } from "../../../services/CommonService";

export const ModificationsTable = ({ entityType, changes }) => {
  const { paginationCounter } = useContext(PaginationCounterContext);
  const [columnList, setColumnList] = useState([]);
  const number = 10;
  const toastMs = getToastOnClose();

  useEffect(() => {
    let columns = [];
    switch (entityType) {
      case "Secrets":
        columns = [
          "Key vault's name",
          "User",
          "Secret name regex",
          "Operation type",
          "Date",
        ];
        break;
      case "Environment variables":
        columns = [
          "Organization",
          "Project",
          "User",
          "Variable group regex",
          "Key",
          "Operation type",
          "Date",
        ];
        break;
      case "Key vault copies":
        columns = [
          "Original key vault",
          "Destination key vault",
          "User",
          "Date",
        ];
        break;
      default:
        toastErrorPopUp(
          "Invalid record requesting!",
          "record_requesting",
          toastMs
        );
    }
    setColumnList(columns);
  }, [entityType, setColumnList, toastMs]);

  const getTableRowData = (change, date) => {
    switch (entityType) {
      case "Secrets":
        return (
          <tr key={v4()}>
            <td key={v4()}>{change.keyVaultName}</td>
            <td key={v4()}>{change.user}</td>
            <td key={v4()}>{change.secretNameRegex}</td>
            <td key={v4()}>{change.changeType === 0 ? "Recover" : "Delete"}</td>
            <td key={v4()}>{date.toUTCString()}</td>
          </tr>
        );
      case "Environment variables":
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
      case "Key vault copies":
        return (
          <tr key={v4()}>
            <td key={v4()}>{change.originalKeyVault}</td>
            <td key={v4()}>{change.destinationKeyVault}</td>
            <td key={v4()}>{change.user}</td>
            <td key={v4()}>{date.toUTCString()}</td>
          </tr>
        );
      default:
        toastErrorPopUp(
          "Invalid record requesting!",
          "record_requesting",
          toastMs
        );
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
              <TableHeader columnList={columnList} />

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

ModificationsTable.propTypes = {
  entityType: PropTypes.string.isRequired,
  changes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
