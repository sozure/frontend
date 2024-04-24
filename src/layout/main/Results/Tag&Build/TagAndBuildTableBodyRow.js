import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { createTag } from "../../../../services/GitVersionService";
import {
  LatestTagsContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";
import TagAndBuildTableBodyRowInput from "./TagAndBuildTableBodyRowInput";
import MatUISelect from "../../../MatUISelect";
import MatUIButton from "../../../MatUIButton";

const TagAndBuildTableBodyRow = ({ repository, pipeline, latestTag }) => {
  const versionTypes = ["major", "minor", "patch"];
  const { projectName } = useContext(ProjectNameContext);
  const { profileName } = useContext(ProfileNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { latestTags, setLatestTags } = useContext(LatestTagsContext);

  const [typeOfVersion, setTypeOfVersion] = useState("");
  const [possibleNewTag, setPossibleNewTag] = useState("");

  const send = () => {
    if (pipeline !== undefined) {
      let repositoryId = repository.repositoryId;
      let description = document.getElementById(
        `tagDescription_${repositoryId}`
      ).value;
      let model = {
        organization: organizationName,
        project: projectName,
        pat: pat,
        definitionId: pipeline.id,
        repositoryId: repositoryId,
        tagName: typeOfVersion,
        userName: profileName,
        description: description,
        repositoryName: repository.repositoryName,
      };
      createTag(
        model,
        latestTags,
        possibleNewTag,
        setLatestTags,
        cancel
      );
      cancel();
    }
  };

  const cancel = () => {
    setPossibleNewTag("-");
    setTypeOfVersion("");
  };

  const setTypeOfVersionCustom = (newTypeOfVersion) => {
    setTypeOfVersion(newTypeOfVersion);
    let newTag;
    let tag = latestTag.split(".");
    let tagHasValue = tag.length > 1;
    switch (newTypeOfVersion) {
      case "major":
        newTag = tagHasValue ? `${Number(tag[0]) + 1}.0.0` : "1.0.0";
        break;
      case "minor":
        newTag = tagHasValue ? `${tag[0]}.${Number(tag[1]) + 1}.0` : "0.1.0";
        break;
      case "patch":
        newTag = tagHasValue
          ? `${tag[0]}.${tag[1]}.${Number(tag[2]) + 1}`
          : "0.0.1";
        break;
      default:
        newTag = "-";
    }
    setPossibleNewTag(newTag);
  };

  return (
    <tr key={v4()}>
      <td key={repository.repositoryId}>{repository.repositoryName}</td>
      <td key={v4()}>{latestTag}</td>
      <td key={v4()}>
        {pipeline !== undefined && latestTag !== "" ? (
          <MatUISelect
            collection={[...versionTypes, "Choose one"]}
            inputLabel={"Set version type"}
            id={"versionType"}
            selectValue={typeOfVersion}
            setSelectValue={setTypeOfVersionCustom}
            allOption={false}
            required={true}
          />
        ) : (
          <>No pipeline or previous tag found.</>
        )}
      </td>
      <td key={v4()}>
        {possibleNewTag !== "" ? <>{possibleNewTag}</> : <>-</>}
      </td>
      <td key={v4()}>
        {possibleNewTag !== "-" && possibleNewTag !== "" ? (
          <TagAndBuildTableBodyRowInput
            repositoryId={repository.repositoryId}
          />
        ) : (
          <>-</>
        )}
      </td>
      <td key={v4()}>
        {typeOfVersion !== "" && pipeline !== undefined ? (
          <MatUIButton
            id={"submit_button"}
            send={send}
            displayName={"Start create and build"}
          />
        ) : (
          <>-</>
        )}
      </td>
    </tr>
  );
};

TagAndBuildTableBodyRow.propTypes = {
  repository: PropTypes.object.isRequired,
  pipeline: PropTypes.object,
  latestTag: PropTypes.string.isRequired,
};

export default TagAndBuildTableBodyRow;
