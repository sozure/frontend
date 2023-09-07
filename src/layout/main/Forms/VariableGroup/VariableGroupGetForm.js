import React, { useContext, useEffect, useState } from "react";
import { sendListRequest } from "../../../../services/VariableGroupService";
import { ValueRegexContext } from "../../../../contexts/Contexts";
import "../../../../CSS/Checkbox.css"

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  KeyRegexContext,
  VariableGroupsContext,
  LoadingContext,
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
  const [secretIncluded, setSecretIncluded] = useState(false);

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      organizationName: organizationName,
      keyRegex: keyRegex,
      valueRegex: valueRegex,
      setLoading: setLoading,
      secretIncluded: secretIncluded
    });
  }, [
    projectName,
    pat,
    vgRegex,
    keyRegex,
    valueRegex,
    organizationName,
    setLoading,
    setMessage,
    secretIncluded
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
      sendListRequest(message, valueRegex, setVariableGroups, projectName === "All");
    }
  };

  return (
    <div>
      <div id="form">
        <VariableGroupBaseForm />

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
        <label className="checkbox-inline" htmlFor="secret_needed">
          Secret included:{" "}
        </label>
        <input
          type="checkbox"
          id="secret_needed"
          name="secret_needed"
          onChange={() => setSecretIncluded(!secretIncluded)}
        /><br/>
        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
    </div>
  );
};

export default VariableGroupGetForm;
