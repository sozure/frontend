import React, { useContext, useEffect } from "react";
import { sendListVariablesRequest } from "../../../../services/VariableGroupServices/VariableGroupService";

import { Input } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PATContext,
  ProjectNameContext,
  VGNameRegexContext,
  OrganizationContext,
  MessageContext,
  VariableKeyRegexContext,
  OnDeleteContext,
  LoadingContext,
  VariablesContext,
  PaginationCounterContext,
  SingleOperationContext,
  SingleModificationContext,
  VariableKeyIsRegexContext,
  ProfileNameContext,
  VGChangeExceptionsContext,
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";
import {
  checkRequiredInputs,
  getToastOnClose,
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";
import MatUIButton from "../../../MatUIButton";

const VariableGroupDeleteForm = () => {
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setLoading } = useContext(LoadingContext);
  const { setVariables } = useContext(VariablesContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGNameRegexContext);
  const { organizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(VariableKeyRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { setKeyIsRegex } = useContext(VariableKeyIsRegexContext);
  const { profileName } = useContext(ProfileNameContext);
  const { setVgChangeExceptions } = useContext(VGChangeExceptionsContext);

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex];
  const toastMs = getToastOnClose();

  useEffect(() => {
    let keyIsRegexHelper = false;
    setKeyIsRegex(keyIsRegexHelper);
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      userName: profileName,
      organizationName: organizationName,
      keyRegex: keyRegex,
      setLoading: setLoading,
      setVariables: setVariables,
      secretIncluded: false,
      keyIsRegex: keyIsRegexHelper,
    });
  }, [
    projectName,
    pat,
    vgRegex,
    keyRegex,
    organizationName,
    setLoading,
    setVariables,
    setKeyIsRegex,
    setMessage,
    profileName
  ]);

  const send = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "deleteform", toastMs);
    if (!incorrectFill) {
      await sendListVariablesRequest(message, "", setVariables);
      setPaginationCounter(0);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setVgChangeExceptions([]);
      setOnDelete(true);
      setPaginationCounter(0);
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
      <MatUIButton id={"submit_button"} send={send} displayName={"Send request"}/>
      <ToastContainer />
    </div>
  );
};

export default VariableGroupDeleteForm;
