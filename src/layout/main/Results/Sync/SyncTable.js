import React, { useContext } from "react";
import TableHeader from "../TableHeader";
import {
  VGAuthorizedContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import SyncTableBody from "./SyncTableBody";

const SyncTable = () => {
  const { syncVariables } = useContext(VariablesSyncContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);

  const tableHeader = [
    "Variable",
    "Variable type",
    "Modify variable",
    "Containing variable groups",
  ];

  const getTable = () => {
    if (
      syncVariables === null ||
      syncVariables === undefined ||
      syncVariables.length === 0
    ) {
      return <h2>No variables found in config file.</h2>;
    } else {
      return (
        <>
          <h2>Matched variables (Found variables: {syncVariables.length})</h2>
          <br />
          <table className="matched-variables-table">
            <TableHeader columnList={tableHeader} />
            <SyncTableBody />
          </table>
          <br />
          <PaginationButtons collection={syncVariables} />
        </>
      );
    }
  };

  return (
    <div className="matched-variables-table">
      {!vgAuthorized ? <></> : getTable()}
    </div>
  );
};

export default SyncTable;
