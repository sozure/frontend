import React, { useContext } from "react";
import { getProjects } from "../../../../services/ProjectService";

import {
  PATContext,
  OrganizationContext,
  ProjectsContext,
  VGAuthorizedContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";

const AuthorizeForm = () => {
  const { pat, setPat } = useContext(PATContext);
  const { organizationName, setOrganizationName } =
    useContext(OrganizationContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { setVgAuthorized } = useContext(VGAuthorizedContext);

  const mandatoryFields = [pat, organizationName];

  const auth = () => {
    let incorrectFill = false;
    mandatoryFields.forEach((element) => {
      if (element === "") {
        alert("Fill every field!");
        incorrectFill = true;
      }
    });
    if (!incorrectFill) {
      getProjects(
        organizationName,
        pat,
        setProjects,
        setVgAuthorized,
        setProjectName
      );
    }
  };

  return (
    <div id="form">
      <input
        type="password"
        id="pat"
        name="pat"
        placeholder="Personal Access Token"
        value={pat}
        onChange={(event) => {
          setPat(event.target.value);
          setVgAuthorized(false);
        }}
      />

      <input
        type="text"
        id="organizationName"
        name="organizationName"
        placeholder="Name of organization"
        value={organizationName}
        onChange={(event) => {
          setOrganizationName(event.target.value);
          setVgAuthorized(false);
        }}
      />

      <button id="project_button" onClick={() => auth()}>
        Authorize
      </button>
    </div>
  );
};

export default AuthorizeForm;
