import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
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
import { v4 } from "uuid";
import { getBranches } from "../../../../services/GitBranchService";
import ProjectSelectMenu from "../../../ProjectSelectMenu";

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
  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState("");
  const [delimiter, setDelimiter] = useState("");
  const [exceptions, setExceptions] = useState("");
  const [filePath, setFilePath] = useState("");
  const [branches, setBranches] = useState([]);
  const [actualBranch, setActualBranch] = useState([]);

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
    let gitRepositoryId = getRepositoryId(repositories, repository);
    let body = {
      organization: organizationName,
      project: projectName,
      pat: pat,
      branch: actualBranch,
      gitRepositoryId: gitRepositoryId,
      filePath: filePath,
      delimiter: delimiter,
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
          <FormControl fullWidth>
            <InputLabel>Select repository</InputLabel>
            <Select
              id="repositories"
              value={repository}
              label="Select repository"
              onChange={(event) => setRepository(event.target.value)}
            >
              {repositories.map((repo) => {
                let selectedRepoName = repo.repositoryName;
                return (
                  <MenuItem value={selectedRepoName} key={v4()}>
                    {selectedRepoName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>{" "}
          <FormControl fullWidth>
            <InputLabel>Select branch</InputLabel>
            <Select
              id="branches"
              value={actualBranch}
              label="Select branch"
              onChange={(event) => setActualBranch(event.target.value)}
            >
              {branches.map((branch) => {
                return (
                  <MenuItem value={branch} key={v4()}>
                    {branch}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
            id="delimiter"
            name="delimiter"
            placeholder="Variable's delimiter"
            value={delimiter}
            onChange={(event) => setDelimiter(event.target.value)}
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
