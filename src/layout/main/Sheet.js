import React, { useContext } from 'react';
import Form from './Forms/Form';
import Result from './Tables/Result';

import { 
  LoadingContext
 } from "../../contexts/Contexts";

function Sheet() {
  const { loading } = useContext(LoadingContext);

  return (
    <div>
        <Form/>
        {loading? 
          <h2>Loading...</h2>:
          <>
            <Result/>
          </>
        }
    </div>
  )
}

export default Sheet;