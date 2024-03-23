import React, { useContext, useEffect } from "react";
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
  SubscriptionsContext,
} from "../../../../contexts/Contexts";
import { Button } from "@mui/material";
import {
  checkRequiredInputs,
  getToastOnClose,
} from "../../../../services/CommonService";
import { getProfile } from "../../../../services/ProfileService";
import { CommonAuthorizeFormElements } from "./CommonAuthorizeFormElements";

const VGAuthorizeForm = () => {
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { projects, setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { vgAuthorized, setVgAuthorized } = useContext(VGAuthorizedContext);
  const { setLoading } = useContext(LoadingContext);
  const { profileName, setProfileName } = useContext(ProfileNameContext);
  const { setSubscriptions } = useContext(SubscriptionsContext);

  const mandatoryFields = [pat, organizationName];
  const toastMs = getToastOnClose();

  const auth = async () => {
    let incorrectFill = checkRequiredInputs(
      mandatoryFields,
      "custom-auth",
      toastMs
    );
    if (!incorrectFill) {
      setLoading(true);
      await getProjects(
        organizationName,
        pat,
        setProjects,
        setProjectName,
        setSubscriptions,
        setLoading
      );
      await getProfile(organizationName, pat, setProfileName, setLoading);
    }
  };

  useEffect(() => {
    if(!vgAuthorized && projects.length > 0 && profileName !== ""){
      setVgAuthorized(true);
      setLoading(false);
    }
  }, [vgAuthorized, projects, profileName, setVgAuthorized, setLoading]);

  return (
    <div className="form">
      <CommonAuthorizeFormElements />
      <Button variant="contained" id="project_button" onClick={auth}>
        Sign in
      </Button>
      <ToastContainer />
    </div>
  );
};

export default VGAuthorizeForm;
