import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { Button } from "@mui/material";

import {
  KeyVaultNameContext,
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
import { VGModificationsForm } from "./VGModificationsForm";
import { SecretModificationsForm } from "./SecretModificationsForm";
import CommonFormElements from "./CommonFormElements";
import MatUISelect from "../../MatUiSelect";

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
  const { organizationName } = useContext(OrganizationContext);
  const { projects } = useContext(ProjectsContext);
  const { setLoading } = useContext(LoadingContext);
  const { projectName, setProjectName } = useContext(ProjectNameContext);
  const { keyVaultName } = useContext(KeyVaultNameContext);
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

  const getSpecificForm = () => {
    switch (entityType) {
      case "Environment variables":
        return (
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
        );
      case "Secrets":
        return (
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
        );
      case "Key vault copies":
        return (
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
        );
      default:
        toastErrorPopUp(
          "Invalid record requesting!",
          "record_requesting",
          toastMs
        );
    }
  };

  return (
    <div className="form">
      <MatUISelect
        collection={["Environment variables", "Secrets", "Key vault copies"]}
        inputLabel={"Select entity type of modification"}
        id={"entityType"}
        selectValue={entityType}
        setSelectValue={setCustomEntityType}
        allOption={false}
      />
      {getSpecificForm()}

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

ModificationsForm.propTypes = {
  entityType: PropTypes.string.isRequired,
  setEntityType: PropTypes.func.isRequired,
  setChanges: PropTypes.func.isRequired,
};
