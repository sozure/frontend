import React, { useContext } from "react";
import { PropTypes } from "prop-types";
import { v4 } from "uuid";
import {
  ContainingVGsContext,
  ContainingVGsProjectContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  PipelineConnectedVGsContext,
  ProfileNameContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { syncVariableGroups } from "../../../../services/VariableGroupServices/VariableGroupService";
import { getVariableGroups } from "../../../../services/ReleasePipelineService";

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

  return (
    <FormControl fullWidth>
      <InputLabel>Projects containing pipeline</InputLabel>
      <Select
        id={`project-${v4()}`}
        value={containingVGsProject}
        label="Select Azure project"
        onChange={async (event) => {
          setPaginationCounter(0);
          let newProject = event.target.value;
          setContainingVGsProject(newProject);
          let counter = 0;
          let result = [];
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
        }}
      >
        {projectsWithReleasePipeline.map((project) => (
          <MenuItem value={project} key={project}>
            {project}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SyncTableForm.propTypes = {
  repository: PropTypes.string.isRequired,
};

export default SyncTableForm;