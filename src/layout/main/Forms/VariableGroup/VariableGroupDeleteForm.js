import React, { useContext, useEffect } from "react";
import { sendDeleteRequest } from "../../../../Services/VariableGroupService";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  KeyRegexContext,
  OnDeleteContext,
  LoadingContext,
  VariableGroupsContext
} from "../../../../contexts/Contexts";

const VariableGroupDeleteForm = () => {
  const {setOnDelete} = useContext(OnDeleteContext);
  const {setLoading} = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { pat, setPat } = useContext(PATContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { vgRegex, setVgRegex } = useContext(VGRegexContext);
  const { organizationName, setOrganizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(KeyRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  
  const mandatoryFields = [pat, projectName, vgRegex, keyRegex];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      organizationName: organizationName,
      keyRegex: keyRegex,
      setLoading: setLoading,
      setVariableGroups: setVariableGroups
    });
  }, [projectName, pat, vgRegex, keyRegex, organizationName, setLoading, setVariableGroups, setMessage]);

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      sendDeleteRequest(message, "", setOnDelete);
      //alert("Everything is fine! Delete VG!");
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
          placeholder={"Variable's key"}
          value={keyRegex}
          onChange={(event) => setKeyRegex(event.target.value)}
        />

        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
    </div>
  );
};

export default VariableGroupDeleteForm;
