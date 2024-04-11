import React, { useContext } from "react";
import PropTypes from "prop-types";
import { PaginationCounterContext } from "../../../../contexts/Contexts";
import PRTableBodyRow from "./PRTableBodyRow";
import { v4 } from "uuid";

const PRTableBody = ({ pullRequests }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);

  return (
    <tbody>
      {pullRequests
        .slice(paginationCounter, paginationCounter + number)
        .map((pullRequest) => {
          return <PRTableBodyRow key={v4()} pullRequest={pullRequest} />;
        })}
    </tbody>
  );
};

PRTableBody.propTypes = {
  pullRequests: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PRTableBody;
