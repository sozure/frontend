import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  ChangesContext,
  LoadingContext,
  OrganizationContext,
  ProjectNameContext,
  ProjectsContext,
} from "../../../contexts/Contexts";
import { getChanges } from "../../../services/ChangesService";
import { useNavigate } from "react-router-dom";
import { checkRequiredInputs2 } from "../../../services/CommonService";

export const ModificationsForm = () => {
  const navigate = useNavigate();
  const potentialLimits = [10, 20, 50, 100];
  const [entityType, setEntityType] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { organizationName } = useContext(OrganizationContext);
  const { projects } = useContext(ProjectsContext);
  const { setChanges } = useContext(ChangesContext);
  const { setLoading } = useContext(LoadingContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);

  const mandatoryFields = [from, to, entityType];

  useEffect(() => {
    if (projects.length === 0) {
      navigate("/");
    }
  }, [projects, navigate]);

  const sendRequest = () => {
    let incorrectFill = checkRequiredInputs2(
      mandatoryFields,
      "custom-auth",
      1500
    );
    if (!incorrectFill) {
      let body = {
        organization: organizationName,
        project: projectName,
        from: from,
        to: to,
        limit: selectedLimit,
        changeTypes: [0, 1, 2],
      };
      if (userName !== "") {
        body["user"] = userName;
      }
      getChanges(body, setLoading, setChanges);
    }
  };
  return (
    <div className="form">
      <FormControl fullWidth>
        <InputLabel>Select entity type of modification</InputLabel>
        <Select
          id="entityType"
          value={entityType}
          label="Select entity type"
          onChange={(event) => setEntityType(event.target.value)}
        >
          <MenuItem value={"env_Variables"} key={"env_Variables"}>
            {"Env. variables"}
          </MenuItem>
          <MenuItem value={"secrets"} key={"secrets"}>
            {"Secrets"}
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Select Azure project</InputLabel>
        <Select
          id="project"
          value={projectName}
          label="Select Azure project"
          onChange={(event) => setProjectName(event.target.value)}
        >
          {projects.map((project) => (
            <MenuItem value={project.name} key={project.name}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From date"
          value={from}
          onChange={(newValue) => {
            setFrom(newValue);
          }}
          textField={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="To date"
          value={to}
          onChange={(newValue) => {
            setTo(newValue);
          }}
          textField={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel>Select result table limit</InputLabel>
        <Select
          id="limit"
          value={selectedLimit}
          label="Select limit"
          onChange={(event) => setSelectedLimit(event.target.value)}
        >
          {potentialLimits.map((limit) => (
            <MenuItem value={limit} key={limit}>
              {limit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Input
        type="text"
        id="user"
        name="user"
        placeholder="User"
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
      />
      <Button
        variant="contained"
        id="changes_search_button"
        onClick={sendRequest}
      >
        Search
      </Button>
      <ToastContainer />
    </div>
  );
};
