import React, { useContext } from "react";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import MatUIButton from "../../../MatUIButton";
import PropTypes from "prop-types";
import {
  BuildPipelinesContext,
  PaginationCounterContext,
  RepositoriesContext,
} from "../../../../contexts/Contexts";

const TagBaseForm = ({ projectName, setProjectName, send }) => {
  const { setRepositories } = useContext(RepositoriesContext);
  const { setBuildPipelines } = useContext(BuildPipelinesContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const customSetProjectName = (newValue) => {
    setPaginationCounter(0);
    setRepositories([]);
    setBuildPipelines([]);
    setProjectName(newValue);
  };

  return (
    <div className="form">
      <ProjectSelectMenu
        allOption={false}
        projectName={projectName}
        setProjectName={customSetProjectName}
      />
      <MatUIButton
        id={"request_git_repositories"}
        send={send}
        displayName={"Get repositories"}
      />
    </div>
  );
};

TagBaseForm.propTypes = {
  projectName: PropTypes.string.isRequired,
  setProjectName: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
};

export default TagBaseForm;
