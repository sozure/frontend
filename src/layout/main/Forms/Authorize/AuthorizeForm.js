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
  VariablesContext,
  VariableGroupsContext,
  ProfileNameContext,
} from "../../../../contexts/Contexts";
import { Button, Input } from "@mui/material";
import { checkRequiredInputs2 } from "../../../../services/CommonService";
import { getProfile } from "../../../../services/ProfileService";

const AuthorizeForm = () => {
  const { pat, setPat } = useContext(PATContext);
  const { organizationName, setOrganizationName } =
    useContext(OrganizationContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { setLoading } = useContext(LoadingContext);
  const { setVariables } = useContext(VariablesContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setProfileName } = useContext(ProfileNameContext);

  const mandatoryFields = [pat, organizationName];

  const auth = () => {
    let incorrectFill = checkRequiredInputs2(
      mandatoryFields,
      "custom-auth",
      1500
    );
    if (!incorrectFill) {
      setLoading(true);
      getProjects(
        organizationName,
        pat,
        setProjects,
        setVgAuthorized,
        setProjectName,
        setLoading
      );
      setLoading(true);
      getProfile(
        organizationName,
        pat,
        setProfileName,
        setVgAuthorized,
        setLoading
      );
    }
  };

  const handleAuthInputs = (e, callback) => {
    callback(e.target.value);
    setVgAuthorized(false);
    setVariables([]);
    setVariableGroups([]);
  };

  return (
    <div className="form">
      <Input
        fullWidth
        type="password"
        id="pat"
        name="pat"
        placeholder="Personal Access Token"
        value={pat}
        onChange={(event) => handleAuthInputs(event, setPat)}
      />
      <br />
      <br />

      <Input
        fullWidth
        type="text"
        id="organizationName"
        name="organizationName"
        placeholder="Name of organization"
        value={organizationName}
        onChange={(event) => handleAuthInputs(event, setOrganizationName)}
      />
      <br />
      <br />

      <Button variant="contained" id="project_button" onClick={auth}>
        Authorize
      </Button>
      <ToastContainer />
    </div>
  );
};

export default AuthorizeForm;
