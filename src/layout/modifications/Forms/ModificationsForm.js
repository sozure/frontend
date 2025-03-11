import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Button, Box, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";

import {
  KeyVaultNameContext,
  KeyVaultsContext,
  LoadingContext,
  OrganizationContext,
  PaginationCounterContext,
  ProjectNameContext,
  ProjectsContext,
} from "../../../contexts/Contexts";
import {
  getVGChanges as requestVGChanges,
  getSecretChanges as requestSecretChanges,
  getKVChanges as requestKVChanges,
} from "../../../services/ChangesService";
import { useNavigate } from "react-router-dom";
import {
  checkRequiredInputs,
  getToastOnClose,
  toastErrorPopUp,
} from "../../../services/CommonService";
import CommonFormElements from "./CommonFormElements";
import MatUISelect from "../../MatUISelect";
import ProjectSelectMenu from "../../ProjectSelectMenu";
import KeyVaultSelectMenu from "../../KeyVaultSelectMenu";

export const ModificationsForm = ({
  entityType,
  setEntityType,
  setChanges,
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedLimit, setSelectedLimit] = useState(10);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const { keyVaults } = useContext(KeyVaultsContext);
  const { organizationName } = useContext(OrganizationContext);
  const { projects } = useContext(ProjectsContext);
  const { setLoading } = useContext(LoadingContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { keyVaultName, setKeyVaultName } = useContext(KeyVaultNameContext);
  const { setPaginationCounter } = useContext(PaginationCounterContext);

  const mandatoryFields = [from, to, entityType];
  const toastMs = getToastOnClose();

  useEffect(() => {
    if (projects.length === 0) {
      navigate("/");
    }
  }, [projects, navigate]);

  const sendRequest = async () => {
    let incorrectFill = checkRequiredInputs(
      mandatoryFields,
      "custom-auth",
      toastMs
    );
    if (!incorrectFill) {
      setPaginationCounter(0);
      if (from > to) {
        toastErrorPopUp("Time range is not correct!", "range-error", toastMs);
      } else {
        switch (entityType) {
          case "Environment variables":
            await getVGChanges();
            break;
          case "Secrets":
            await getSecretChanges();
            break;
          case "Key vault copies":
            await getKVCopyChanges();
            break;
          default:
            toastErrorPopUp(
              "Invalid record requesting!",
              "record_requesting",
              toastMs
            );
        }
      }
    }
  };

  const setCustomEntityType = (value) => {
    setChanges([]);
    setPaginationCounter(0);
    setEntityType(value);
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
      changeTypes: [0, 1, 2],
    };
    if (userName !== "") {
      body["user"] = userName;
    }
    await requestSecretChanges(body, setLoading, setChanges);
  };

  const getKVCopyChanges = async () => {
    let body = {
      from: from,
      to: to,
      limit: selectedLimit,
    };
    if (userName !== "") {
      body["user"] = userName;
    }
    await requestKVChanges(body, setLoading, setChanges);
  };
  return (
    <Stack paddingTop={2}>
      {keyVaults.length === 0 && (
        <Stack width="620px">
        <Alert variant="filled" severity="warning">
          To access secret and key vault copy changes, authenticate first in
          Secrets table type.
        </Alert>
        </Stack>
      )}
      <Stack className="form" gap={2}>
        <Stack direction="row" gap={2}>
          <MatUISelect
            collection={
              keyVaults.length > 0
                ? ["Environment variables", "Secrets", "Key vault copies"]
                : ["Environment variables"]
            }
            inputLabel={"Select entity type of modification"}
            id={"entityType"}
            selectValue={entityType}
            setSelectValue={setCustomEntityType}
            allOption={false}
            required={true}
          />
          {entityType === "Environment variables" && (
            <ProjectSelectMenu
              allOption={true}
              projectName={projectName}
              setProjectName={setProjectName}
            />
          )}
          {entityType === "Secrets" && (
            <KeyVaultSelectMenu
              id={"modifications"}
              inputLabel={"Select Azure vault"}
              keyVaults={keyVaults}
              keyVaultName={keyVaultName}
              setKeyVaultName={setKeyVaultName}
            />
          )}
        </Stack>
        <Stack direction="row" gap={2}>
          <CommonFormElements
            setUserName={setUserName}
            userName={userName}
            setSelectedLimit={setSelectedLimit}
            selectedLimit={selectedLimit}
            setFrom={setFrom}
            from={from}
            setTo={setTo}
            to={to}
          />
        </Stack>
        <Stack width="200px">
          <Button
            variant="contained"
            id="changes_search_button"
            onClick={sendRequest}
          >
            Search
          </Button>
        </Stack>
        <ToastContainer />
      </Stack>
    </Stack>
  );
};

ModificationsForm.propTypes = {
  entityType: PropTypes.string.isRequired,
  setEntityType: PropTypes.func.isRequired,
  setChanges: PropTypes.func.isRequired,
};
