import React, {useContext} from 'react'

import {
    ProjectNameContext,
    VGRegexContext,
    ProjectsContext
  } from "../../../../contexts/Contexts";

const VariableGroupBaseForm = () => {
    const { setProjectName } = useContext(ProjectNameContext);
    const { vgRegex, setVgRegex } = useContext(VGRegexContext);
    const { projects } = useContext(ProjectsContext);

  return (
    <>
        <select
          id="projectName"
          onChange={(event) => setProjectName(event.target.value)}
        >
          {projects.map(project => {
            let projectName = project.name;
            return <option value={projectName} key={projectName}>{projectName}</option>
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