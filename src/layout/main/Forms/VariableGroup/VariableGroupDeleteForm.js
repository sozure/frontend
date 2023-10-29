import React, { useContext, useEffect } from "react";
import { sendListRequest } from "../../../../services/VariableGroupServices/VariableGroupService";

import { Button, Box, Input } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PATContext,
  ProjectNameContext,
  VGRegexContext,
  OrganizationContext,
  MessageContext,
  KeyRegexContext,
  OnDeleteContext,
  LoadingContext,
  VariableGroupsContext,
  PaginationCounterContext,
  SingleOperationContext,
  SingleModificationContext,
  KeyIsRegexContext,
} from "../../../../contexts/Contexts";

import VariableGroupBaseForm from "./VariableGroupBaseForm";
import {
  checkRequiredInputs,
  setOnSingleModificationBack,
  setSingleOperationBack,
} from "../../../../services/CommonService";

const VariableGroupDeleteForm = () => {
  const { setOnDelete } = useContext(OnDeleteContext);
  const { setLoading } = useContext(LoadingContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);
  const { vgRegex } = useContext(VGRegexContext);
  const { organizationName } = useContext(OrganizationContext);
  const { keyRegex, setKeyRegex } = useContext(KeyRegexContext);
  const { message, setMessage } = useContext(MessageContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setSingleOperation } = useContext(SingleOperationContext);
  const { setOnSingleModification } = useContext(SingleModificationContext);
  const { setKeyIsRegex } = useContext(KeyIsRegexContext);

  const mandatoryFields = [pat, projectName, vgRegex, keyRegex];

  useEffect(() => {
    let keyIsRegexHelper = false;
    setKeyIsRegex(keyIsRegexHelper);
    setMessage({
      projectName: projectName,
      pat: pat,
      vgRegex: vgRegex,
      organizationName: organizationName,
      keyRegex: keyRegex,
      setLoading: setLoading,
      setVariableGroups: setVariableGroups,
      secretIncluded: false,
      keyIsRegex: keyIsRegexHelper
    });
  }, [
    projectName,
    pat,
    vgRegex,
    keyRegex,
    organizationName,
    setLoading,
    setVariableGroups,
    setKeyIsRegex,
    setMessage
  ]);

  const send = () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "deleteform");
    if (!incorrectFill) {
      sendListRequest(message, "", setVariableGroups);
      setPaginationCounter(0);
      setSingleOperationBack(setSingleOperation);
      setOnSingleModificationBack(setOnSingleModification);
      setOnDelete(true);
      setPaginationCounter(0);
    }
  };

  return (
    <div className="form">
      <VariableGroupBaseForm />
      <Input fullWidth
        type="text"
        id="variable_key"
        name="variable_key"
        placeholder={"Key of existing variable"}
        value={keyRegex}
        onChange={(event) => setKeyRegex(event.target.value)}
      />
      <br />
      <br />

      <Box>
        <Button id="submit_button" onClick={send} variant="contained">
          Send request
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default VariableGroupDeleteForm;
