import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import MatUIButton from "../../../MatUIButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  createTag,
  getTags,
} from "../../../../services/GitVersionService";
import {
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";

const TagAndBuildTableBodyRow = ({ repository, pipeline }) => {
  const { projectName } = useContext(ProjectNameContext);
  const { profileName } = useContext(ProfileNameContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);

  const [typeOfVersion, setTypeOfVersion] = useState("");
  const [possibleNewTag, setPossibleNewTag] = useState("");
  const [runSuccess, setRunSuccess] = useState({});
  const [localLoading, setLocalLoading] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (runSuccess.id !== undefined) {
      setTimeout(() => {
        setRunSuccess({});
      }, 2500);
    }
  }, [runSuccess, setRunSuccess]);

  useEffect(() => {
    if (tags.length === 0) {
      getTags(
        organizationName,
        repository.repositoryId,
        pat,
        setLocalLoading,
        setTags
      );
    }
  }, [tags, organizationName, repository, pat]);

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
    return tags[tags.length - 1].replace("refs/tags/", "");
  }

  const send = () => {
    if (pipeline !== undefined) {
      let model = {
        organization: organizationName,
        project: projectName,
        pat: pat,
        definitionId: pipeline.id,
        repositoryId: repository.repositoryId,
        tagName: typeOfVersion,
        userName: profileName,
      };
      createTag(model, setRunSuccess, setLocalLoading);
    }
  };

  const cancel = () => {
    setPossibleNewTag("-");
    setTypeOfVersion("");
  }

  const setTypeOfVersionCustom = (newTypeOfVersion) => {
    setTypeOfVersion(newTypeOfVersion);
    let newTag;
    let lastTag = getLatestTag(tags).split(".");
    switch (newTypeOfVersion) {
      case "major":
        newTag = `${Number(lastTag[0]) + 1}.0.0`;
        break;
      case "minor":
        newTag = `${lastTag[0]}.${Number(lastTag[1]) + 1}.0`;
        break;
      case "patch":
        newTag = `${lastTag[0]}.${lastTag[1]}.${Number(lastTag[2]) + 1}`;
        break;
      default:
        newTag = "-";
    }
    setPossibleNewTag(newTag);
  };

  return (
    <tr key={v4()}>
      <td key={repository.repositoryId}>{repository.repositoryName}</td>
      <td key={v4()}>
        {tags.length > 0
          ? `${getLatestTag(tags)}`
          : "-"}
      </td>
      <td key={v4()}>
        {pipeline !== undefined ? (
          <FormControl fullWidth>
            <InputLabel htmlFor="versionType">Set version type</InputLabel>
            <Select
              className="versionType"
              label="Set version type"
              value={typeOfVersion}
              onChange={(event) => setTypeOfVersionCustom(event.target.value)}
            >
              <MenuItem value={"major"} key={"major"}>
                Major
              </MenuItem>
              <MenuItem value={"minor"} key={"minor"}>
                Minor
              </MenuItem>
              <MenuItem value={"patch"} key={"patch"}>
                Patch
              </MenuItem>
              <MenuItem value={"Choose one"} key={"Choose one"} disabled>
                {"Choose one"}
              </MenuItem>
            </Select>
          </FormControl>
        ) : (
          <>No pipeline found</>
        )}
      </td>
      <td key={v4()}>
        {possibleNewTag !== "" ? <>{possibleNewTag}</> : <>-</>}
      </td>
      <td key={v4()}>
        {typeOfVersion !== "" && pipeline !== undefined ? (
          <>
            <MatUIButton
              id={"request_tag_and_build"}
              send={send}
              displayName={"Create tag and run build"}
            />{" "}
            <MatUIButton
              id={"request_tag_and_build_cancel"}
              send={cancel}
              displayName={"Cancel"}
            />
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
};

export default TagAndBuildTableBodyRow;
