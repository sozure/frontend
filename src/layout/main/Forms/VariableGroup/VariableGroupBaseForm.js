import React, {useContext} from 'react'

import {
    PATContext,
    ProjectNameContext,
    VGRegexContext,
    OrganizationContext,
  } from "../../../../contexts/Contexts";

const VariableGroupBaseForm = () => {
    const { pat, setPat } = useContext(PATContext);
    const { projectName, setProjectName } = useContext(ProjectNameContext);
    const { vgRegex, setVgRegex } = useContext(VGRegexContext);
    const { organizationName, setOrganizationName } = useContext(OrganizationContext);

  return (
    <>
        <input
          type="password"
          id="pat"
          name="pat"
          placeholder="Personal Access Token"
          value={pat}
          onChange={(event) => setPat(event.target.value)}
        />

        <input
          type="text"
          id="organizationName"
          name="organizationName"
          placeholder="Name of organization"
          value={organizationName}
          onChange={(event) => setOrganizationName(event.target.value)}
        />

        <input
          type="text"
          id="projectName"
          name="projectName"
          placeholder="Name of project"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />

        <input
          type="text"
          id="filter"
          name="filter"
          placeholder={"Variable group regex"}
          value={vgRegex}
          onChange={(event) => setVgRegex(event.target.value)}
        />
    </>
  )
}

export default VariableGroupBaseForm