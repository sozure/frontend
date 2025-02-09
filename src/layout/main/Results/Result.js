import React, { useContext } from "react";
import VGTable from "./VariableGroup/Table/VGTable";
import {
  ActionTypeContext,
  TableTypeContext,
} from "../../../contexts/Contexts";
import KVTable from "./KeyVault/KVTable";
import SyncTable from "./Sync/SyncTable";
import BuildPipTable from "./BuildPip/BuildPipTable";
import TagAndBuildTable from "./Tag&Build/TagAndBuildTable";
import LatestTagTable from "./Tag&Build/LatestTag/LatestTagTable";
import PRTable from "./PR/PRTable";
import CreatePRTable from "./PR/CreatePRTable";

const Result = () => {
  const { tableType } = useContext(TableTypeContext);
  const { actionType } = useContext(ActionTypeContext);

  const getTable = () => {
    switch (tableType) {
      case "Secrets":
        return <KVTable />;
      case "Variable Groups":
        return <VGTable />;
      case "Sync configurations":
        return <SyncTable />;
      case "Run pipelines":
        return getPipelineTable();
      case "Tags":
        return getTagTable();
      case "Pull requests":
        return getPRTable();
      default:
        return <></>;
    }
  };

  const getTagTable = () => {
    switch (actionType) {
      case "List":
        return <LatestTagTable />;
      case "CreateAndBuild":
        return <TagAndBuildTable />;
      default:
        return <></>;
    }
  };

  const getPRTable = () => {
    switch (actionType) {
      case "List":
        return <PRTable />;
      case "Create":
        return <CreatePRTable />;
      default:
        return <></>;
    }
  };

  const getPipelineTable = () => {
    switch (actionType) {
      case "Build":
        return <BuildPipTable />;
      case "Release":
        return <h1>New function is about to come :D</h1>;
      default:
        return <></>;
    }
  };

  return <div className="result-footer">{getTable()}</div>;
};

export default Result;
