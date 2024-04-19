import React, { useState } from "react";
import { v4 } from "uuid";
import { Box, Button } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import PropTypes from "prop-types";
import MatUISelect from "../../../MatUISelect";

const PRTableBodyRow = ({ pullRequest }) => {
  const [approver, setApprover] = useState("");

  const navigate = (url) => {
    window.open(url, "_blank");
  };

  return (
    <tr key={v4()}>
      <td key={v4()}>
        {pullRequest.project.length > 11
          ? `${pullRequest.project.slice(0, 11)}...`
          : pullRequest.project}
      </td>
      <td key={v4()}>{pullRequest.repository}</td>
      <td key={v4()}>{pullRequest.title}</td>
      <td key={v4()}>{pullRequest.createdBy}</td>
      <td key={v4()}>{pullRequest.created}</td>
      <td key={v4()}>{pullRequest.size[0]}</td>
      <td key={v4()}>
        {pullRequest.approvers.length > 0 ? (
          <MatUISelect
            collection={pullRequest.approvers}
            inputLabel={"Approvers"}
            id={`approvers`}
            selectValue={approver}
            setSelectValue={setApprover}
            allOption={false}
          />
        ) : (
          <>No approvers</>
        )}
      </td>
      <td key={v4()}>
        <Box>
          <Button
            id={"check_pull_requests"}
            onClick={() => navigate(pullRequest.url)}
            variant="contained"
          >
            <NearMeIcon />
          </Button>
        </Box>
      </td>
    </tr>
  );
};

PRTableBodyRow.propTypes = {
  pullRequest: PropTypes.object.isRequired,
};

export default PRTableBodyRow;
