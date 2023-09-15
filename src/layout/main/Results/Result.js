import React, { useContext } from "react";
import VGTable from "./VariableGroup/VGTable";
import { TableTypeContext } from "../../../contexts/Contexts";
import KVTable from "./KeyVault/KVTable";

const Result = () => {
  const { tableType } = useContext(TableTypeContext);
  return (
    <div>
      {tableType === "KV" ? <KVTable /> : <VGTable />}
      
    </div>
  );
};

export default Result;
