import React, { useContext, useEffect } from "react";
import { sendListRequest } from "../../../../services/VariableGroupService";
import { NewValueContext, OnUpdateContext } from "../../../../contexts/Contexts";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  KeyRegexContext,
  LoadingContext,
  VariableGroupsContext,
  ValueRegexContext
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";

const VariableGroupUpdateForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { organizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(KeyRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  const { newValue, setNewValue } = useContext(NewValueContext);
  const { valueRegex, setValueRegex } = useContext(ValueRegexContext);

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex, newValue];

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
      sendListRequest(message, valueRegex, setVariableGroups, projectName === "All");
      setOnUpdate(true);
    }
  };

  return (
      <div className="form">
      <VariableGroupBaseForm/>

        <input
          type="text"
          id="variable_key"
          name="variable_key"
          placeholder={"Key of existing variable"}
          value={keyRegex}
          onChange={(event) => setKeyRegex(event.target.value)}
        />

        <input
          type="text"
          id="new_value"
          name="new_value"
          placeholder={"Variable's new value"}
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
        />

        <input
          type="text"
          id="value_regex"
          name="value_regex"
          placeholder={"Value (regex) of variable [OPTIONAL]"}
          value={valueRegex}
          onChange={(event) => setValueRegex(event.target.value)}
        />

        <button id="submit_button" onClick={() => send()}>
          Send request
        </button>
      </div>
  );
};

export default VariableGroupUpdateForm;
