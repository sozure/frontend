import React, { useContext, useEffect } from "react";
import TagBaseTable from "../Tag&Build/TagBaseTable";
import {
  RepositoriesContext,
  SelectedRepositoriesContext,
} from "../../../../contexts/Contexts";
import CreatePRsTableBody from "./CreatePRsTableBody";

const CreatePRsTable = () => {
  const tableHeader = ["Selected", "Azure project", "Repository"];
  const { repositories } = useContext(RepositoriesContext);
  const { setSelectedRepositories } = useContext(SelectedRepositoriesContext);

  useEffect(() => {
    let result = [];
    repositories.forEach((repository) => {
      result.push({
        repositoryName: repository.repositoryName,
        repositoryId: repository.repositoryId,
        selected: false,
      });
    });
    setSelectedRepositories(result);
  }, [repositories, setSelectedRepositories]);

  return (
    <TagBaseTable
      repositories={repositories}
      tableHeader={tableHeader}
      TableBody={CreatePRsTableBody}
      isPullRequestCreations={true}
    />
  );
};

export default CreatePRsTable;
