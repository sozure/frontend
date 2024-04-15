import { Input } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";

const CreatePRTableBodyRowInput = ({repositoryId, sourceBranch, targetBranch}) => {
  const [title, setTitle] = useState("");

  return (
    <Input
      fullWidth
      type="text"
      id={`${repositoryId}_title`}
      name="title"
      placeholder={`Merge ${sourceBranch} into ${targetBranch}`}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

CreatePRTableBodyRowInput.propTypes = {
    repositoryId: PropTypes.string.isRequired,
    sourceBranch: PropTypes.string.isRequired,
    targetBranch: PropTypes.string.isRequired
  };

export default CreatePRTableBodyRowInput;
