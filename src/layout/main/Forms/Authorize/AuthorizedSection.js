import React, { useContext } from "react";
import { Button } from "@mui/material";
import {
  OrganizationContext,
  ProfileNameContext,
  VGAuthorizedContext,
  VariableGroupsContext,
  VariablesContext,
} from "../../../../contexts/Contexts";
import { useNavigate } from "react-router-dom";

const AuthorizedSection = () => {
  const navigate = useNavigate();
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { profileName } = useContext(ProfileNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { setVariables } = useContext(VariablesContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);

  return (
    <div className="form">
      <h2>{organizationName}</h2>
      <p>
        Hi {profileName}! To change Azure organization, click here:{" "}
        <Button
          variant="contained"
          id="project_button_2"
          onClick={() => {
            setVariables([]);
            setVariableGroups([]);
            setVgAuthorized(false);
          }}
        >
          Back to authorization
        </Button>{" "}
        <Button
          variant="contained"
          id="changes"
          onClick={() => navigate("/changes")}
        >
          See changes history
        </Button>
      </p>
    </div>
  );
};

export default AuthorizedSection;
