import React, { useContext, useEffect } from "react";
import {
  AllRepositoryChecked,
  PaginationCounterContext,
  RepositoriesContext,
  SelectedRepositoriesContext,
} from "../../../../contexts/Contexts";
import PropTypes from "prop-types";
import CreatePRsTableBodyRow from "./CreatePRsTableBodyRow";

const CreatePRsTableBody = ({ filteredRepositories }) => {
  const number = 5;
  const { paginationCounter } = useContext(PaginationCounterContext);
  const { repositories } = useContext(RepositoriesContext);
  const { setSelectedRepositories } = useContext(SelectedRepositoriesContext);
  const { allRepositoryChecked } = useContext(AllRepositoryChecked);

  useEffect(() => {
    let result = [];
    repositories.forEach((repository) => {
      result.push({
        repositoryName: repository.repositoryName,
        repositoryId: repository.repositoryId,
        selected: allRepositoryChecked,
      });
    });
    setSelectedRepositories(result);
  }, [repositories, allRepositoryChecked, setSelectedRepositories]);

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
