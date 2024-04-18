import React, { useContext, useEffect, useState } from "react";
import TableHeader from "../TableHeader";
import PaginationButtons from "../PaginationButtons";
import {
  PaginationCounterContext,
  SelectedRepositoriesContext,
  VGAuthorizedContext,
} from "../../../../contexts/Contexts";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Input } from "@mui/material";
import MatUICheckbox from "../../../MatUICheckbox";

const TagBaseTable = ({
  TableBody,
  tableHeader,
  repositories,
  isPullRequestCreations,
}) => {
  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const { selectedRepositories, setSelectedRepositories } = useContext(
    SelectedRepositoriesContext
  );

  const [filter, setFilter] = useState("");
  const [searchRepositories, setSearchRepositories] = useState(repositories);

  useEffect(() => {
    setSearchRepositories(repositories);
  }, [repositories]);

  const setCheckbox = (checked) => {
    let result = [];
    selectedRepositories.forEach((repository) => {
      result.push({
        repositoryName: repository.repositoryName,
        repositoryId: repository.repositoryId,
        selected: checked,
      });
    });
    setSelectedRepositories(result);
  };

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
              {isPullRequestCreations && (
                <MatUICheckbox
                  id={"tagBaseTableCheckbox"}
                  name={"tagBaseTableCheckbox"}
                  label={"Select all"}
                  setValue={setCheckbox}
                />
              )}
              <table className="matched-variables-table">
                <TableHeader columnList={tableHeader} />
                <TableBody filteredRepositories={searchRepositories} />
              </table>
              <br />
              <PaginationButtons collection={searchRepositories} />
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

TagBaseTable.propTypes = {
  TableBody: PropTypes.any.isRequired,
  tableHeader: PropTypes.any.isRequired,
  repositories: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPullRequestCreations: PropTypes.bool,
};

export default TagBaseTable;
