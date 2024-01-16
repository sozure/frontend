import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import {
  getRepositoryIdByBuildPipeline,
  runBuildPipeline,
} from "../../../../services/BuildPipelineService";
import {
  OrganizationContext,
  PATContext,
  ProjectNameContext,
} from "../../../../contexts/Contexts";
import { getBranches, getTags } from "../../../../services/GitVersionService";
import MatUIButton from "../../../MatUIButton";

const BuildPipTableBodyRow = ({ pipeline }) => {
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);

  const [sourceType, setSourceType] = useState("Choose one");
  const [pipelineRunModel, setPipelineRunModel] = useState({});
  const [source, setSource] = useState("Choose one");
  const [sources, setSources] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);
  const [runSuccess, setRunSuccess] = useState({});

useEffect(() =>{
  if(runSuccess.id !== undefined){
    setTimeout(() => {
      setRunSuccess({})
    }, 2500)
  }
}, [runSuccess, setRunSuccess])

  const setCustomSourceType = async (newSourceType) => {
    setSourceType(newSourceType);
    if (newSourceType !== "Choose one") {
      setSource("Choose one");
      let model = {
        id: pipeline.id,
      };
      setPipelineRunModel(model);
      await getRepositoryIdByBuildPipeline(
        organizationName,
        projectName,
        pat,
        pipeline.id,
        newSourceType === "branch" ? getBranches : getTags,
        setLocalLoading,
        setSources
      );
    }
  };

  const send = async () => {
    await runBuildPipeline(
      organizationName,
      projectName,
      pat,
      pipeline.id,
      source,
      setLocalLoading,
      setRunSuccess
    );
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
            <MenuItem value="Choose one">Choose one</MenuItem>
            <MenuItem value="branch">Branch</MenuItem>
            <MenuItem value="tag">Tag</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td key={v4()}>
        {pipelineRunModel.id !== undefined &&
        pipelineRunModel.id !== null &&
        pipelineRunModel.id === pipeline.id && sources.length > 0 && sourceType !== "Choose one" ? (
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
              <MenuItem value={"Choose one"} key={"Choose one"}>
                {"Choose one"}
              </MenuItem>
            </Select>
          </FormControl>
        ) : (
          <>-</>
        )}
      </td>
      <td key={v4()}>
        {sources.length === 0 || source === "Choose one" || sourceType === "Choose one" ? (
          <>-</>
        ) : (
          <MatUIButton
            id={"run_button"}
            send={send}
            displayName={"Run pipeline"}
          />
        )}
      </td>
      <td key={v4()}>
        {pipelineRunModel.id !== undefined &&
        pipelineRunModel.id !== null &&
        pipelineRunModel.id === pipeline.id &&
        localLoading ? (
          <span>Loading...</span>
        ) : runSuccess.id === pipeline.id && runSuccess.success ? (
          <>Success</>
        ) : (
          <>-</>
        )}
      </td>
    </tr>
  );
};

export default BuildPipTableBodyRow;
