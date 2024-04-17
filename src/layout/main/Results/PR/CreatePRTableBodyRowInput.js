import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CreatePRTableBodyRowInput = ({repositoryId, sourceBranch, targetBranch}) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(`${sourceBranch} into ${targetBranch}`);
  }, [sourceBranch, targetBranch, setTitle]);

  return (
    <Input
      fullWidth
      type="text"
      id={`${repositoryId}_title`}
      name="title"
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
