import React, { useContext } from "react";
import KVResultTable from "./KeyVault/KVResultTable";
import VGTable from "./VariableGroup/VGTable";
import { TableTypeContext } from "../../../contexts/Contexts";

const Result = () => {
  const { tableType } = useContext(TableTypeContext);
  return (
    <div>
      {tableType === "KV" ? <KVResultTable /> : <VGTable />}
      
    </div>
  );
};

export default Result;
