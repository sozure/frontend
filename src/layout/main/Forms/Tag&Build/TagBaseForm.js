import React from 'react'
import ProjectSelectMenu from '../../../ProjectSelectMenu'
import MatUIButton from '../../../MatUIButton'

const TagBaseForm = ({projectName, setProjectName, send}) => {
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
  )
}

export default TagBaseForm