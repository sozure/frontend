import React, { useContext } from "react";
import {
  OrganizationContext,
  PATContext,
  VGAuthorizedContext,
  VariableGroupsContext,
  VariablesContext,
} from "../../../../contexts/Contexts";

import { Input } from "@mui/material";

export const CommonAuthorizeFormElements = () => {
  const { setVariables } = useContext(VariablesContext);
  const { setVariableGroups } = useContext(VariableGroupsContext);
  const { organizationName, setOrganizationName } =
    useContext(OrganizationContext);
  const { pat, setPat } = useContext(PATContext);
  const { setVgAuthorized } = useContext(VGAuthorizedContext);

  const handleAuthInputs = (e, callback) => {
    callback(e.target.value);
    setVgAuthorized(false);
    setVariables([]);
    setVariableGroups([]);
  };
  return (
    <>
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
    </>
  );
};
