import { v4 } from "uuid";
import React, { useContext, useEffect, useState } from "react";
import {
  ConfigFileExtensionContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  ProjectNameContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import { getRepositories } from "../../../../services/GitRepositoryService";
import { getBranches } from "../../../../services/GitVersionService";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import SyncTableForm from "../../Results/Sync/SyncTableForm";
import { ToastContainer } from "react-toastify";
import SyncFormFields2 from "./SyncFormFields2";
import SyncFormFields1 from "./SyncFormFields1";

const getRepositoryId = (repositories, repository) => {
  let repositoryId = "";
  repositories.forEach((repo) => {
    if (repo.repositoryName === repository) {
      repositoryId = repo.repositoryId;
    }
  });
  return repositoryId;
};

const SyncForm = () => {
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setLoading } = useContext(LoadingContext);
  const { syncVariables, setSyncVariables } = useContext(VariablesSyncContext);
  const { setConfigFileExtension } = useContext(ConfigFileExtensionContext);

  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState("");
  const [branches, setBranches] = useState([]);
  const [projectsWithPipeline, setProjectsWithPipeline] = useState([]);
  const [actualBranch, setActualBranch] = useState("");
  const [pipelineLocalLoading, setPipelineLocalLoading] = useState(false);
  const [configLocalLoading, setConfigLocalLoading] = useState(false);
  const [configFiles, setConfigFiles] = useState([]);
  const [configFile, setConfigFile] = useState("");
  const [configFileName, setConfigFileName] = useState("");

  const [separator, setSeparator] = useState(process.env.REACT_APP_SEPARATOR);
  const [exceptions, setExceptions] = useState(
    process.env.REACT_APP_CONFIG_EXCEPTION
  );

  useEffect(() => {
    if (projectName !== "") {
      setLoading(true);
      getRepositories(
        organizationName,
        projectName,
        pat,
        setLoading,
        setRepositories
      );
    }
  }, [
    organizationName,
    projectName,
    pat,
    setLoading,
    setRepositories,
    setRepository,
  ]);

  useEffect(() => {
    if (repository !== "") {
      let repositoryId = getRepositoryId(repositories, repository);
      getBranches(organizationName, repositoryId, pat, setLoading, setBranches);
    }
  }, [
    repository,
    organizationName,
    pat,
    setLoading,
    setBranches,
    repositories,
  ]);

  useEffect(() => {
    setSyncVariables([]);
  }, [
    setSyncVariables,
    projectName,
    repository,
    actualBranch,
    separator,
    exceptions,
    configFile,
  ]);

  useEffect(() => {
    if (configFile !== "") {
      let configFileElements = configFile.split(".");
      let splittedConfigFile = configFile.split("/");
      let configFileName = splittedConfigFile[splittedConfigFile.length - 1];
      setConfigFileName(configFileName);
      setConfigFileExtension(configFileElements[configFileElements.length - 1]);
    }
  }, [configFile, setConfigFileExtension]);

  const customSetProject = (value) => {
    setProjectName(value);
    setRepository("");
    setConfigFile("");
  };

  const getSyncTableForm = () => {
    if (
      repository !== "" &&
      actualBranch !== "" &&
      projectName !== "" &&
      separator !== "" &&
      exceptions !== "" &&
      configFile !== "" &&
      syncVariables !== null &&
      syncVariables !== undefined &&
      syncVariables.length !== 0 &&
      projectsWithPipeline.length !== 0
    ) {
      return (
        <SyncTableForm
          repository={repository}
          projectsWithReleasePipeline={projectsWithPipeline}
          configFileName={configFileName}
        />
      );
    }
    return <></>;
  };

  return (
    <>
      <div className="form">
        <ProjectSelectMenu
          allOption={false}
          projectName={projectName}
          setProjectName={customSetProject}
        />{" "}
        {repositories.length > 0 && (
          <>
            <SyncFormFields1
              repository={repository}
              setRepository={setRepository}
              actualBranch={actualBranch}
              setActualBranch={setActualBranch}
              branches={branches}
              repositories={repositories}
              setConfigFile={setConfigFile}
              setConfigFiles={setConfigFiles}
              setConfigLocalLoading={setConfigLocalLoading}
              key={v4()}
            />
            <SyncFormFields2
              actualBranch={actualBranch}
              configFile={configFile}
              configFileName={configFileName}
              configFiles={configFiles}
              configLocalLoading={configLocalLoading}
              exceptions={exceptions}
              setExceptions={setExceptions}
              repositories={repositories}
              repository={repository}
              separator={separator}
              setConfigFile={setConfigFile}
              setPipelineLocalLoading={setPipelineLocalLoading}
              setProjectsWithPipeline={setProjectsWithPipeline}
              setSeparator={setSeparator}
              key={v4()}
            />
          </>
        )}
      </div>
      {pipelineLocalLoading ? (
        <div className="form"><p>Loading azure projects with relevant release pipelines...</p></div>
      ) : (
        getSyncTableForm()
      )}
      <ToastContainer />
    </>
  );
};

export default SyncForm;
