import React, { useContext, useEffect, useState } from "react";
import TableHeader from "../TableHeader";
import PaginationButtons from "../PaginationButtons";
import { ToastContainer } from "react-toastify";
import { Input } from "@mui/material";

import {
  PaginationCounterContext,
  PullRequestsContext,
  VGAuthorizedContext,
} from "../../../../contexts/Contexts";
import PRTableBody from "./PRTableBody";

const PRTable = () => {
  const tableHeader = [
    "Project",
    "Repository",
    "Title",
    "Created by",
    "Created",
    "Size",
    "Approvers",
    "Navigate",
  ];

  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);
  const { pullRequests } = useContext(PullRequestsContext);

  const [filter, setFilter] = useState("");
  const [searchPullRequests, setSearchPullRequests] = useState(pullRequests);

  useEffect(() => {
    setSearchPullRequests(pullRequests);
  }, [pullRequests]);

  const filterPullRequests = (newFilter) => {
    setFilter(newFilter);
    setPaginationCounter(0);
    if (newFilter !== "") {
      let result = [];
      pullRequests.forEach((element) => {
        if (
          element.repository.toLowerCase().includes(newFilter.toLowerCase())
        ) {
          result.push(element);
        }
      });
      setSearchPullRequests(result);
    } else {
      setSearchPullRequests(pullRequests);
    }
  };

  return (
    <>
      {vgAuthorized && (
        <div className="form">
          <Input
            fullWidth
            type="text"
            id="pr_search"
            name="pr_search"
            placeholder="Search"
            value={filter}
            onChange={(event) => filterPullRequests(event.target.value)}
          />
          {searchPullRequests.length === 0 ? (
            <p>There are no pull requests.</p>
          ) : (
            <>
              <h2>Found pull requests: {searchPullRequests.length}</h2>
              <br />

              <table className="matched-variables-table">
                <TableHeader columnList={tableHeader} />
                <PRTableBody pullRequests={searchPullRequests} />
              </table>
              <br />
              <PaginationButtons collection={searchPullRequests} />
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default PRTable;
