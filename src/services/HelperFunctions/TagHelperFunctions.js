const hasItem = (latestTags, repository) => {
    let alreadyHasItem = { found: false, element: undefined };
    latestTags.forEach((tag) => {
      if (tag.name === repository.repositoryName) {
        alreadyHasItem = { found: true, element: tag };
      }
    });
    return alreadyHasItem;
  };
  
  const collectLatestTags = (latestTags, repository, tag) => {
    let newElement = { name: repository.repositoryName, tag: tag };
    let result = [];
    latestTags.forEach((latestTag) => {
      result.push(latestTag);
    });
    result.push(newElement);
    return result;
  };

  export { hasItem, collectLatestTags}