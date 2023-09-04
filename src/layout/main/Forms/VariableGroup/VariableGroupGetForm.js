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

import VariableGroupBaseForm from "./VariableGroupBaseForm";


const VariableGroupGetForm = () => {
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setLoading } = useContext(LoadingContext);
  const { organizationName } = useContext(OrganizationContext);
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
    }
  };

  return (
    <div>
      <div id="form">
      <VariableGroupBaseForm/>

        <input
          type="text"
          id="key_regex"
          name="key_regex"
          placeholder={"Variable key regex"}
          value={keyRegex}
          onChange={(event) => setKeyRegex(event.target.value)}
        />

        <input
          type="text"
          id="value_regex"
          name="value_regex"
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