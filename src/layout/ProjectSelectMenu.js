import React, { useContext } from "react";
import { v4 } from "uuid";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ProjectsContext } from "../contexts/Contexts";

const ProjectSelectMenu = ({ allOption, projectName, setProjectName }) => {
  const { projects } = useContext(ProjectsContext);
  return (
    <FormControl fullWidth>
      <InputLabel>Select Azure project</InputLabel>
      <Select
        id={`project-${v4()}`}
        value={projectName}
        label="Select Azure project"
        onChange={(event) => setProjectName(event.target.value)}
      >
        {allOption && (
          <MenuItem value={"All"} key={"All"}>
            {"All"}
          </MenuItem>
        )}
        {projects.map((project) => (
          <MenuItem value={project.name} key={project.name}>
            {project.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProjectSelectMenu;
