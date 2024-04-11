import React, { useContext } from "react";
import TagBaseTable from "../Tag&Build/TagBaseTable";
import {
  RepositoriesContext,
} from "../../../../contexts/Contexts";
import CreatePRsTableBody from "./CreatePRsTableBody";

const CreatePRsTable = () => {
  const tableHeader = ["Selected", "Azure project", "Repository"];
  const { repositories } = useContext(RepositoriesContext);

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
