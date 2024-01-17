import { Input } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  PaginationCounterContext,
  RepositoriesContext,
  VGAuthorizedContext,
} from "../../../../contexts/Contexts";
import TableHeader from "../TableHeader";
import PaginationButtons from "../PaginationButtons";
import TagAndBuildTableBody from "./TagAndBuildTableBody";

const TagAndBuildTable = () => {
  const tableHeader = [
    "Repository",
    "Type of new version",
    "Create and build",
    "Result",
  ];
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { repositories } = useContext(RepositoriesContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);

  const [filter, setFilter] = useState("");
  const [searchRepositories, setSearchRepositories] = useState(repositories);

  const filterRepositories = (newFilter) => {
    setFilter(newFilter);
    setPaginationCounter(0);
    if (newFilter !== "") {
      let result = [];
      repositories.forEach((element) => {
        if (
          element.repositoryName.toLowerCase().includes(newFilter.toLowerCase())
        ) {
          result.push(element);
        }
      });
      setSearchRepositories(result);
    } else {
      setSearchRepositories(repositories);
    }
  };

  return (
    <>
      {vgAuthorized && (
        <div className="form">
          <Input
            fullWidth
            type="text"
            id="build_search"
            name="build_search"
            placeholder="Search"
            value={filter}
            onChange={(event) => filterRepositories(event.target.value)}
          />
          {searchRepositories.length === 0 ? (
            <p>There are no repositories.</p>
          ) : (
            <>
              <h2>Found repositories: {searchRepositories.length}</h2>
              <br />

              <table className="matched-variables-table">
                <TableHeader columnList={tableHeader} />
                <TagAndBuildTableBody repositories={searchRepositories} />
              </table>
              <br />
              <PaginationButtons collection={searchRepositories} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TagAndBuildTable;
