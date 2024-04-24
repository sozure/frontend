import React, { useContext, useEffect } from "react";
import MatUIButton from "../../../MatUIButton";
import SearchableSelectMenu from "../../../SearchableSelectMenu";
import { Input } from "@mui/material";
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
import { getProjectsWithReleasePipeline } from "../../../../services/ReleasePipelineService";
import { getVariables } from "../../../../services/GitRepositoryService";
import PropTypes from "prop-types";

const getRepositoryId = (repositories, repository) => {
  let repositoryId = "";
  repositories.forEach((repo) => {
    if (repo.repositoryName === repository) {
      repositoryId = repo.repositoryId;
    }
  });
  return repositoryId;
};

const SyncFormFields2 = ({
  repository,
  configFile,
  setConfigFile,
  exceptions,
  setExceptions,
  separator,
  setSeparator,
  configFiles,
  actualBranch,
  configLocalLoading,
  configFileName,
  projectsWithPipeline,
  setProjectsWithPipeline,
  setPipelineLocalLoading,
  repositories,
}) => {
  const { projectName } = useContext(ProjectNameContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setLoading } = useContext(LoadingContext);
  const { setSyncVariables } = useContext(VariablesSyncContext);
  const { containingVGs, setContainingVGs } = useContext(ContainingVGsContext);
  const { setContainingVGsProject } = useContext(ContainingVGsProjectContext);
  const { setPipelineConnectedVGs } = useContext(PipelineConnectedVGsContext);
  const { projects } = useContext(ProjectsContext);
  const { setEnvironments } = useContext(EnvironmentsContext);

  useEffect(() => {
    if (containingVGs.length > 0) {
      setLoading(false);
    }
  }, [containingVGs, setLoading]);

  useEffect(() => {
    if (projectsWithPipeline.length > 0) {
      setPipelineLocalLoading(false);
    }
  }, [projectsWithPipeline, setPipelineLocalLoading]);

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

  const setCustomConfigFile = (value) => {
    setProjectsWithPipeline([]);
    setConfigFile(value);
  };

  const containsConfigFileText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  return (
    <>
      {repository !== "" && actualBranch !== "" && projectName !== "" && (
        <>
          {configLocalLoading && <p>Loading config files...</p>}
          {(!configLocalLoading && configFiles.length > 0) && (
            <SearchableSelectMenu
              containsText={containsConfigFileText}
              elementKey={"configFile"}
              elements={configFiles}
              inputLabel={"Select config file"}
              selectedElement={configFile}
              setSelectedElement={setCustomConfigFile}
            />
          )}
          {!configLocalLoading && configFiles.length === 0 && (
            <p>No config file found with specified rules.</p>
          )}

          {separator === "" && (
            <Input
              fullWidth
              type="text"
              id="separator"
              name="separator"
              placeholder="Variable's separator"
              value={separator}
              onChange={(event) => setSeparator(event.target.value)}
            />
          )}
          {exceptions === "" && (
            <Input
              fullWidth
              type="text"
              id="exceptions"
              name="exceptions"
              placeholder="Variable's exceptions (comma-separated values)"
              value={exceptions}
              onChange={(event) => setExceptions(event.target.value)}
            />
          )}

          {repository !== "" &&
            actualBranch !== "" &&
            projectName !== "" &&
            separator !== "" &&
            exceptions !== "" &&
            configFile !== "" && (
              <MatUIButton
                id={"get_var_from_config"}
                send={send}
                displayName={"Get variables from config"}
              />
            )}
        </>
      )}
    </>
  );
};

SyncFormFields2.propTypes = {
  repository: PropTypes.string.isRequired,
  configFile: PropTypes.string.isRequired,
  setConfigFile: PropTypes.func.isRequired,
  exceptions: PropTypes.string.isRequired,
  setExceptions: PropTypes.func.isRequired,
  separator: PropTypes.string.isRequired,
  setSeparator: PropTypes.func.isRequired,
  configFiles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  projectsWithPipeline: PropTypes.arrayOf(PropTypes.string.isRequired)
    .isRequired,
  actualBranch: PropTypes.string.isRequired,
  configLocalLoading: PropTypes.bool.isRequired,
  configFileName: PropTypes.string.isRequired,
  setProjectsWithPipeline: PropTypes.func.isRequired,
  setPipelineLocalLoading: PropTypes.func.isRequired,
  repositories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default SyncFormFields2;
