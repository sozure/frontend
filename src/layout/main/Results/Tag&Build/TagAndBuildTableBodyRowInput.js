import { Input } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from "prop-types";

const TagAndBuildTableBodyRowInput = ({repositoryId}) => {
  const [description, setDescription] = useState("");

    return (
        <Input
            fullWidth
            type="text"
            key={`tagDescription_${repositoryId}`}
            id={`tagDescription_${repositoryId}`}
            name={`tagDescription_${repositoryId}`}
            placeholder="Tag description [OPTIONAL]"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
    );
};

TagAndBuildTableBodyRowInput.propTypes = {
  repositoryId: PropTypes.string.isRequired
};

export default TagAndBuildTableBodyRowInput;
