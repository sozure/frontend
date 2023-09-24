import React, { useContext } from "react";

import {
  ProjectNameContext,
  VGRegexContext,
  ProjectsContext,
} from "../../../../contexts/Contexts";
import { FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";

const VariableGroupBaseForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { vgRegex, setVgRegex } = useContext(VGRegexContext);
  const { projects } = useContext(ProjectsContext);

  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select project name</InputLabel>
        <Select
          id="projectName"
          value={projectName}
          label="Select project name"
          onChange={(event) => setProjectName(event.target.value)}
        >
          <MenuItem value={"All"} key={"All"}>
            {"All"}
          </MenuItem>
          {projects.map((project) => {
            let selectedProjectName = project.name;
            return (
              <MenuItem value={selectedProjectName} key={selectedProjectName}>
                {selectedProjectName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Input fullWidth
        type="text"
        id="variable_group_regex"
        name="variable_group_regex"
        placeholder={"Name (regex) of variable group"}
        value={vgRegex}
        onChange={(event) => setVgRegex(event.target.value)}
      />
      <br />
      <br />
    </>
  );
};

export default VariableGroupBaseForm;
