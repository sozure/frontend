import React, { useContext, useEffect, useState } from "react";
import MatUIButton from "../../../MatUIButton";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import { Input } from "@mui/material";
import {
  LoadingContext,
  OrganizationContext,
  PATContext,
  PaginationCounterContext,
  ProjectNameContext,
  RepositoriesContext,
  SelectedRepositoriesContext,
} from "../../../../contexts/Contexts";
import { v4 } from "uuid";
import { getRepositories } from "../../../../services/GitRepositoryService";
import CreatePRsTable from "../../Results/PR/CreatePRsTable";
import MatUiSelect from "../../../MatUiSelect";
import { createPullRequests } from "../../../../services/GitPullRequestService";
import { ToastContainer } from "react-toastify";
import {
  getToastOnClose,
  toastErrorPopUp,
} from "../../../../services/CommonService";

const CreatePRsForm = () => {
  const availableBranches = ["main/master", "develop"];

  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { repositories, setRepositories } = useContext(RepositoriesContext);
  const { selectedRepositories } = useContext(SelectedRepositoriesContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const [chosenRepositoryIds, setChosenRepositoryIds] = useState([]);
  const [chosenRepositoryNames, setChosenRepositoryNames] = useState([]);
  const [sourceBranch, setSourceBranch] = useState("");
  const [targetBranch, setTargetBranch] = useState("");
  const [title, setTitle] = useState("");

  const toastMs = getToastOnClose();

  useEffect(() => {
    if (sourceBranch !== "" && targetBranch !== "") {
      setTitle(`${sourceBranch} to ${targetBranch}`);
    }
  }, [sourceBranch, targetBranch]);

  useEffect(() => {
    let ids = [];
    let names = [];
    selectedRepositories.forEach((element) => {
      if (element.selected) {
        ids.push(element.repositoryId);
        names.push(element.repositoryName);
      }
    });
    setChosenRepositoryIds(ids);
    setChosenRepositoryNames(names);
  }, [selectedRepositories, setChosenRepositoryIds]);

  const customSetProject = (value) => {
    setProjectName(value);
    setRepositories([]);
  };

  const sendGetRepositories = async () => {
    setPaginationCounter(0);
    setLoading(true);
    await getRepositories(
      organizationName,
      projectName,
      pat,
      setLoading,
      setRepositories
    );
  };

  const setCustomSourceBranch = (value) => {
    setSourceBranch(value);
    setTargetBranch("");
    setTitle("");
  }

  const sendPullRequestCreations = async () => {
    if (sourceBranch !== "" && targetBranch !== "" && title !== "") {
      let basicData = {
        organization: organizationName,
        pat: pat,
        project: projectName,
      };
      await createPullRequests(
        basicData,
        chosenRepositoryIds,
        sourceBranch,
        targetBranch,
        title,
        setLoading
      );
      setRepositories([]);
    } else {
      toastErrorPopUp("Fill every field!", "pr_creation", toastMs);
    }
  };

  const topStyles = {
    display: "flex",
    flexDirection: "row", // Align children horizontally
    justifyContent: "space-between", // Distribute space evenly
  };

  return (
    <>
      <div className="form">
        <ProjectSelectMenu
          allOption={true}
          projectName={projectName}
          setProjectName={customSetProject}
        />
        <MatUIButton
          id={"request_repositories"}
          send={sendGetRepositories}
          displayName={"Get repositories"}
        />
      </div>
      <div style={topStyles}>
        {!loading && repositories.length > 0 && (
          <CreatePRsTable repositories={repositories} />
        )}
        {!loading &&
          repositories.length > 0 &&
          chosenRepositoryNames.length > 0 &&
          projectName !== "" && (
            <div className="form">
              <h2>
                {chosenRepositoryNames.length > 0 &&
                  `${chosenRepositoryNames.length} repo selected:`}
              </h2>
              {chosenRepositoryNames.map((repo) => {
                return <p key={v4()}>{repo}</p>;
              })}
            </div>
          )}
        {!loading &&
          repositories.length > 0 &&
          chosenRepositoryNames.length > 0 &&
          projectName !== "" && (
            <div className="form">
              <br />
              <div style={topStyles}>
                <MatUiSelect
                  collection={availableBranches}
                  inputLabel={"Select source branch"}
                  id={`source-branch-${v4()}`}
                  selectValue={sourceBranch}
                  setSelectValue={setCustomSourceBranch}
                  allOption={false}
                />
                <MatUiSelect
                  collection={availableBranches.filter(
                    (branch) => branch !== sourceBranch
                  )}
                  inputLabel={"Select target branch"}
                  id={`target-branch-${v4()}`}
                  selectValue={targetBranch}
                  setSelectValue={setTargetBranch}
                  allOption={false}
                />
              </div>
              <br />
              <div style={topStyles}>
                <Input
                  fullWidth
                  type="text"
                  id="pr_title"
                  name="pr_title"
                  placeholder="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <MatUIButton
                  id={"create_pull_requests"}
                  send={sendPullRequestCreations}
                  displayName={"Create pull requests"}
                  disabled={
                    title === "" || sourceBranch === "" || targetBranch === ""
                  }
                />
              </div>
            </div>
          )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePRsForm;
