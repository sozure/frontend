import React, { useContext} from "react";
import TagBaseTable from "../TagBaseTable";
import {
  RepositoriesContext
} from "../../../../../contexts/Contexts";
import LatestTagTableBody from "./LatestTagTableBody";

const LatestTagTable = () => {
  const tableHeader = ["Repository", "Latest tag"];
  const { repositories } = useContext(RepositoriesContext);
  return (
    <TagBaseTable
      TableBody={LatestTagTableBody}
      tableHeader={tableHeader}
      repositories={repositories}
      isPullRequestCreations={false}
    />
  );
};

export default LatestTagTable;
