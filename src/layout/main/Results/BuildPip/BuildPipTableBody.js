import React, { useContext } from "react";
import BuildPipTableBodyRow from "./BuildPipTableBodyRow";
import { PaginationCounterContext } from "../../../../contexts/Contexts";
import PropTypes from "prop-types";

const BuildPipTableBody = ({ buildPipelines }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);

  return (
    <tbody>
      {buildPipelines
        .slice(paginationCounter, paginationCounter + number)
        .map((pipeline) => {
          return <BuildPipTableBodyRow key={pipeline.id} pipeline={pipeline} />;
        })}
    </tbody>
  );
};

BuildPipTableBody.propTypes = {
  buildPipelines: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BuildPipTableBody;
