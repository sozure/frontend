import React, { useContext } from "react";
import { RepositoriesContext } from "../../../../contexts/Contexts";
import TagAndBuildTableBody from "./TagAndBuildTableBody";
import TagBaseTable from "./TagBaseTable";

const TagAndBuildTable = () => {
  const tableHeader = [
    "Repository",
    "Latest tag",
    "Type of new version",
    "Possible new tag",
    "Tag description",
    "Create and build",
  ];
  const { repositories } = useContext(RepositoriesContext);

  return (
    <TagBaseTable
      TableBody={TagAndBuildTableBody}
      tableHeader={tableHeader}
      repositories={repositories}
      isPullRequestCreations={false}
    />
  );
};

export default TagAndBuildTable;
