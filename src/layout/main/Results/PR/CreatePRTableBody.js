import React, { useContext } from "react";
import PropTypes from "prop-types";
import CreatePRTableBodyRow from "./CreatePRTableBodyRow";
import { PaginationCounterContext } from "../../../../contexts/Contexts";

const CreatePRTableBody = ({ filteredRepositories }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);
  return (
    <tbody>
      {filteredRepositories
        .slice(paginationCounter, paginationCounter + number)
        .map((repository) => {
          return (
            <CreatePRTableBodyRow
              key={repository.repositoryName}
              repository={repository}
            />
          );
        })}
    </tbody>
  );
};

CreatePRTableBody.propTypes = {
  filteredRepositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CreatePRTableBody;
