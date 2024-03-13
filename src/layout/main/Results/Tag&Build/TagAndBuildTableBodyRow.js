import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { createTag, getTags } from "../../../../services/GitVersionService";
import { hasItem, collectLatestTags, sortVersions } from "../../../../services/HelperFunctions/TagHelperFunctions";
import {
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";
import { Cancel, PlayArrow } from "@mui/icons-material";
import TagAndBuildTableBodyRowInput from "./TagAndBuildTableBodyRowInput";

const TagAndBuildTableBodyRow = ({
  repository,
  pipeline,
  latestTags,
  setLatestTags,
}) => {
  const versionTypes = ["major", "minor", "patch"];
  const { projectName } = useContext(ProjectNameContext);
  const { profileName } = useContext(ProfileNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);

  const [typeOfVersion, setTypeOfVersion] = useState("");
  const [possibleNewTag, setPossibleNewTag] = useState("");
  const [latestTag, setLatestTag] = useState("");
  const [runSuccess, setRunSuccess] = useState({});
  const [localLoading, setLocalLoading] = useState(false);
  const [runAlready, setRunAlready] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (runSuccess.id !== undefined) {
      setTimeout(() => {
        setRunSuccess({});
      }, 2500);
    }
  }, [runSuccess, setRunSuccess]);

  useEffect(() => {
    let alreadyHasItem = hasItem(latestTags, repository);
    if (
      !alreadyHasItem.found &&
      !runAlready &&
      tags.length === 0 &&
      pipeline !== undefined
    ) {
      setRunAlready(true);
      getTags(
        organizationName,
        repository.repositoryId,
        pat,
        setLocalLoading,
        setTags
      );
    } else if (alreadyHasItem.found) {
      setLatestTag(alreadyHasItem.element.tag);
    }
  }, [
    tags,
    organizationName,
    repository,
    pat,
    pipeline,
    latestTag,
    runAlready,
    latestTags,
  ]);

  useEffect(() => {
    let alreadyHasItem = hasItem(latestTags, repository);
    if (tags.length > 0 && !alreadyHasItem.found) {
      let tag = getLatestTag(tags);
      setLatestTag(tag);
      let result = collectLatestTags(latestTags, repository, tag);
      setLatestTags(result);
    } else if (alreadyHasItem.found) {
      setLatestTag(alreadyHasItem.element.tag);
    }
  }, [tags, latestTags, setLatestTags, repository]);

  const getBuildRunStatus = () => {
    if (
      pipeline !== undefined &&
      runSuccess.id === pipeline.id &&
      runSuccess.success
    ) {
      return <span>Success</span>;
    }
    return <>-</>;
  };

  const getLatestTag = (tags) => {
    let sortedTags = sortVersions(tags);
    return sortedTags[sortedTags.length - 1].replace("refs/tags/", "");
  };

  const send = () => {
    if (pipeline !== undefined) {
      let repositoryId = repository.repositoryId;
      let description = document.getElementById(`tagDescription_${repositoryId}`).value;
      let model = {
        organization: organizationName,
        project: projectName,
        pat: pat,
        definitionId: pipeline.id,
        repositoryId: repositoryId,
        tagName: typeOfVersion,
        userName: profileName,
        description: description,
        repositoryName: repository.repositoryName
      };
      createTag(
        model,
        latestTags,
        possibleNewTag,
        setRunSuccess,
        setLocalLoading,
        setLatestTags,
        cancel
      );
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
      <td key={v4()}>{latestTag !== "" ? `${latestTag}` : "-"}</td>
      <td key={v4()}>
        {pipeline !== undefined && latestTag !== "" ? (
          <FormControl fullWidth>
            <InputLabel htmlFor="versionType">Set version type</InputLabel>
            <Select
              className="versionType"
              label="Set version type"
              value={typeOfVersion}
              onChange={(event) => setTypeOfVersionCustom(event.target.value)}
            >
              {versionTypes.map((element) => (
                <MenuItem value={element} key={element}>
                  {element}
                </MenuItem>
              ))}
              <MenuItem value={"Choose one"} key={"Choose one"} disabled>
                {"Choose one"}
              </MenuItem>
            </Select>
          </FormControl>
        ) : (
          <>No pipeline or previous tag found.</>
        )}
      </td>
      <td key={v4()}>
        {possibleNewTag !== "" ? <>{possibleNewTag}</> : <>-</>}
      </td>
      <td key={v4()}>
        {possibleNewTag !== "-" && possibleNewTag !== "" ? (
          <TagAndBuildTableBodyRowInput repositoryId={repository.repositoryId} />
        ) : (
          <>-</>
        )}
      </td>
      <td key={v4()}>
        {typeOfVersion !== "" && pipeline !== undefined ? (
          <>
            <abbr title={"Start create and build"}>
              <button onClick={send}>
                <PlayArrow />
              </button>
            </abbr>{" "}
            <abbr title={"Cancel"}>
              <button onClick={cancel}>
                <Cancel />
              </button>
            </abbr>
          </>
        ) : (
          <>-</>
        )}
      </td>
      <td key={v4()}>
        {localLoading ? <span>Loading...</span> : getBuildRunStatus()}
      </td>
    </tr>
  );
};

TagAndBuildTableBodyRow.propTypes = {
  repository: PropTypes.object.isRequired,
  pipeline: PropTypes.object,
  latestTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  setLatestTags: PropTypes.func.isRequired,
};

export default TagAndBuildTableBodyRow;
