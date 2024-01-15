import React, { useContext } from "react";
import VGTable from "./VariableGroup/VGTable";
import { TableTypeContext } from "../../../contexts/Contexts";
import KVTable from "./KeyVault/KVTable";
import { toastErrorPopUp } from "../../../services/CommonService";
import SyncTable from "./Sync/SyncTable";
import BuildPipTable from "./BuildPip/BuildPipTable";

const Result = () => {
  const { tableType } = useContext(TableTypeContext);
  const getTable = () => {
    switch(tableType){
      case "KV":
        return <KVTable/>
      case "VG":
        return <VGTable/>
      case "Sync":
        return <SyncTable/>
      case "Build":
        return <BuildPipTable/>
      default:
        toastErrorPopUp("Invalid tableType value!", "table-type", 1500);
    }
  }
  return (
    <div className="result-footer">
      {getTable()}
    </div>
  );
};

export default Result;
