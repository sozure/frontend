import { Box, Button, Input } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
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
import { getBranches } from "../../../../services/GitBranchService";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import SearchableSelectMenu from "../../../SearchableSelectMenu";
import SyncTableForm from "../../Results/Sync/SyncTableForm";
import { ToastContainer } from "react-toastify";
import { getProjectsWithReleasePipeline } from "../../../../services/ReleasePipelineService";

const getRepositoryId = (repositories, repository) => {
  let gitRepositoryId = "";
  repositories.forEach((repo) => {
    if (repo.repositoryName === repository) {
      gitRepositoryId = repo.repositoryId;
    }
  });
  return gitRepositoryId;
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

  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState("");
  const [filePath, setFilePath] = useState("");
  const [branches, setBranches] = useState([]);
  const [projectsWithPipeline, setProjectsWithPipeline] = useState([]);
  const [actualBranch, setActualBranch] = useState("");
  const [localLoading, setLocalLoading] = useState(false);

  const [separator, setSeparator] = useState(process.env.REACT_APP_SEPARATOR);
  const [exceptions, setExceptions] = useState(
    process.env.REACT_APP_CONFIG_EXCEPTION
  );
  
  const containsRepoText = (element, searchText) =>
    element.repositoryName.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const containsBranchText = (element, searchText) =>
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
      let gitRepositoryId = getRepositoryId(repositories, repository);
      getBranches(
        organizationName,
        gitRepositoryId,
        pat,
        setLoading,
        setBranches
      );
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
    filePath,
    separator,
    exceptions,
  ]);

  const customSetRepository = (value) => {
    setRepository(value);
    setActualBranch("");
    setFilePath("");
  };

  const customSetProject = (value) => {
    setProjectName(value);
    setRepository("");
    setFilePath("");
  };

  const customSetActualBranch = (value) => {
    setActualBranch(value);
    setFilePath("");
    
  };

  const send = async () => {
    setPaginationCounter(0);
    await setContainingVGs([]);
    await setEnvironments([]);
    await setPipelineConnectedVGs([]);
    setContainingVGsProject("");
    let gitRepositoryId = getRepositoryId(repositories, repository);
    let body = {
      organization: organizationName,
      project: projectName,
      pat: pat,
      branch: actualBranch,
      gitRepositoryId: gitRepositoryId,
      filePath: filePath,
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
      setProjectsWithPipeline,
      setLocalLoading
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
                <Input
                  fullWidth
                  type="text"
                  id="filePath"
                  name="filePath"
                  placeholder="Path of configuration file"
                  value={filePath}
                  onChange={(event) => setFilePath(event.target.value)}
                />
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
                filePath !== "" ? (
                  <Box>
                    <Button
                      id="submit_button"
                      onClick={send}
                      variant="contained"
                    >
                      Get variables from config
                    </Button>
                  </Box>
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
      <br />
      {localLoading ? (
        <p>Loading azure projects with relevant release pipelines...</p>
      ) : repository !== "" &&
        actualBranch !== "" &&
        projectName !== "" &&
        separator !== "" &&
        exceptions !== "" &&
        filePath !== "" &&
        syncVariables !== null &&
        syncVariables !== undefined &&
        syncVariables.length !== 0 &&
        projectsWithPipeline.length !== 0 ? (
        <SyncTableForm
          repository={repository}
          projectsWithReleasePipeline={projectsWithPipeline}
        />
      ) : (
        <></>
      )}
      <ToastContainer />
    </>
  );
};

export default SyncForm;
