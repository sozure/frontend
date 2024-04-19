import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";

import { ProjectsContext } from "../contexts/Contexts";
import MatUISelect from "./MatUISelect";

const ProjectSelectMenu = ({ allOption, projectName, setProjectName }) => {
  const { projects } = useContext(ProjectsContext);
  const [projectNames, setProjectNames] = useState([]);

  useEffect(() => {
    const names = projects.map((project) => project.name);
    setProjectNames(names);
  }, [projects, setProjectNames]);

  return (
    <MatUISelect
      collection={projectNames}
      inputLabel={"Select Azure project"}
      id={`project-${v4()}`}
      selectValue={projectName}
      setSelectValue={setProjectName}
      allOption={allOption}
      required={true}
    />
  );
};

ProjectSelectMenu.propTypes = {
  allOption: PropTypes.bool.isRequired,
  projectName: PropTypes.string.isRequired,
  setProjectName: PropTypes.func.isRequired,
};

export default ProjectSelectMenu;
