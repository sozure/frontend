import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import {
  ChangesContext,
  EntityRecordTypeContext,
  KeyVaultNameContext,
  LoadingContext,
  OrganizationContext,
  ProjectNameContext,
  ProjectsContext,
} from "../../../contexts/Contexts";
import { getVGChanges as requestVGChanges, getSecretChanges as requestSecretChanges } from "../../../services/ChangesService";
import { useNavigate } from "react-router-dom";
import { checkRequiredInputs2 } from "../../../services/CommonService";
import { VGModificationsForm } from "./VGModificationsForm";
import { SecretModificationsForm } from "./SecretModificationsForm";

export const ModificationsForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { organizationName } = useContext(OrganizationContext);
  const { projects } = useContext(ProjectsContext);
  const { setChanges } = useContext(ChangesContext);
  const { setLoading } = useContext(LoadingContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
  const { entityType, setEntityType } = useContext(EntityRecordTypeContext);

  const mandatoryFields = [from, to, entityType];

  useEffect(() => {
    if (projects.length === 0) {
      navigate("/");
    }
  }, [projects, navigate]);

  const sendRequest = async () => {
    let incorrectFill = checkRequiredInputs2(
      mandatoryFields,
      "custom-auth",
      1500
    );
    if (!incorrectFill) {
      switch (entityType) {
        case "env_Variables":
          await getVGChanges();
          break;
        case "secrets":
          await getSecretChanges();
          break;
        default:
          alert("Invalid record requesting!");
      }
    }
  };

  const getVGChanges = async () => {
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
    await requestVGChanges(body, setLoading, setChanges);
  };

  const getSecretChanges = async () => {
    let body = {
      from: from,
      to: to,
      limit: selectedLimit,
      keyVaultName: keyVaultName,
      changeTypes: [0, 1, 2]
    };
    if (userName !== "") {
      body["user"] = userName;
    }
    await requestSecretChanges(body, setLoading, setChanges);
  };

  return (
    <div className="form">
      <FormControl fullWidth>
        <InputLabel>Select entity type of modification</InputLabel>
        <Select
          id="entityType"
          value={entityType}
          label="Select entity type"
          onChange={(event) => {
            setChanges([]);
            setEntityType(event.target.value)
          }}
        >
          <MenuItem value={"env_Variables"} key={"env_Variables"}>
            {"Env. variables"}
          </MenuItem>
          <MenuItem value={"secrets"} key={"secrets"}>
            {"Secrets"}
          </MenuItem>
        </Select>
      </FormControl>
      {entityType === "env_Variables" ? (
        <VGModificationsForm
          setProjectName={setProjectName}
          projectName={projectName}
          projects={projects}
          setUserName={setUserName}
          userName={userName}
          setSelectedLimit={setSelectedLimit}
          selectedLimit={selectedLimit}
          setFrom={setFrom}
          from={from}
          setTo={setTo}
          to={to}
        />
      ) : (
        <SecretModificationsForm
          setUserName={setUserName}
          userName={userName}
          setSelectedLimit={setSelectedLimit}
          selectedLimit={selectedLimit}
          setFrom={setFrom}
          from={from}
          setTo={setTo}
          to={to}
        />
      )}

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
