import React, { useContext } from "react";
import { Button } from "@mui/material";
import {
  ProfileNameContext,
  VGAuthorizedContext,
} from "../../../../contexts/Contexts";

const AuthorizedSection = () => {
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { profileName } = useContext(ProfileNameContext);
  return (
    <div>
      <br></br>
      <p>
        Hi {profileName}! To change Azure organization, click here:{" "}
        <Button
          variant="contained"
          id="project_button_2"
          onClick={() => setVgAuthorized(false)}
        >
          Authorize
        </Button>
      </p>
    </div>
  );
};

export default AuthorizedSection;
