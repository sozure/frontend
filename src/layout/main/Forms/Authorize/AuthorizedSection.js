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


  const goToChanges = () => {
    var url = `/changes/${organizationName}`;
    navigate(url);
  }

  return (
    <div>
      <br></br>
      <p>Organization: {organizationName}</p>
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
          Authorize
        </Button>
      </p>
      <p>Want to see previous changes? Click here:{" "}
      <Button
          variant="contained"
          id="changes"
          onClick={goToChanges}
        >
          Previous changes
        </Button>
      </p>
    </div>
  );
};

export default AuthorizedSection;
