import React, { useContext, useState } from "react";
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
import PropTypes from "prop-types";
import MatUISelect from "../../../MatUISelect";
import CustomClipLoader from "../../../CustomClipLoader";

const BuildPipTableBodyRow = ({ pipeline }) => {
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { projectName } = useContext(ProjectNameContext);

  const [sourceType, setSourceType] = useState("Choose one");
  const [pipelineRunModel, setPipelineRunModel] = useState({});
  const [source, setSource] = useState("Choose one");
  const [sources, setSources] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);

  const setCustomSourceType = async (newSourceType) => {
    setSourceType(newSourceType);
    if (newSourceType !== "Choose one") {
      setSource("Choose one");
      let model = {
        id: pipeline.id,
        type: "source type",
      };
      setPipelineRunModel(model);
      setLocalLoading(true);
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

  const isModification = () => {
    return (
      pipelineRunModel.id !== undefined &&
      pipelineRunModel.id !== null &&
      pipelineRunModel.id === pipeline.id
    );
  };

  const send = async () => {
    let model = {
      id: pipeline.id,
      type: "run pipeline",
    };
    setPipelineRunModel(model);
    await runBuildPipeline(
      organizationName,
      projectName,
      pat,
      pipeline.id,
      source
    );
    setSource("Choose one");
    setSourceType("Choose one");
    setPipelineRunModel({});
  };

  const getActionSection = () => {
    if (
      sources.length === 0 ||
      source === "Choose one" ||
      sourceType === "Choose one"
    ) {
      return <>-</>;
    } else if (
      isModification() &&
      pipelineRunModel.type === "run pipeline" &&
      localLoading
    ) {
      return <CustomClipLoader />;
    }
    return (
      <MatUIButton id={"run_button"} send={send} displayName={"Run pipeline"} />
    );
  };

  return (
    <tr key={v4()}>
      <td key={pipeline.id}>{pipeline.name}</td>
      <td key={v4()}>
        <MatUISelect
          collection={["Choose one", "branch", "tag"]}
          inputLabel={"Set source type"}
          id={"source-type"}
          selectValue={sourceType}
          setSelectValue={setCustomSourceType}
          allOption={false}
          required={true}
        />
      </td>
      <td key={v4()}>
        {isModification() &&
          pipelineRunModel.type === "source type" &&
          sources.length === 0 &&
          localLoading && <CustomClipLoader />}
        {isModification() &&
          sources.length > 0 &&
          sourceType !== "Choose one" && (
            <MatUISelect
              collection={[...sources, "Choose one"]}
              inputLabel={"Set source"}
              id={"source"}
              selectValue={source}
              setSelectValue={setSource}
              allOption={false}
              required={true}
            />
          )}
        {(!isModification() || (!localLoading && sources.length === 0)) && (
          <>-</>
        )}
      </td>
      <td key={v4()}>{getActionSection()}</td>
    </tr>
  );
};

BuildPipTableBodyRow.propTypes = {
  pipeline: PropTypes.object.isRequired,
};

export default BuildPipTableBodyRow;
