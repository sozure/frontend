import React, { useContext } from "react";
import { getProjects } from "../../../../services/ProjectService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  PATContext,
  OrganizationContext,
  ProjectsContext,
  VGAuthorizedContext,
  ProjectNameContext,
  LoadingContext,
} from "../../../../contexts/Contexts";
import { Button, Input } from "@mui/material";

const AuthorizeForm = () => {
  const { pat, setPat } = useContext(PATContext);
  const { organizationName, setOrganizationName } =
    useContext(OrganizationContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { setLoading } = useContext(LoadingContext);

  const mandatoryFields = [pat, organizationName];

  const auth = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        toast.error("Fill every field!", {
          position: toast.POSITION.TOP_CENTER,
          toastId: "custom-auth",
          autoClose: 1500
        });
        incorrectFill = true;
      }
    });
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
    }
  };

  const handleAuthInputs = (e, callback) => {
    callback(e.target.value);
    setVgAuthorized(false);
  }

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
