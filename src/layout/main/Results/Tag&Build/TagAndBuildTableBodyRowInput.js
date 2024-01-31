import { Input } from '@mui/material';
import React, { useState } from 'react';

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

export default TagAndBuildTableBodyRowInput;
