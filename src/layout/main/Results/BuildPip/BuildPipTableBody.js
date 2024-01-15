import React, { useContext } from "react";
import BuildPipTableBodyRow from "./BuildPipTableBodyRow";
import { PaginationCounterContext } from "../../../../contexts/Contexts";

const BuildPipTableBody = ({ buildPipelines }) => {
  const number = 10;
  const { paginationCounter } = useContext(PaginationCounterContext);

  return (
    <tbody>
      {buildPipelines
        .slice(paginationCounter, paginationCounter + number)
        .map((pipeline) => {
          return <BuildPipTableBodyRow pipeline={pipeline} />;
        })}
    </tbody>
  );
};

export default BuildPipTableBody;
