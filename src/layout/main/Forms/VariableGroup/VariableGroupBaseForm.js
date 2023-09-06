import React, {useContext} from 'react'

import {
    ProjectNameContext,
    VGRegexContext,
    ProjectsContext
  } from "../../../../contexts/Contexts";

const VariableGroupBaseForm = () => {
    const { projectName, setProjectName } = useContext(ProjectNameContext);
    const { vgRegex, setVgRegex } = useContext(VGRegexContext);
    const { projects } = useContext(ProjectsContext);

  return (
    <>
        <select
          id="projectName"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        >
          <option value={"All"} key={"All"}>{"All"}</option>
          {projects.map(project => {
            let selectedProjectName = project.name;
            return <option value={selectedProjectName} key={selectedProjectName}>{selectedProjectName}</option>
          })}
        </select>

        <input
          type="text"
          id="variable_group_regex"
          name="variable_group_regex"
          placeholder={"Variable group regex"}
          value={vgRegex}
          onChange={(event) => setVgRegex(event.target.value)}
        />
    </>
  )
}

export default VariableGroupBaseForm