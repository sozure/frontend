import React, { useContext, useEffect } from "react";
import {
  BuildPipelinesContext,
  LatestTagsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  ProjectNameContext,
  RepositoriesContext,
} from "../../../../contexts/Contexts";
import { getRepositories } from "../../../../services/GitRepositoryService";
import { getBuildPipelines } from "../../../../services/BuildPipelineService";
import TagBaseForm from "./TagBaseForm";

const TagAndBuildForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { setLoading } = useContext(LoadingContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { buildPipelines, setBuildPipelines } = useContext(BuildPipelinesContext);
  const { repositories, setRepositories } = useContext(RepositoriesContext);
  const { setLatestTags } = useContext(LatestTagsContext);

  const send = async () => {
    setPaginationCounter(0);
    setLatestTags([]);
    setRepositories([]);
    setLoading(true);
    await getRepositories(
      organizationName,
      projectName,
      pat,
      setLoading,
      setRepositories
    );
    await getBuildPipelines(
      organizationName,
      projectName,
      pat,
      setBuildPipelines,
      setLoading
    );
  };

  useEffect(() => {
    setLoading(false);
  }, [buildPipelines, repositories, setLoading]);

  return (
    <TagBaseForm
      projectName={projectName}
      setProjectName={setProjectName}
      send={send}
    />
  );
};

export default TagAndBuildForm;
