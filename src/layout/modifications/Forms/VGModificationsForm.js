import React from "react";
import CommonFormElements from "./CommonFormElements";
import PropTypes from "prop-types";
import ProjectSelectMenu from "../../ProjectSelectMenu";

export const VGModificationsForm = ({
    setProjectName,
    projectName,
    setUserName,
    userName,
    setSelectedLimit,
    selectedLimit,
    setFrom,
    from,
    setTo,
    to
  }) => {
  return (
    <>
      <ProjectSelectMenu allOption={true} projectName={projectName} setProjectName={setProjectName}/>
      <CommonFormElements
        setUserName={setUserName}
        userName={userName}
        setSelectedLimit={setSelectedLimit}
        selectedLimit={selectedLimit}
        setFrom={setFrom}
        from={from}
        setTo={setTo}
        to={to}
      />
    </>
  );
};

VGModificationsForm.propTypes = {
  setProjectName : PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  setUserName: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  setSelectedLimit: PropTypes.func.isRequired,
  selectedLimit: PropTypes.number.isRequired,
  setFrom: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  setTo: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired
}

