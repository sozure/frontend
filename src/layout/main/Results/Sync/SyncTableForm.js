import React, { useContext } from "react";
import { v4 } from "uuid";
import {
  ContainingVGsContext,
  ContainingVGsProjectContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectsContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { syncVariableGroups } from "../../../../services/VariableGroupServices/VariableGroupService";
import { ToastContainer } from "react-toastify";

const SyncTableForm = () => {
  const { syncVariables } = useContext(VariablesSyncContext);
  const { setLoading } = useContext(LoadingContext);
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { profileName } = useContext(ProfileNameContext);
  const { projects } = useContext(ProjectsContext);

  const { containingVGsProject, setContainingVGsProject } = useContext(
    ContainingVGsProjectContext
  );
  const { setContainingVGs } = useContext(ContainingVGsContext);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select Azure project</InputLabel>
        <Select
          id={`project-${v4()}`}
          value={containingVGsProject}
          label="Select Azure project"
          onChange={async (event) => {
            setContainingVGsProject(event.target.value);
            let counter = 0;
            let result = [];
            syncVariables.forEach(async (variable) => {
              let body = {
                projectName: event.target.value,
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
          {projects.map((project) => (
            <MenuItem value={project.name} key={project.name}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ToastContainer />
    </>
  );
};

export default SyncTableForm;
