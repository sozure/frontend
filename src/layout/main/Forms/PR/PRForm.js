import React, { useContext } from 'react'
import { LoadingContext, OrganizationContext, PATContext, ProjectNameContext, PullRequestsContext } from '../../../../contexts/Contexts';
import ProjectSelectMenu from '../../../ProjectSelectMenu';
import MatUIButton from '../../../MatUIButton';
import { getPullRequests } from '../../../../services/GitPullRequestService';

const PRForm = () => {
    const { projectName, setProjectName } = useContext(ProjectNameContext);
    const { organizationName } = useContext(OrganizationContext);
    const { pat } = useContext(PATContext);
    const { setLoading } = useContext(LoadingContext);
    const { setPullRequests } = useContext(PullRequestsContext);

    const customSetProject = (value) => {
        setProjectName(value);
    };

    const send = async () => {
      setLoading(true);
      let projectToBeAdded = projectName === "All" ? null : projectName;
      await getPullRequests(organizationName, projectToBeAdded, pat, setLoading, setPullRequests);
    };

  return (
    <div className="form">
        <ProjectSelectMenu
          allOption={true}
          projectName={projectName}
          setProjectName={customSetProject}
        />
        <MatUIButton
        id={"request_pull_requests"}
        send={send}
        displayName={"Get pull requests"}
      />
    </div>
  )
}

export default PRForm