import React, { useContext } from "react";
import VGTable from "./VariableGroup/VGTable";
import {
  ActionTypeContext,
  TableTypeContext,
} from "../../../contexts/Contexts";
import KVTable from "./KeyVault/KVTable";
import SyncTable from "./Sync/SyncTable";
import BuildPipTable from "./BuildPip/BuildPipTable";
import TagAndBuildTable from "./Tag&Build/TagAndBuildTable";
import LatestTagTable from "./Tag&Build/LatestTag/LatestTagTable";

const Result = () => {
  const { tableType } = useContext(TableTypeContext);
  const { actionType } = useContext(ActionTypeContext);

  const getTable = () => {
    switch (tableType) {
      case "KV":
        return <KVTable />;
      case "VG":
        return <VGTable />;
      case "Sync":
        return <SyncTable />;
      case "Pipeline":
        return getPipelineTable();
      case "Tag":
        return getTagTable();
      default:
        return <></>
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
