import React, { useContext } from "react";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import {
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  ProjectNameContext,
  RepositoriesContext,
} from "../../../../contexts/Contexts";
import MatUIButton from "../../../MatUIButton";
import { getRepositories } from "../../../../services/GitRepositoryService";

const CreatePRForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { setRepositories } = useContext(RepositoriesContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setLoading } = useContext(LoadingContext);

  const sendGetRepositories = async () => {
    setLoading(true);
    setPaginationCounter(0);
    await getRepositories(
      organizationName,
      projectName,
      pat,
      setLoading,
      setRepositories
    );
  };

  return (
    <div className="form">
      <ProjectSelectMenu
        allOption={true}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      <MatUIButton
        id={"request_repositories"}
        send={sendGetRepositories}
        displayName={"Get repositories"}
      />
    </div>
  );
};

export default CreatePRForm;
