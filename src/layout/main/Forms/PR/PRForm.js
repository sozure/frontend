import React, { useContext, useState } from "react";
import {
  LoadingContext,
  OrganizationContext,
  PATContext,
  ProjectNameContext,
  PullRequestsContext,
} from "../../../../contexts/Contexts";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import MatUIButton from "../../../MatUIButton";
import { getPullRequests } from "../../../../services/GitPullRequestService";
import RefreshIcon from "@mui/icons-material/Refresh";

const PRForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setLoading } = useContext(LoadingContext);
  const { setPullRequests } = useContext(PullRequestsContext);

  const [isRefresh, setIsRefresh] = useState(false);

  const customSetProject = (value) => {
    setProjectName(value);
    setIsRefresh(false);
  };

  const send = async () => {
    setLoading(true);
    let projectToBeAdded = projectName === "All" ? null : projectName;
    let basicData = {
      organization: organizationName,
      pat: pat,
      project: projectToBeAdded,
    };
    await getPullRequests(basicData, setLoading, setPullRequests);
    setIsRefresh(true);
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
        displayName={isRefresh ? <RefreshIcon /> : "Get pull requests"}
      />
    </div>
  );
};

export default PRForm;
