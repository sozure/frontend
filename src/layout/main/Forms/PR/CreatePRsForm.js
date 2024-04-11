import React, { useContext, useEffect, useState } from "react";
import MatUIButton from "../../../MatUIButton";
import ProjectSelectMenu from "../../../ProjectSelectMenu";
import { Input } from "@mui/material";
import {
  LoadingContext,
  OrganizationContext,
  PATContext,
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

const CreatePRsForm = () => {
  const availableBranches = ["main/master", "develop"];

  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const { repositories, setRepositories } = useContext(RepositoriesContext);
  const { selectedRepositories } = useContext(SelectedRepositoriesContext);

  const [chosenRepositories, setChosenRepositories] = useState([]);
  const [sourceBranch, setSourceBranch] = useState("");
  const [targetBranch, setTargetBranch] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (sourceBranch !== "" && targetBranch !== "") {
      setTitle(`${sourceBranch} to ${targetBranch}`);
    }
  }, [sourceBranch, targetBranch]);

  useEffect(() => {
    let result = [];
    selectedRepositories.forEach((element) => {
      if (element.selected) {
        result.push(element.repositoryId);
      }
    });
    setChosenRepositories(result);
  }, [selectedRepositories, setChosenRepositories]);

  const customSetProject = (value) => {
    setProjectName(value);
    setRepositories([]);
  };

  const sendGetRepositories = async () => {
    setLoading(true);
    await getRepositories(
      organizationName,
      projectName,
      pat,
      setLoading,
      setRepositories
    );
  };

  const sendPullRequestCreations = async () => {
    let basicData = {
      organization: organizationName,
      pat: pat,
      project: projectName,
    };
    await createPullRequests(
      basicData,
      chosenRepositories,
      sourceBranch,
      targetBranch,
      title,
      setLoading
    );
    setRepositories([]);
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
          selectedRepositories.filter((repo) => repo.selected).length > 0 &&
          projectName !== "" && (
            <div className="form">
              <h2>
                {selectedRepositories.filter((repo) => repo.selected).length >
                  0 &&
                  `${
                    selectedRepositories.filter((repo) => repo.selected).length
                  } repo selected`}
              </h2>
              <br />
              <div style={topStyles}>
                <MatUiSelect
                  collection={availableBranches}
                  inputLabel={"Select source branch"}
                  id={`source-branch-${v4()}`}
                  selectValue={sourceBranch}
                  setSelectValue={setSourceBranch}
                  allOption={false}
                />
                {sourceBranch !== "" && (
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
                )}
              </div>
              <br />
              {sourceBranch !== "" && targetBranch !== "" && (
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
                  {sourceBranch !== "" &&
                    targetBranch !== "" &&
                    title !== "" && (
                      <MatUIButton
                        id={"create_pull_requests"}
                        send={sendPullRequestCreations}
                        displayName={"Create pull requests"}
                      />
                    )}
                </div>
              )}
            </div>
          )}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePRsForm;
