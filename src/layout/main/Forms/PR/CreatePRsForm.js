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
import { getRepositories, createPullRequests } from "../../../../services/GitRepositoryService";
import CreatePRsTable from "../../Results/PR/CreatePRsTable";
import MatUiSelect from "../../../MatUiSelect";

const CreatePRsForm = () => {
  const availableBranches = ["main/master", "develop"];

  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setLoading } = useContext(LoadingContext);
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
  };

  return (
    <>
      <div className="form">
        <ProjectSelectMenu
          allOption={false}
          projectName={projectName}
          setProjectName={customSetProject}
        />
        <MatUIButton
          id={"request_repositories"}
          send={sendGetRepositories}
          displayName={"Get repositories"}
        />
      </div>
      {repositories.length > 0 && (
        <CreatePRsTable repositories={repositories} />
      )}
      {repositories.length > 0 &&
        selectedRepositories.filter((repo) => repo.selected).length > 0 &&
        projectName !== "" && (
          <div className="form">
            <MatUiSelect
              collection={availableBranches}
              inputLabel={"Select source branch"}
              id={`source-branch-${v4()}`}
              selectValue={sourceBranch}
              setSelectValue={setSourceBranch}
              allOption={false}
            />
            {sourceBranch !== "" && (
              <>
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
                {targetBranch !== "" && (
                  <>
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
                    />
                  </>
                )}
              </>
            )}
          </div>
        )}
    </>
  );
};

export default CreatePRsForm;
