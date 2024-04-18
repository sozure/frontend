import React, { useContext, useEffect } from "react";
import { PropTypes } from "prop-types";
import RefreshIcon from "@mui/icons-material/Refresh";
import { v4 } from "uuid";
import {
  ContainingVGsContext,
  ContainingVGsProjectContext,
  EnvironmentsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  PipelineConnectedVGsContext,
  ProfileNameContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";

import {
  getEnvironments,
  getVariableGroups,
} from "../../../../services/ReleasePipelineService";
import MatUIButton from "../../../MatUIButton";
import MatUISelect from "../../../MatUISelect";

const SyncTableForm = ({
  projectsWithReleasePipeline,
  repository,
  configFileName,
}) => {
  const { syncVariables } = useContext(VariablesSyncContext);
  const { setLoading } = useContext(LoadingContext);
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { profileName } = useContext(ProfileNameContext);
  const { setPipelineConnectedVGs } = useContext(
    PipelineConnectedVGsContext
  );
  const { containingVGsProject, setContainingVGsProject } = useContext(
    ContainingVGsProjectContext
  );
  const { containingVGs, setContainingVGs } = useContext(ContainingVGsContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setEnvironments } = useContext(EnvironmentsContext);

  const send = async (newProject) => {
    setLoading(true);
    setPaginationCounter(0);
    setContainingVGsProject(newProject);
    let body = {
      organization: organizationName,
      project: newProject,
      pat: pat,
      repositoryName: repository,
      configFile: configFileName,
    };
    await getEnvironments(
      body,
      setEnvironments
    );
    body = {
      organization: organizationName,
      project: newProject,
      pat: pat,
      repositoryName: repository,
      configFile: configFileName,
    };
    await getVariableGroups(
      body,
      syncVariables,
      profileName,
      setContainingVGs,
      setPipelineConnectedVGs,
      setLoading
    );
  };

  useEffect(() => {
    setLoading(false);
  }, [containingVGs, setLoading]);

  return (
    <div className="form">
      <MatUISelect
          collection={projectsWithReleasePipeline}
          inputLabel={`Projects containing pipeline (${projectsWithReleasePipeline.length} found)`}
          id={`project-${v4()}`}
          selectValue={containingVGsProject}
          setSelectValue={send}
          allOption={false}
        />
      {containingVGsProject !== "" && (
        <MatUIButton
          id={"get_var_from_config"}
          send={() => send(containingVGsProject)}
          displayName={<RefreshIcon />}
        />
      )}
    </div>
  );
};

SyncTableForm.propTypes = {
  repository: PropTypes.string.isRequired,
  configFileName: PropTypes.string.isRequired,
  projectsWithReleasePipeline: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SyncTableForm;
