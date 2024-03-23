import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { OrganizationContext, PATContext } from "../../../../../contexts/Contexts";
import { getTags } from "../../../../../services/GitVersionService";
import { hasItem, collectLatestTags, sortVersions } from "../../../../../services/HelperFunctions/TagHelperFunctions";
import PropTypes from "prop-types";

const LatestTagTableBodyRow = ({
  repository,
  latestTags,
  setLatestTags,
  pipeline,
}) => {
  const [latestTag, setLatestTag] = useState("");
  const [runAlready, setRunAlready] = useState(false);
  const [tags, setTags] = useState([]);

  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);

  useEffect(() => {
    let alreadyHasItem = hasItem(latestTags, repository);
    if (
      !alreadyHasItem.found &&
      !runAlready &&
      tags.length === 0 &&
      pipeline !== undefined
    ) {
      setRunAlready(true);
      getTags(
        organizationName,
        repository.repositoryId,
        pat,
        setLocalLoading,
        setTags
      );
    } else if (alreadyHasItem.found) {
      setLatestTag(alreadyHasItem.element.tag);
    }
  }, [
    tags,
    organizationName,
    repository,
    pat,
    pipeline,
    latestTag,
    runAlready,
    latestTags,
  ]);

  useEffect(() => {
    let alreadyHasItem = hasItem(latestTags, repository);
    if (tags.length > 0 && !alreadyHasItem.found) {
      let tag = getLatestTag(tags);
      setLatestTag(tag);
      let result = collectLatestTags(latestTags, repository, tag);
      setLatestTags(result);
    } else if (alreadyHasItem.found) {
      setLatestTag(alreadyHasItem.element.tag);
    }
  }, [tags, latestTags, setLatestTags, repository]);

  const getLatestTag = (tags) => {
    let sortedTags = sortVersions(tags);
    return sortedTags[sortedTags.length - 1].replace("refs/tags/", "");
  };

  const setLocalLoading = (value) => {
    console.log(value);
  };

  return (
    <tr key={v4()}>
      <td key={repository.repositoryId}>{repository.repositoryName}</td>
      <td key={v4()}>{latestTag !== "" ? `${latestTag}` : "-"}</td>
    </tr>
  );
};

LatestTagTableBodyRow.propTypes = {
  latestTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLatestTags: PropTypes.func.isRequired,
  repository: PropTypes.object.isRequired,
  pipeline: PropTypes.object
};

export default LatestTagTableBodyRow;
