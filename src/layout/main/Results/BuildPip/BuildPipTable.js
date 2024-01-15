import React, { useContext, useState } from "react";
import TableHeader from "../TableHeader";
import PaginationButtons from "../PaginationButtons";
import BuildPipTableBody from "./BuildPipTableBody";
import {
  BuildPipelinesContext,
  PaginationCounterContext,
} from "../../../../contexts/Contexts";
import { Input } from "@mui/material";

const BuildPipTable = () => {
  const tableHeader = ["Pipeline", "Source", "Action"];
  const { buildPipelines } = useContext(BuildPipelinesContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const [searchBuildPipelines, setSearchBuildPipelines] =
    useState(buildPipelines);
  const [filter, setFilter] = useState("");

  const filterPipelines = (newFilter) => {
    setFilter(newFilter);
    setPaginationCounter(0);
    if (newFilter !== "") {
      let result = [];
      buildPipelines.forEach((element) => {
        if (element.name.toLowerCase().includes(newFilter.toLowerCase())) {
          result.push(element);
        }
      });
      setSearchBuildPipelines(result);
    } else {
      setSearchBuildPipelines(buildPipelines);
    }
  };

  return (
    <>
      {searchBuildPipelines.length === 0 ? (
        <p>There are no build pipelines</p>
      ) : (
        <>
          <h2>Found pipelines: {searchBuildPipelines.length}</h2>
          <br />
          <Input
            fullWidth
            type="text"
            id="build_search"
            name="build_search"
            placeholder="Search"
            value={filter}
            onChange={(event) => filterPipelines(event.target.value)}
          />
          <table className="matched-variables-table">
            <TableHeader columnList={tableHeader} />
            <BuildPipTableBody buildPipelines={searchBuildPipelines} />
          </table>
          <br />
          <PaginationButtons collection={searchBuildPipelines} />
        </>
      )}
    </>
  );
};

export default BuildPipTable;
