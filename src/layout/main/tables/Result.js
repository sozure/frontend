import React, { useContext } from "react";
import KVResultTable from "./KVResultTable";
import VGResultTable from "./VGResultTable";

import { TableTypeContext } from "../../../contexts/Contexts";

const Result = () => {
  const { tableType } = useContext(TableTypeContext);

  return (
    <div>{tableType === "KV" ? <KVResultTable /> : <VGResultTable />}</div>
  );
};

export default Result;
