import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import MatUIButton from "../../../MatUIButton";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { createTag } from "../../../../services/GitVersionService";
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
  const [runSuccess, setRunSuccess] = useState({});
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (runSuccess.id !== undefined) {
      setTimeout(() => {
        setRunSuccess({});
      }, 2500);
    }
  }, [runSuccess, setRunSuccess]);

  const getBuildRunStatus = () => {
    if (pipeline !== undefined && runSuccess.id === pipeline.id && runSuccess.success) {
      return <span>Success</span>;
    }
    return <>-</>;
  };

  const send = () => {
    if(pipeline !== undefined){
      let model = {
        organization: organizationName,
        project: projectName,
        pat: pat,
        definitionId: pipeline.id,
        repositoryId: repository.repositoryId,
        tagName: typeOfVersion,
        userName: profileName
      };
      createTag(model, setRunSuccess, setLocalLoading);
    }
  };

  return (
    <tr key={v4()}>
      <td key={repository.repositoryId}>{repository.repositoryName}</td>
      <td key={v4()}>
        {pipeline !== undefined ? (
          <FormControl fullWidth>
            <InputLabel htmlFor="versionType">Set version type</InputLabel>
            <Select
              className="versionType"
              label="Set version type"
              value={typeOfVersion}
              onChange={(event) => setTypeOfVersion(event.target.value)}
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
        {typeOfVersion !== "" && pipeline !== undefined ? (
          <MatUIButton
            id={"request_build_pipelines"}
            send={send}
            displayName={"Create new tag and run build"}
          />
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
