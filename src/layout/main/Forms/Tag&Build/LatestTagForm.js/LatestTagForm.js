import React, { useContext, useEffect } from "react";
import TagBaseForm from "../TagBaseForm";
import { getRepositories } from "../../../../../services/GitRepositoryService";
import {
  LatestTagsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  ProjectNameContext,
  RepositoriesContext,
} from "../../../../../contexts/Contexts";
import { queryLatestTags } from "../../../../../services/GitVersionService";

const LatestTagForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { setLoading } = useContext(LoadingContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { repositories, setRepositories } = useContext(RepositoriesContext);
  const { setLatestTags } = useContext(LatestTagsContext);

  const send = async () => {
    setPaginationCounter(0);
    setLatestTags({});
    setRepositories([]);
    setLoading(true);
    await getRepositories(
      organizationName,
      projectName,
      pat,
      undefined,
      setRepositories
    );
  };

  useEffect(() => {
    if (repositories.length > 0) {
      queryLatestTags(
        organizationName,
        pat,
        repositories,
        setLoading,
        setLatestTags
      );
    }
  }, [organizationName, pat, repositories, setLatestTags, setLoading]);

  return (
    <TagBaseForm
      projectName={projectName}
      setProjectName={setProjectName}
      send={send}
    />
  );
};

export default LatestTagForm;
