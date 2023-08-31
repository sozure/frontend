import React, { useContext, useEffect, useState } from "react";
import { sendAddRequest } from "../../../../Services/VariableGroupService";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  LoadingContext,
  VariableGroupsContext,
  OnAddContext
} from "../../../../contexts/Contexts";

const VariableGroupAddForm = () => {
  const {setOnAdd} = useContext(OnAddContext);
  const {setLoading} = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { pat, setPat } = useContext(PATContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { vgRegex, setVgRegex } = useContext(VGRegexContext);
  const { organizationName, setOrganizationName } = useContext(OrganizationContext);
  const { message, setMessage } = useContext(MessageContext);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const mandatoryFields = [pat, projectName, vgRegex, newKey, newValue];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      keyRegex: ".*",
      organizationName: organizationName,
      setLoading: setLoading,
      setVariableGroups: setVariableGroups
    });
  }, [
    projectName,
    pat,
    vgRegex,
    organizationName,
    setLoading,
    setVariableGroups,
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
      sendAddRequest(message, newKey, newValue, "", setOnAdd);
      //alert("Everything is fine! Add VG!");
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
          placeholder={"New variable's key"}
          value={newKey}
          onChange={(event) => setNewKey(event.target.value)}
        />

        <input
          type="text"
          id="filter"
          name="filter"
          placeholder={"New variable's value"}
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

export default VariableGroupAddForm;
