import React, { useContext } from "react";
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
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { syncVariableGroups } from "../../../../services/VariableGroupServices/VariableGroupService";
import {
  getEnvironments,
  getVariableGroups,
} from "../../../../services/ReleasePipelineService";

const SyncTableForm = ({ projectsWithReleasePipeline, repository }) => {
  const { syncVariables } = useContext(VariablesSyncContext);
  const { setLoading } = useContext(LoadingContext);
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { profileName } = useContext(ProfileNameContext);
  const { setPipelineConnectedVGs } = useContext(PipelineConnectedVGsContext);
  const { containingVGsProject, setContainingVGsProject } = useContext(
    ContainingVGsProjectContext
  );
  const { setContainingVGs } = useContext(ContainingVGsContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setEnvironments } = useContext(EnvironmentsContext);

  const send = async (newProject) => {
    setLoading(true);
    setPaginationCounter(0);
    setContainingVGsProject(newProject);
    let counter = 0;
    let result = [];
    await getEnvironments(
      organizationName,
      newProject,
      pat,
      repository,
      setEnvironments
    );
    await getVariableGroups(
      organizationName,
      newProject,
      pat,
      repository,
      setPipelineConnectedVGs
    );
    syncVariables.forEach(async (variable) => {
      let body = {
        projectName: newProject,
        pat: pat,
        userName: profileName,
        vgRegex: ".*",
        keyRegex: variable,
        organizationName: organizationName,
        index: counter,
        secretIncluded: true,
        containsKey: true,
      };
      counter++;
      await syncVariableGroups(
        body,
        result,
        syncVariables.length,
        setContainingVGs,
        setLoading
      );
    });
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Projects containing pipeline</InputLabel>
        <Select
          id={`project-${v4()}`}
          value={containingVGsProject}
          label="Select Azure project"
          onChange={(event) => send(event.target.value)}
        >
          {projectsWithReleasePipeline.map((project) => (
            <MenuItem value={project} key={project}>
              {project}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button id="refresh" onClick={() => send(containingVGsProject)} variant="contained">
          <RefreshIcon />
        </Button>
      </Box>
    </>
  );
};

SyncTableForm.propTypes = {
  repository: PropTypes.string.isRequired,
  projectsWithReleasePipeline: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SyncTableForm;
