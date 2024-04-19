import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { SelectedRepositoriesContext } from "../../../../contexts/Contexts";
import PropTypes from "prop-types";
import MatUICheckbox from "../../../MatUICheckbox";

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

  const setCheckbox = (checked) => {
    setChecked(checked);
    let result = [];
    selectedRepositories.forEach((selectedRepository) => {
      if (selectedRepository.repositoryName === repository.repositoryName) {
        result.push({
          repositoryName: selectedRepository.repositoryName,
          repositoryId: selectedRepository.repositoryId,
          selected: checked,
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
        <MatUICheckbox
          id={"createPRsTableCheckbox"}
          name={"createPRsTableCheckbox"}
          value={checked}
          setValue={setCheckbox}
        />
      </td>
      <td key={v4()}>
        {repository.projectName.length > 11
          ? `${repository.projectName.slice(0, 11)}...`
          : repository.projectName}
      </td>
      <td key={v4()}>
        <abbr title={repository.repositoryName}>
          {repository.repositoryName.length > 25
            ? `${repository.repositoryName.slice(0, 25)}...`
            : repository.repositoryName}
        </abbr>
      </td>
    </tr>
  );
};

CreatePRsTableBodyRow.propTypes = {
  repository: PropTypes.object.isRequired,
};

export default CreatePRsTableBodyRow;
