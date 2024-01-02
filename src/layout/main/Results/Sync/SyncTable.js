import React, { useContext } from "react";
import TableHeader from "../TableHeader";
import {
  VGAuthorizedContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import SyncTableBody from "./SyncTableBody";
import SyncTableForm from "./SyncTableForm";

const SyncTable = () => {
  const { syncVariables } = useContext(VariablesSyncContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);

  const tableHeader = ["Variable", "Modify variable", "Containing variable groups"];

  const getTable = () => {
    if (
      syncVariables === null ||
      syncVariables === undefined ||
      syncVariables.length === 0
    ) {
      return <h2>No variables found.</h2>;
    } else {
      return (
        <>
          <SyncTableForm />
          <h2>Matched variables (Found variables: {syncVariables.length})</h2>
          <br />
          <table className="matched-variables-table">
            <thead>
              <TableHeader columnList={tableHeader} />
            </thead>

            <tbody>
              <SyncTableBody />
            </tbody>
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
