import React, { useContext } from "react";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import { ProjectNameContext } from "../../../../contexts/Contexts";
import MatUIButton from "../../../MatUIButton";

const BuildPipForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);

  const send = () => {
    alert("Hello!");
  };

  return (
    <div className="form">
      <ProjectSelectMenu
        allOption={false}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <MatUIButton id={"request_build_pipelines"} send={send} displayName={"Get build pipelines"}/>
    </div>
  );
};

export default BuildPipForm;
