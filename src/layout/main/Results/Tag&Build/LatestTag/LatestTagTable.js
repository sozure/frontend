import React, { useContext, useEffect } from "react";
import TagBaseTable from "../TagBaseTable";
import {
  LatestTagsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  RepositoriesContext,
  VGAuthorizedContext,
} from "../../../../../contexts/Contexts";
import LatestTagTableBody from "./LatestTagTableBody";
import { queryLatestTags } from "../../../../../services/GitVersionService";

const LatestTagTable = () => {
  const tableHeader = ["Repository", "Latest tag"];
  const { repositories } = useContext(RepositoriesContext);
  const { latestTags, setLatestTags } = useContext(LatestTagsContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setLoading } = useContext(LoadingContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);

  useEffect(() => {
    if (vgAuthorized && repositories.length > 0 && latestTags.length === 0) {
      console.log(" to call latest tags");
      setLoading(true);
      queryLatestTags(
        organizationName,
        pat,
        repositories,
        setLoading,
        setLatestTags
      );
    }
  }, [
    latestTags,
    setLatestTags,
    repositories,
    organizationName,
    pat,
    setLoading,
    vgAuthorized,
  ]);

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
