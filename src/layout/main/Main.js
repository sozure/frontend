import React, { useContext } from "react";
import Form from "./Forms/Form";
import Result from "./Results/Result";

import { LoadingContext } from "../../contexts/Contexts";

export const Main = () => {
  const { loading } = useContext(LoadingContext);
  return (
    <div className="result-footer">
      <Form />
      {loading ? <h2>Loading...</h2> : <Result />}
    </div>
  );
};
