import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Input } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";

import {
  PullRequestsContext,
  VGAuthorizedContext,
} from "../../../../contexts/Contexts";

const navigate = (url) => {
  window.open(url, "_blank");
};

const columns = [
  { field: "project", headerName: "Project", width: 150 },
  {
    field: "repository",
    headerName: "Repository",
    width: 150,
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },
  {
    field: "createdBy",
    headerName: "Created by",
    width: 150,
  },
  {
    field: "created",
    headerName: "Created",
    width: 150,
  },
  {
    field: "size",
    headerName: "Size",
    description: "Size of pull request.",
    width: 150,
  },
  {
    field: "approvers",
    headerName: "Approvers",
    width: 150,
  },
  {
    field: "url",
    headerName: "Navigate",
    width: 150,
    renderCell: (params) => (
      <Box>
        <Button
          id={"check_pull_requests"}
          onClick={() => navigate(params.row.url)}
          variant="contained"
        >
          <NearMeIcon />
        </Button>
      </Box>
    ),
  },
];

const PRTable = () => {
  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { pullRequests } = useContext(PullRequestsContext);

  const [filter, setFilter] = useState("");
  const [searchPullRequests, setSearchPullRequests] = useState([]);

  useEffect(() => {
    let result = [];
    let counter = 1;
    pullRequests.forEach((element) => {
      result.push({ id: counter, ...element });
      counter++;
    });
    setSearchPullRequests(result);
  }, [pullRequests]);

  const filterPullRequests = (newFilter) => {
    setFilter(newFilter);
    if (newFilter !== "") {
      let result = [];
      let counter = 1;
      pullRequests.forEach((element) => {
        if (
          element.repository.toLowerCase().includes(newFilter.toLowerCase())
        ) {
          result.push({ id: counter, ...element });
          counter++;
        }
      });
      setSearchPullRequests(result);
    } else {
      let result = [];
      let counter = 1;
      pullRequests.forEach((element) => {
        result.push({ id: counter, ...element });
        counter++;
      });
      setSearchPullRequests(result);
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
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={searchPullRequests}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                />
              </div>
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default PRTable;
