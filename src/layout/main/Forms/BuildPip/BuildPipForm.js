import React, { useContext, useEffect } from "react";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import {
  BuildPipelinesContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";
import MatUIButton from "../../../MatUIButton";
import { getBuildPipelines } from "../../../../services/BuildPipelineService";

const BuildPipForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { setBuildPipelines } = useContext(
    BuildPipelinesContext
  );
  const { setLoading } = useContext(LoadingContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const send = async () => {
    setPaginationCounter(0);
    setBuildPipelines([]);
    await getBuildPipelines(
      organizationName,
      projectName,
      pat,
      setBuildPipelines,
      setLoading
    );
  };

  return (
    <div className="form">
      <ProjectSelectMenu
        allOption={false}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <MatUIButton
        id={"request_build_pipelines"}
        send={send}
        displayName={"Get build pipelines"}
      />
    </div>
  );
};

export default BuildPipForm;
