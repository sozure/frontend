import React, { useContext } from "react";
import { getProjects } from "../../../../services/ProjectService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PATContext,
  OrganizationContext,
  ProjectsContext,
  VGAuthorizedContext,
  ProjectNameContext,
  LoadingContext,
  ProfileNameContext,
} from "../../../../contexts/Contexts";
import { Button } from "@mui/material";
import { checkRequiredInputs2 } from "../../../../services/CommonService";
import { getProfile } from "../../../../services/ProfileService";
import { CommonAuthorizeFormElements } from "./CommonAuthorizeFormElements";

const VGAuthorizeForm = () => {
  const { pat } = useContext(PATContext);
  const { organizationName } =
    useContext(OrganizationContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { setLoading } = useContext(LoadingContext);
  const { setProfileName } = useContext(ProfileNameContext);

  const mandatoryFields = [pat, organizationName];

  const auth = async () => {
    let incorrectFill = checkRequiredInputs2(
      mandatoryFields,
      "custom-auth",
      1500
    );
    if (!incorrectFill) {
      setLoading(true);
      await getProjects(
        organizationName,
        pat,
        setProjects,
        setVgAuthorized,
        setProjectName,
        setLoading
      );
      setLoading(true);
      await getProfile(
        organizationName,
        pat,
        setProfileName,
        setVgAuthorized,
        setLoading
      );
    }
  };

  return (
    <div className="form">
      <CommonAuthorizeFormElements/>
      <Button variant="contained" id="project_button" onClick={auth}>
        Authorize
      </Button>
      <ToastContainer />
    </div>
  );
};

export default VGAuthorizeForm;
