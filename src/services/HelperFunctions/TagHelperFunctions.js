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

  const compareVersions = (version1, version2) => {
    const v1 = version1.split('/').pop(); // Extract the numeric part
    const v2 = version2.split('/').pop();

    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
        const part1 = v1Parts[i] || 0;
        const part2 = v2Parts[i] || 0;

        if (part1 !== part2) {
            return part1 - part2;
        }
    }

    return 0; // Versions are equal
}

const sortVersions = (versionArray) => {
    return versionArray.sort(compareVersions);
}

  export { hasItem, collectLatestTags, sortVersions }