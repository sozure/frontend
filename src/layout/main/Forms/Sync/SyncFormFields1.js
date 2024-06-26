import React, { useContext } from "react";
import {
  OrganizationContext,
  PATContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";
import SearchableSelectMenu from "../../../SearchableSelectMenu";
import { getConfigFiles } from "../../../../services/GitFileService";
import PropTypes from "prop-types";

const getRepositoryId = (repositories, repository) => {
  let repositoryId = "";
  repositories.forEach((repo) => {
    if (repo.repositoryName === repository) {
      repositoryId = repo.repositoryId;
    }
  });
  return repositoryId;
};

const SyncFormFields1 = ({
  repository,
  setRepository,
  actualBranch,
  setActualBranch,
  branches,
  setBranches,
  repositories,
  setConfigFile,
  setConfigFiles,
  setProjectsWithPipeline,
  setConfigLocalLoading
}) => {
  const { projectName } = useContext(ProjectNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);

  const containsRepoText = (element, searchText) =>
    element.repositoryName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const containsBranchText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const customSetRepository = (value) => {
    setProjectsWithPipeline([]);
    setBranches([]);
    setRepository(value);
    setActualBranch("");
    setConfigFile("");
  };

  const customSetActualBranch = async (value) => {
    setProjectsWithPipeline([]);
    setActualBranch(value);
    setConfigFile("");
    let repositoryId = getRepositoryId(repositories, repository);
    await getConfigFiles(
      organizationName,
      pat,
      repositoryId,
      value,
      setConfigFiles,
      setConfigLocalLoading
    );
  };

  return (
    <>
      {(projectName !== "" && repositories.length > 0) && (
        <SearchableSelectMenu
          containsText={containsRepoText}
          elementKey={"repositoryName"}
          elements={repositories}
          inputLabel={"Select repository"}
          selectedElement={repository}
          setSelectedElement={customSetRepository}
        />
      )}{" "}
      {(repository !== "" && branches.length > 0) && (
        <SearchableSelectMenu
          containsText={containsBranchText}
          elementKey={"branch"}
          elements={branches}
          inputLabel={"Select branch"}
          selectedElement={actualBranch}
          setSelectedElement={customSetActualBranch}
        />
      )}
    </>
  );
};

SyncFormFields1.propTypes = {
    repository: PropTypes.string.isRequired,
    setRepository: PropTypes.func.isRequired,
    actualBranch: PropTypes.string.isRequired,
    setActualBranch: PropTypes.func.isRequired,
    branches: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    repositories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    setConfigFile: PropTypes.func.isRequired,
    setConfigFiles: PropTypes.func.isRequired,
    setProjectsWithPipeline: PropTypes.func.isRequired,
    setConfigLocalLoading: PropTypes.func.isRequired,
    setBranches: PropTypes.func.isRequired
}

export default SyncFormFields1;
