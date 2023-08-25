import React, { useContext } from 'react';

import Form from './Form';
import Result from './Result';

import KVButtonOptions from './buttons_segments/KVButtonOptions';
import VGButtonOptions from './buttons_segments/VGButtonOptions';

import { 
  LoadingContext,
  SecretContext, 
  TableTypeContext, 
  VariableGroupsContext
 } from "../../contexts/Contexts";

function Sheet() {
  const { variableGroups } = useContext(VariableGroupsContext);
  const { tableType } = useContext(TableTypeContext);
  const { loading } = useContext(LoadingContext);
  const { secrets } = useContext(SecretContext);


  return (
    <div>
        <Form/>
        {loading? 
          <h2>Loading...</h2>:
          <>
            <Result/>
            {
              tableType === "VG" && variableGroups.length > 0? 
                <VGButtonOptions/>
                : tableType === "KV" && secrets.length > 0?
                  <KVButtonOptions/>
                :
                <></>
            }
          </>
        }
    </div>
  )
}

export default Sheet;