import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { SelectedRepositoriesContext } from "../../../../contexts/Contexts";

const CreatePRsTableBodyRow = ({ repository }) => {
  const { selectedRepositories, setSelectedRepositories } = useContext(SelectedRepositoriesContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    selectedRepositories.forEach((selectedRepository) => {
      if (selectedRepository.repositoryName === repository.repositoryName) {
        setChecked(selectedRepository.selected);
      }
    });
  }, [selectedRepositories, repository, setChecked]);

  const setCheckbox = (e) => {
    let value = e.target.checked;
    setChecked(value);
    let result = [];
    selectedRepositories.forEach((selectedRepository) => {
      if (selectedRepository.repositoryName === repository.repositoryName) {
        result.push({
          repositoryName: selectedRepository.repositoryName,
          repositoryId: selectedRepository.repositoryId,
          selected: value,
        });
      } else {
        result.push(selectedRepository);
      }
    });
    setSelectedRepositories(result);
  };

  return (
    <tr key={v4()}>
      <td key={v4()}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={setCheckbox} />}
          />
        </FormGroup>
      </td>
      <td key={v4()}>{repository.repositoryName}</td>
    </tr>
  );
};

export default CreatePRsTableBodyRow;
