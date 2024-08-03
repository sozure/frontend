import React, { useContext, useEffect, useState } from "react";
import { sendListVariablesRequest } from "../../../../services/VariableGroupServices/VariableGroupService";
import {
  VariableNewValueContext,
  OnUpdateContext,
  PaginationCounterContext,
  SingleModificationContext,
  SingleOperationContext,
  PATContext,
  ProjectNameContext,
  VGNameRegexContext,
  OrganizationContext,
  MessageContext,
  VariableKeyRegexContext,
  LoadingContext,
  VariablesContext,
  VariableValueRegexContext,
  ProfileNameContext,
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";
import {
  checkRequiredInputs,
  getToastOnClose,
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

import { Input } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MatUIButton from "../../../MatUIButton";
import MatUICheckbox from "../../../MatUICheckbox";

const VariableGroupUpdateForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setVariables } = useContext(VariablesContext);
  const { setOnUpdate } = useContext(OnUpdateContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGNameRegexContext);
  const { organizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(VariableKeyRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  const { newValue, setNewValue } = useContext(VariableNewValueContext);
  const { valueRegex, setValueRegex } = useContext(VariableValueRegexContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { profileName } = useContext(ProfileNameContext);
  const [keyIsRegex, setKeyIsRegex] = useState(false);

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex, newValue];
  const toastMs = getToastOnClose();

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      organizationName: organizationName,
      userName: profileName,
      keyRegex: keyRegex,
      setLoading: setLoading,
      setVariables: setVariables,
      secretIncluded: false,
      keyIsRegex: keyIsRegex,
    });
  }, [
    projectName,
    pat,
    vgRegex,
    keyRegex,
    setLoading,
    setVariables,
    organizationName,
    keyIsRegex,
    setKeyIsRegex,
    setMessage,
    profileName
  ]);

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "updateform", toastMs);
    if (!incorrectFill) {
      await sendListVariablesRequest(message, valueRegex, setVariables);
      setOnUpdate(true);
      setPaginationCounter(0);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
    }
  };

  return (
    <div className="form">
      <VariableGroupBaseForm />

      <Input
        fullWidth
        type="text"
        id="variable_key"
        name="variable_key"
        placeholder={"Key of existing variable"}
        value={keyRegex}
        onChange={(event) => setKeyRegex(event.target.value)}
      />
      <br />
      <br />

      <Input
        fullWidth
        type="text"
        id="new_value"
        name="new_value"
        placeholder={"Variable's new value"}
        value={newValue}
        onChange={(event) => setNewValue(event.target.value)}
      />
      <br />
      <br />

      <Input
        fullWidth
        type="text"
        id="value_regex"
        name="value_regex"
        placeholder={"Value (regex) of variable [OPTIONAL]"}
        value={valueRegex}
        onChange={(event) => setValueRegex(event.target.value)}
      />
      <br />
      <br />
      <MatUICheckbox
          id={"keyIsRegexCheckbox"}
          name={"keyIsRegexCheckbox"}
          label={"Key is regex"}
          setValue={setKeyIsRegex}
        />
      <MatUIButton id={"submit_button"} send={send} displayName={"Send request"}/>
      <ToastContainer />
    </div>
  );
};

export default VariableGroupUpdateForm;
