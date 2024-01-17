import React, { useContext, useEffect, useState } from "react";
import { sendListVariablesRequest } from "../../../../services/VariableGroupServices/VariableGroupService";
import {
  PaginationCounterContext,
  SingleModificationContext,
  SingleOperationContext,
  VariableValueRegexContext,
  PATContext,
  ProjectNameContext,
  VGNameRegexContext,
  OrganizationContext,
  MessageContext,
  VariableKeyRegexContext,
  VariablesContext,
  LoadingContext,
  VariableKeyIsRegexContext,
  ProfileNameContext,
} from "../../../../contexts/Contexts";
import "../../../../CSS/style.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import VariableGroupBaseForm from "./VariableGroupBaseForm";
import {
  checkRequiredInputs,
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

import {
  Input,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import MatUIButton from "../../../MatUIButton";

const VariableGroupGetForm = () => {
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGNameRegexContext);
  const { setVariables } = useContext(VariablesContext);
  const { setLoading } = useContext(LoadingContext);
  const { organizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(VariableKeyRegexContext);
  const { valueRegex, setValueRegex } = useContext(VariableValueRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  const [secretIncluded, setSecretIncluded] = useState(false);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { keyIsRegex, setKeyIsRegex } = useContext(VariableKeyIsRegexContext);
  const { profileName } = useContext(ProfileNameContext);

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex];

  useEffect(() => {
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      userName: profileName,
      organizationName: organizationName,
      keyRegex: keyRegex,
      valueRegex: valueRegex,
      setLoading: setLoading,
      secretIncluded: secretIncluded,
      keyIsRegex: keyIsRegex,
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
    secretIncluded,
    keyIsRegex,
    profileName
  ]);

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "getform", 1500);
    if (!incorrectFill) {
      await sendListVariablesRequest(message, valueRegex, setVariables);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <VariableGroupBaseForm />

      <Input
        fullWidth
        type="text"
        id="key_regex"
        name="key_regex"
        placeholder={"Key of variable"}
        value={keyRegex}
        onChange={(event) => setKeyRegex(event.target.value)}
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
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => setSecretIncluded(e.target.checked)}
              value={secretIncluded}
              id="secretNeeded"
              name="secretNeeded"
            />
          }
          label="Secret included"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => setKeyIsRegex(e.target.checked)}
              value={keyIsRegex}
              id="keyRegexOrNot"
              name="keyRegexOrNot"
            />
          }
          label="Key's name should be regex"
        ></FormControlLabel>
      </FormGroup>
      <br />
      <MatUIButton id={"submit_button"} send={send} displayName={"Send request"}/>
      <ToastContainer />
    </div>
  );
};

export default VariableGroupGetForm;
