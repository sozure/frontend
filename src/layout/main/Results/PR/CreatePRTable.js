import React, { useContext } from "react";
import TagBaseTable from "../Tag&Build/TagBaseTable";
import { RepositoriesContext } from "../../../../contexts/Contexts";
import CreatePRTableBody from "./CreatePRTableBody";

const CreatePRTable = () => {
  const tableHeader = ["Azure project", "Repository", "Source branch", "Target branch", "Title", "Autocomplete", "Send"];

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
