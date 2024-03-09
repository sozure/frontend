import React from "react";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import MatUIButton from "../../../MatUIButton";
import PropTypes from "prop-types";

const TagBaseForm = ({ projectName, setProjectName, send }) => {
  return (
    <div className="form">
      <ProjectSelectMenu
        allOption={false}
        projectName={projectName}
        setProjectName={setProjectName}
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
