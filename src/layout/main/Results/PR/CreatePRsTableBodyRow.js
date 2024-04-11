import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { SelectedRepositoriesContext } from "../../../../contexts/Contexts";
import PropTypes from "prop-types";

const CreatePRsTableBodyRow = ({ repository }) => {
  const { selectedRepositories, setSelectedRepositories } = useContext(
    SelectedRepositoriesContext
  );
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
      <td key={v4()}>
        {repository.projectName.length > 11
          ? `${repository.projectName.slice(0, 11)}...`
          : repository.projectName}
      </td>
      <abbr title={repository.repositoryName} >
        <td key={v4()}>
          {repository.repositoryName.length > 25
            ? `${repository.repositoryName.slice(0, 25)}...`
            : repository.repositoryName}
        </td>
      </abbr>
    </tr>
  );
};

CreatePRsTableBodyRow.propTypes = {
  repository: PropTypes.object.isRequired
}

export default CreatePRsTableBodyRow;
