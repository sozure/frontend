import { Input } from "@mui/material";
import React, { useContext, useState } from "react";
import TableHeader from "../TableHeader";
import PaginationButtons from "../PaginationButtons";
import { PaginationCounterContext, VGAuthorizedContext } from "../../../../contexts/Contexts";
import PropTypes from "prop-types";

const TagBaseTable = ({TableBody, tableHeader, repositories}) => {
  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

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
                <TableBody repositories={searchRepositories} />
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

TagBaseTable.propTypes = {
  TableBody: PropTypes.any.isRequired,
  tableHeader: PropTypes.any.isRequired,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TagBaseTable;
