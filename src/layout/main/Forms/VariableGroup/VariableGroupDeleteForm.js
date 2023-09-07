import React, { useContext, useEffect } from "react";
import { sendListRequest } from "../../../../services/VariableGroupService";

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

import VariableGroupBaseForm from "./VariableGroupBaseForm";

const VariableGroupDeleteForm = () => {
  const { setOnDelete } = useContext(OnDeleteContext);
  const {setLoading} = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { organizationName } = useContext(OrganizationContext);
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
      setVariableGroups: setVariableGroups,
      secretIncluded: false
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
      sendListRequest(message, "", setVariableGroups, projectName === "All");
      setOnDelete(true);
    }
  };

  return (
    <div>
      <div id="form">
      <VariableGroupBaseForm/>
        <input
          type="text"
          id="variable_key"
          name="variable_key"
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