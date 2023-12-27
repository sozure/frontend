import React from "react";
import CommonFormElements from "./CommonFormElements";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
  } from "@mui/material";

export const VGModificationsForm = ({
    setProjectName,
    projectName,
    projects,
    setUserName,
    userName,
    setSelectedLimit,
    selectedLimit,
    setFrom,
    from,
    setTo,
    to
  }) => {
  return (
    <>
      <FormControl fullWidth>
        <InputLabel>Select Azure project</InputLabel>
        <Select
          id="project"
          value={projectName}
          label="Select Azure project"
          onChange={(event) => setProjectName(event.target.value)}
        >
          {projects.map((project) => (
            <MenuItem value={project.name} key={project.name}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <CommonFormElements
        setUserName={setUserName}
        userName={userName}
        setSelectedLimit={setSelectedLimit}
        selectedLimit={selectedLimit}
        setFrom={setFrom}
        from={from}
        setTo={setTo}
        to={to}
      />
    </>
  );
};
