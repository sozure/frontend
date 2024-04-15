import React, { useContext } from "react";
import TagBaseTable from "../Tag&Build/TagBaseTable";
import { RepositoriesContext } from "../../../../contexts/Contexts";
import CreatePRTableBody from "./CreatePRTableBody";

const CreatePRTable = () => {
  const tableHeader = ["Azure project", "Repository", "Action", "Source branch", "Target branch", "Title", "Send"];

  const { repositories } = useContext(RepositoriesContext);
  return (
    <TagBaseTable
      repositories={repositories}
      tableHeader={tableHeader}
      TableBody={CreatePRTableBody}
      isPullRequestCreations={false}
    />
  );
};

export default CreatePRTable;
