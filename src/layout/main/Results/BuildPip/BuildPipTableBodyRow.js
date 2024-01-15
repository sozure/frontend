import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useState } from "react";
import { v4 } from "uuid";
import { getRepositoryIdByBuildPipeline } from "../../../../services/BuildPipelineService";
import {
  OrganizationContext,
  PATContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";
import { getBranches, getTags } from "../../../../services/GitVersionService";

const BuildPipTableBodyRow = ({ pipeline }) => {
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);

  const [sourceType, setSourceType] = useState("choose one");
  const [pipelineRunModel, setPipelineRunModel] = useState({});
  const [source, setSource] = useState("");
  const [sources, setSources] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);

  const setCustomSourceType = async (newSourceType) => {
    setSourceType(newSourceType);
    if (newSourceType !== "choose one") {
      await getRepositoryIdByBuildPipeline(
        organizationName,
        projectName,
        pat,
        pipeline.id,
        newSourceType === "branch" ? getBranches: getTags,
        setLocalLoading,
        setSources
      );
      let model = {
        id: pipeline.id,
      };
      setPipelineRunModel(model);
    }
  };

  return (
    <tr key={v4()}>
      <td key={pipeline.id}>{pipeline.name}</td>
      <td key={v4()}>
        <FormControl fullWidth>
          <InputLabel>Set source type</InputLabel>
          <Select
            className="source-type"
            label="Set source type"
            value={sourceType}
            onChange={(event) => setCustomSourceType(event.target.value)}
          >
            <MenuItem value="choose one">Choose one</MenuItem>
            <MenuItem value="branch">Branch</MenuItem>
            <MenuItem value="tag">Tag</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td key={v4()}>
        {localLoading ? <span>Loading...</span>: pipelineRunModel.id !== undefined &&
        pipelineRunModel.id !== null &&
        pipelineRunModel.id === pipeline.id ? (
          <FormControl fullWidth>
            <InputLabel>Set source</InputLabel>
            <Select
              className="source"
              label="Set source"
              value={source}
              onChange={(event) => setSource(event.target.value)}
            >
              {sources.map((source) => (
                <MenuItem value={source} key={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>-</>
        )}
      </td>
    </tr>
  );
};

export default BuildPipTableBodyRow;
