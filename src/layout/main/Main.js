import React, { useContext } from "react";
import Form from "./Forms/Form";
import Result from "./Results/Result";

import { LoadingContext } from "../../contexts/Contexts";
import CustomClipLoader from "../CustomClipLoader";

export const Main = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <div className="result-footer">
      <Form />
      {loading ? <CustomClipLoader size={150} /> : <Result />}
    </div>
  );
};
