import React, { useContext, useState } from "react";
import TableHeader from "../TableHeader";
import {
  ConfigFileExtensionContext,
  EnvironmentsContext,
  VGAuthorizedContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import PaginationButtons from "../PaginationButtons";
import SyncTableBody from "./SyncTableBody";
import SearchableSelectMenu from "../../../SearchableSelectMenu";

const SyncTable = () => {
  const { syncVariables } = useContext(VariablesSyncContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { environments } = useContext(EnvironmentsContext);
  const [selectedEnv, setSelectedEnv] = useState("");
  const { configFileExtension } = useContext(ConfigFileExtensionContext);

  const tableHeader = configFileExtension === "json"? [
    "Variable",
    "Type",
    "Modify variable",
    "Containing variable groups",
    "Add variable",
  ]: [
    "Variable",
    "Type",
    "Containing variable groups",
    "Add variable",
  ];

  const containsEnvText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

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
          {environments.length > 0 ? (
            <SearchableSelectMenu
              containsText={containsEnvText}
              elementKey={"environments"}
              elements={environments}
              inputLabel={`Found ${environments.length} environment(s)`}
              selectedElement={selectedEnv}
              setSelectedElement={setSelectedEnv}
            />
          ) : (
            <></>
          )}
          <h2>Found variables: {syncVariables.length} due to configuration</h2>
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
    <div className="form">
      {!vgAuthorized ? <></> : getTable()}
    </div>
  );
};

export default SyncTable;
