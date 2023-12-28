import React, { useContext } from "react";
import { Button } from "@mui/material";
import {
  KVAuthorizedContext,
  ProfileNameContext,
  SecretsContext,
  VGAuthorizedContext,
  VariableGroupsContext,
  VariablesContext,
} from "../../../../contexts/Contexts";
import { useNavigate } from "react-router-dom";

const AuthorizedSection = () => {
  const navigate = useNavigate();
  const { setVgAuthorized } = useContext(VGAuthorizedContext);
  const { profileName } = useContext(ProfileNameContext);
  const { setVariables } = useContext(VariablesContext);
  const { setSecrets } = useContext(SecretsContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { setKvAuthorized } = useContext(KVAuthorizedContext);

  return (
    <div className="form">
      <p>
        Hi {profileName}! To change Azure organization, click here:{" "}
        <Button
          variant="contained"
          id="project_button_2"
          onClick={() => {
            setVariables([]);
            setVariableGroups([]);
            setVgAuthorized(false);
            setKvAuthorized(false);
            setSecrets([]);
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
