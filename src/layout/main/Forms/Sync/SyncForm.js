import {
  Box,
  Button,
  Input,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  ContainingVGsContext,
  ContainingVGsProjectContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  ProjectNameContext,
  VariablesSyncContext,
} from "../../../../contexts/Contexts";
import {
  getRepositories,
  getVariables,
} from "../../../../services/GitRepositoryService";
import { getBranches } from "../../../../services/GitBranchService";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import SearchableSelectMenu from "../../../SearchableSelectMenu";

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
  const { setSyncVariables } = useContext(VariablesSyncContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { setContainingVGs } = useContext(ContainingVGsContext);
  const { setContainingVGsProject } = useContext(ContainingVGsProjectContext);

  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState("");
  const [separator, setSeparator] = useState(process.env.REACT_APP_SEPARATOR);
  const [exceptions, setExceptions] = useState(process.env.REACT_APP_CONFIG_EXCEPTION);
  const [filePath, setFilePath] = useState("");
  const [branches, setBranches] = useState([]);
  const [actualBranch, setActualBranch] = useState([]);

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

  const send = async () => {
    setPaginationCounter(0);
    await setContainingVGs([]);
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
    await getVariables(body, setLoading, setSyncVariables);
  };

  return (
    <div className="form">
      <ProjectSelectMenu
        allOption={false}
        projectName={projectName}
        setProjectName={setProjectName}
      />{" "}
      {repositories.length > 0 ? (
        <>
          <SearchableSelectMenu
            containsText={containsRepoText}
            elementKey={"repositoryName"}
            elements={repositories}
            inputLabel={"Select repository"}
            selectedElement={repository}
            setSelectedElement={setRepository}
          />{" "}
          <SearchableSelectMenu
            containsText={containsBranchText}
            elementKey={"repositoryName"}
            elements={branches}
            inputLabel={"Select branch"}
            selectedElement={actualBranch}
            setSelectedElement={setActualBranch}
          />
          <Input
            fullWidth
            type="text"
            id="filePath"
            name="filePath"
            placeholder="Path of configuration file"
            value={filePath}
            onChange={(event) => setFilePath(event.target.value)}
          />
          <Input
            fullWidth
            type="text"
            id="separator"
            name="separator"
            placeholder="Variable's separator"
            value={separator}
            onChange={(event) => setSeparator(event.target.value)}
          />
          <Input
            fullWidth
            type="text"
            id="exceptions"
            name="exceptions"
            placeholder="Variable's exceptions (comma-separated values)"
            value={exceptions}
            onChange={(event) => setExceptions(event.target.value)}
          />
          <Box>
            <Button id="submit_button" onClick={send} variant="contained">
              Send request
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SyncForm;
