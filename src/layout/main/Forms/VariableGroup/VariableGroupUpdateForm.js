import React, { useContext, useEffect, useState } from "react";
import { sendUpdateRequest } from "../../../../Services/VariableGroupService";
import { OnUpdateContext } from "../../../../contexts/Contexts";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  KeyRegexContext,
  LoadingContext,
  VariableGroupsContext
} from "../../../../contexts/Contexts";

const VariableGroupUpdateForm = () => {
  const {setLoading} = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { pat, setPat } = useContext(PATContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { vgRegex, setVgRegex } = useContext(VGRegexContext);
  const { organizationName, setOrganizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(KeyRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  const [newValue, setNewValue] = useState("");

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex, newValue];

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
  }, [
    projectName,
    pat,
    vgRegex,
    keyRegex,
    setLoading,
    setVariableGroups,
    organizationName,
    setMessage,
  ]);

  const send = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      sendUpdateRequest(message, newValue, "", setOnUpdate);
      //alert("Everything is fine! Update VG!");
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

        <input
          type="text"
          id="filter"
          name="filter"
          placeholder={"Variable's new value"}
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
        />

        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
    </div>
  );
};

export default VariableGroupUpdateForm;
