import React, { useContext } from "react";

import {
  ProjectNameContext,
  VGNameRegexContext
} from "../../../../contexts/Contexts";
import {
  Input
} from "@mui/material";
import ProjectSelectMenu from "../../../ProjectSelectMenu";

const VariableGroupBaseForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { vgRegex, setVgRegex } = useContext(VGNameRegexContext);

  return (
    <>
      <ProjectSelectMenu allOption={true} projectName={projectName} setProjectName={setProjectName}/>

      <Input
        fullWidth
        type="text"
        id="variable_group_regex"
        name="variable_group_regex"
        placeholder={"Name (regex) of variable group"}
        value={vgRegex}
        onChange={(event) => setVgRegex(event.target.value)}
      />
      <br />
      <br />
    </>
  );
};

export default VariableGroupBaseForm;
