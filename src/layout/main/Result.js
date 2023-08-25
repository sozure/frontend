import React, { useContext } from 'react'
import KVResultTable from './tables/KVResultTable';
import VGResultTable from './tables/VGResultTable';

import {
  TableTypeContext
 } from "../../contexts/Contexts";

function Result() {

  const { tableType } = useContext(TableTypeContext);

  return (
    <div>{tableType === "KV"? 
      <KVResultTable/>
    : 
    <VGResultTable/> }</div>
  )
}

export default Result;