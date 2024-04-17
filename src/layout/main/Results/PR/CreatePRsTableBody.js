import React, { useContext } from "react";
import {
  PaginationCounterContext,
} from "../../../../contexts/Contexts";
import PropTypes from "prop-types";
import CreatePRsTableBodyRow from "./CreatePRsTableBodyRow";

const CreatePRsTableBody = ({ filteredRepositories }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);

  return (
    <tbody>
      {filteredRepositories
        .slice(paginationCounter, paginationCounter + number)
        .map((repository) => {
          return (
            <CreatePRsTableBodyRow
              key={repository.repositoryName}
              repository={repository}
            />
          );
        })}
    </tbody>
  );
};

CreatePRsTableBody.propTypes = {
  filteredRepositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CreatePRsTableBody;
