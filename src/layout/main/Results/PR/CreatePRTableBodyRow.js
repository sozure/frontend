import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import MatUIButton from "../../../MatUIButton";
import { getBranches } from "../../../../services/GitVersionService";
import {
  LoadingContext,
  OrganizationContext,
  PATContext
} from "../../../../contexts/Contexts";
import SearchableSelectMenu from "../../../SearchableSelectMenu";
import { createPullRequest } from "../../../../services/GitPullRequestService";
import CreatePRTableBodyRowInput from "./CreatePRTableBodyRowInput";
import MatUICheckbox from "../../../MatUICheckbox";

const CreatePRTableBodyRow = ({ repository }) => {
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setLoading } = useContext(LoadingContext);

  const [createPR, setCreatePR] = useState(false);
  const [autoComplete, setAutoComplete] = useState(false);
  const [branches, setBranches] = useState([]);
  const [sourceBranch, setSourceBranch] = useState("");
  const [targetBranch, setTargetBranch] = useState("");

  const containsBranchText = (element, searchText) =>
    element.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const sendGetBranches = () => {
    setCreatePR(true);
    getBranches(
      organizationName,
      repository.repositoryId,
      pat,
      setLoading,
      setBranches
    );
  };

  const sendCreatePR = async () => {
    let title = document.getElementById(
      `${repository.repositoryId}_title`
    ).value;
    let basicData = {
      organization: organizationName,
      pat: pat,
      project: repository.projectName,
    };
    await createPullRequest(
      basicData,
      repository.repositoryId,
      sourceBranch,
      targetBranch,
      title,
      autoComplete
    );
    setCreatePR(false);
    setSourceBranch("");
    setTargetBranch("");
  };

  const setCustomSourceBranch = (branch) => {
    setTargetBranch("");
    setSourceBranch(branch);
  };

  return (
    <tr key={v4()}>
      <td key={v4()}>
        {repository.projectName.length > 11
          ? `${repository.projectName.slice(0, 11)}...`
          : repository.projectName}
      </td>
      <td key={v4()}>{repository.repositoryName}</td>
      <td key={v4()}>
        {!createPR && (
          <MatUIButton
            id={"get_branches"}
            send={sendGetBranches}
            displayName={"Create PR"}
          />
        )}
        {createPR && branches.length > 1 && (
          <SearchableSelectMenu
            containsText={containsBranchText}
            elementKey={"source_branch"}
            elements={branches}
            inputLabel={"Select source branch"}
            selectedElement={sourceBranch}
            setSelectedElement={setCustomSourceBranch}
          />
        )}
        {createPR && branches.length === 1 && (
          <>Only one branch exists. Can't create PR.</>
        )}
        {createPR && branches.length === 0 && <>-</>}
      </td>
      <td key={v4()}>
        {createPR && sourceBranch !== "" ? (
          <SearchableSelectMenu
            containsText={containsBranchText}
            elementKey={"target_branch"}
            elements={branches.filter((branch) => branch !== sourceBranch)}
            inputLabel={"Select target branch"}
            selectedElement={targetBranch}
            setSelectedElement={setTargetBranch}
          />
        ) : (
          <>-</>
        )}
      </td>
      <td key={v4()}>
        {createPR && targetBranch !== "" ? (
          <CreatePRTableBodyRowInput
            repositoryId={repository.repositoryId}
            sourceBranch={sourceBranch}
            targetBranch={targetBranch}
          />
        ) : (
          <>-</>
        )}
      </td>
      <td key={v4()}>
        {createPR && targetBranch !== "" ? (
          <MatUICheckbox
            id={"autocomplete"}
            name={"autocomplete"}
            value={autoComplete}
            setValue={setAutoComplete}
          />
        ) : (
          <>-</>
        )}
      </td>
      <td key={v4()}>
        {createPR && targetBranch !== "" ? (
          <MatUIButton
            id={"create_pr"}
            send={sendCreatePR}
            displayName={"Send"}
            disabled={sourceBranch === "" || targetBranch === ""}
          />
        ) : (
          <>-</>
        )}
      </td>
    </tr>
  );
};

CreatePRTableBodyRow.propTypes = {
  repository: PropTypes.object.isRequired,
};

export default CreatePRTableBodyRow;
