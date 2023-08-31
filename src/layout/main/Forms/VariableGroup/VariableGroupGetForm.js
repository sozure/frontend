import React, { useContext, useEffect } from "react";
import { sendListRequest } from "../../../../Services/VariableGroupService";
import { ValueRegexContext } from "../../../../contexts/Contexts";

import {
    PATContext,
    ProjectNameContext,
    VGRegexContext,
    OrganizationContext,
    MessageContext,
    KeyRegexContext,
    VariableGroupsContext,
    LoadingContext
  } from "../../../../contexts/Contexts";

const VariableGroupGetForm = () => {
  const { pat, setPat } = useContext(PATContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { vgRegex, setVgRegex } = useContext(VGRegexContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setLoading } = useContext(LoadingContext);
  const { organizationName, setOrganizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(KeyRegexContext);
  const { valueRegex, setValueRegex } = useContext(ValueRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  
  const mandatoryFields = [pat, projectName, vgRegex, keyRegex];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      organizationName: organizationName,
      keyRegex: keyRegex,
      valueRegex: valueRegex,
      setLoading: setLoading
    });
  }, [projectName, pat, vgRegex, keyRegex, valueRegex, organizationName, setLoading, setMessage]);

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      sendListRequest(message, valueRegex, setVariableGroups);
      //alert("Everything is fine! Get VG!");
    }
  };

  return (
    <div>
      <div id="form">
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

        <input
          type="text"
          id="filter"
          name="filter"
          placeholder={"Variable key regex"}
          value={keyRegex}
          onChange={(event) => setKeyRegex(event.target.value)}
        />

        <input
          type="text"
          id="filter"
          name="filter"
          placeholder={"Variable value regex"}
          value={valueRegex}
          onChange={(event) => setValueRegex(event.target.value)}
        />

        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
    </div>
  )
}

export default VariableGroupGetForm