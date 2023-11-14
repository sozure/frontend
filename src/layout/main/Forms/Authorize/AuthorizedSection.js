import React, { useContext } from "react";
import { Button } from "@mui/material";
import {
  OrganizationContext,
  ProfileNameContext,
  VGAuthorizedContext,
  VariableGroupsContext,
  VariablesContext,
} from "../../../../contexts/Contexts";

const AuthorizedSection = () => {
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { profileName } = useContext(ProfileNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { setVariables } = useContext(VariablesContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);

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
    </div>
  );
};

export default AuthorizedSection;
