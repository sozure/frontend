import React, { useContext, useEffect } from "react";
import { sendListRequest } from "../../../../services/VariableGroupService";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  LoadingContext,
  VariableGroupsContext,
  OnAddContext,
  NewKeyContext,
  NewValueContext,
  PaginationCounterContext,
  SingleOperationContext,
  SingleModificationContext,
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";
import {
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

const VariableGroupAddForm = () => {
  const { setOnAdd } = useContext(OnAddContext);
  const { setLoading } = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { organizationName } = useContext(OrganizationContext);
  const { message, setMessage } = useContext(MessageContext);
  const { newKey, setNewKey } = useContext(NewKeyContext);
  const { newValue, setNewValue } = useContext(NewValueContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);

  const mandatoryFields = [pat, projectName, vgRegex, newKey, newValue];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      keyRegex: ".*",
      organizationName: organizationName,
      setLoading: setLoading,
      setVariableGroups: setVariableGroups,
      secretIncluded: false,
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
      sendListRequest(message, "", setVariableGroups);
      setPaginationCounter(0);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setOnAdd(true);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <VariableGroupBaseForm />

      <input
        type="text"
        id="new_key"
        name="new_key"
        placeholder={"New variable's key"}
        value={newKey}
        onChange={(event) => setNewKey(event.target.value)}
      />

      <input
        type="text"
        id="new_value"
        name="new_value"
        placeholder={"New variable's value"}
        value={newValue}
        onChange={(event) => setNewValue(event.target.value)}
      />

      <button id="submit_button" onClick={() => send()}>
        Send request
      </button>
    </div>
  );
};

export default VariableGroupAddForm;
