import { Input } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  ConfigFileExtensionContext,
  ContainingVGsContext,
  ContainingVGsProjectContext,
  EnvironmentsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  PipelineConnectedVGsContext,
  ProjectNameContext,
  ProjectsContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import {
  getRepositories,
  getVariables,
} from "../../../../services/GitRepositoryService";
import { getBranches } from "../../../../services/GitVersionService";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import SearchableSelectMenu from "../../../SearchableSelectMenu";
import SyncTableForm from "../../Results/Sync/SyncTableForm";
import { ToastContainer } from "react-toastify";
import { getProjectsWithReleasePipeline } from "../../../../services/ReleasePipelineService";
import { getConfigFiles } from "../../../../services/GitFileService";
import MatUIButton from "../../../MatUIButton";

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
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setContainingVGs } = useContext(ContainingVGsContext);
  const { setContainingVGsProject } = useContext(ContainingVGsProjectContext);
  const { setPipelineConnectedVGs } = useContext(PipelineConnectedVGsContext);
  const { projects } = useContext(ProjectsContext);
  const { setEnvironments } = useContext(EnvironmentsContext);
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

  const containsRepoText = (element, searchText) =>
    element.repositoryName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const containsBranchText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const containsConfigFileText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

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

  const customSetRepository = (value) => {
    setRepository(value);
    setActualBranch("");
    setConfigFile("");
  };

  const customSetProject = (value) => {
    setProjectName(value);
    setRepository("");
    setConfigFile("");
  };

  const customSetActualBranch = async (value) => {
    setActualBranch(value);
    setConfigFile("");
    let repositoryId = getRepositoryId(repositories, repository);
    await getConfigFiles(
      organizationName,
      pat,
      repositoryId,
      value,
      setConfigFiles,
      setConfigLocalLoading
    );
  };

  const send = async () => {
    setPaginationCounter(0);
    await setContainingVGs([]);
    await setEnvironments([]);
    await setPipelineConnectedVGs([]);
    setContainingVGsProject("");
    let repositoryId = getRepositoryId(repositories, repository);
    let body = {
      organization: organizationName,
      project: projectName,
      pat: pat,
      branch: actualBranch,
      repositoryId: repositoryId,
      filePath: configFile,
      delimiter: separator,
      exceptions: exceptions.split(","),
    };
    let projectNames = [];
    projects.forEach((element) => {
      projectNames.push(element.name);
    });
    await getProjectsWithReleasePipeline(
      organizationName,
      projectNames,
      pat,
      repository,
      configFileName,
      setProjectsWithPipeline,
      setPipelineLocalLoading
    );
    await getVariables(body, setLoading, setSyncVariables);
  };

  return (
    <>
      <div className="form">
        <ProjectSelectMenu
          allOption={false}
          projectName={projectName}
          setProjectName={customSetProject}
        />{" "}
        {repositories.length > 0 ? (
          <>
            {projectName !== "" ? (
              <SearchableSelectMenu
                containsText={containsRepoText}
                elementKey={"repositoryName"}
                elements={repositories}
                inputLabel={"Select repository"}
                selectedElement={repository}
                setSelectedElement={customSetRepository}
              />
            ) : (
              <></>
            )}{" "}
            {repository !== "" ? (
              <SearchableSelectMenu
                containsText={containsBranchText}
                elements={branches}
                inputLabel={"Select branch"}
                selectedElement={actualBranch}
                setSelectedElement={customSetActualBranch}
              />
            ) : (
              <></>
            )}
            {repository !== "" && actualBranch !== "" && projectName !== "" ? (
              <>
                {configLocalLoading ? (
                  <p>Loading config files...</p>
                ) : (
                  <SearchableSelectMenu
                    containsText={containsConfigFileText}
                    elementKey={"configFile"}
                    elements={configFiles}
                    inputLabel={"Select config file"}
                    selectedElement={configFile}
                    setSelectedElement={setConfigFile}
                  />
                )}

                {separator === "" ? (
                  <Input
                    fullWidth
                    type="text"
                    id="separator"
                    name="separator"
                    placeholder="Variable's separator"
                    value={separator}
                    onChange={(event) => setSeparator(event.target.value)}
                  />
                ) : (
                  <></>
                )}
                {exceptions === "" ? (
                  <Input
                    fullWidth
                    type="text"
                    id="exceptions"
                    name="exceptions"
                    placeholder="Variable's exceptions (comma-separated values)"
                    value={exceptions}
                    onChange={(event) => setExceptions(event.target.value)}
                  />
                ) : (
                  <></>
                )}

                {repository !== "" &&
                actualBranch !== "" &&
                projectName !== "" &&
                separator !== "" &&
                exceptions !== "" &&
                configFile !== "" ? (
                  <MatUIButton
                    id={"get_var_from_config"}
                    send={send}
                    displayName={"Get variables from config"}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      {pipelineLocalLoading ? (
        <p>Loading azure projects with relevant release pipelines...</p>
      ) : repository !== "" &&
        actualBranch !== "" &&
        projectName !== "" &&
        separator !== "" &&
        exceptions !== "" &&
        configFile !== "" &&
        syncVariables !== null &&
        syncVariables !== undefined &&
        syncVariables.length !== 0 &&
        projectsWithPipeline.length !== 0 ? (
        <SyncTableForm
          repository={repository}
          projectsWithReleasePipeline={projectsWithPipeline}
          configFileName={configFileName}
        />
      ) : (
        <></>
      )}
      <ToastContainer />
    </>
  );
};

export default SyncForm;
