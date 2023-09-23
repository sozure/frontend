import axios from "axios";
import { getBaseUrl, handleError2, getResponseMessage } from "./CommonService";

const baseUrl = `${getBaseUrl()}/project`;

const axiosConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const getProjects = (
  organizationName,
  PAT,
  setResult,
  setAuthorized,
  setProjectName,
  setLoading
) => {
  const url = `${baseUrl}?organization=${organizationName}&pat=${PAT}`;
  let projects = [
    { name: "project1" },
    { name: "project2" },
    { name: "project3" },
  ];
  setLoading(false);
  setResult(projects);
  setProjectName(projects[0].name);
  setAuthorized(true);
  // axios
  //   .get(url, axiosConfig)
  //   .then((res) => {
  //     let status = res.data.status;
  //     let projects = res.data.projects;
  //     setLoading(false);
  //     if (status === 0) {
  //       setResult(projects);
  //       setProjectName(projects[0].name);
  //     } else {
  //       alert(getResponseMessage(status));
  //     }
  //     setAuthorized(status === 0);
  //   })
  //   .catch((err) => {
  //     handleError2(err);
  //   });
};

export { getProjects };
