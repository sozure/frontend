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
  SubscriptionsContext,
} from "../../../../contexts/Contexts";
import { Button } from "@mui/material";
import { checkRequiredInputs } from "../../../../services/CommonService";
import { getProfile } from "../../../../services/ProfileService";
import { CommonAuthorizeFormElements } from "./CommonAuthorizeFormElements";

const VGAuthorizeForm = () => {
  const { pat } = useContext(PATContext);
  const { organizationName } = useContext(OrganizationContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { setLoading } = useContext(LoadingContext);
  const { setProfileName } = useContext(ProfileNameContext);
  const { setSubscriptions } = useContext(SubscriptionsContext);

  const mandatoryFields = [pat, organizationName];

  const auth = async () => {
    let incorrectFill = checkRequiredInputs(
      mandatoryFields,
      "custom-auth",
      1500
    );
    if (!incorrectFill) {
      let statuses = [];
      setLoading(true);
      await getProjects(
        organizationName,
        pat,
        setProjects,
        setProjectName,
        setSubscriptions,
        statuses
      );
      await getProfile(organizationName, pat, setProfileName, statuses);
      let counter = 0;
      statuses.forEach((status) => {
        if (status === 1) {
          counter++;
        }
      });
      setVgAuthorized(statuses.length === counter);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="form">
      <CommonAuthorizeFormElements />
      <Button variant="contained" id="project_button" onClick={auth}>
        Authorize
      </Button>
      <ToastContainer />
    </div>
  );
};

export default VGAuthorizeForm;
