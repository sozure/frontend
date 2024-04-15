import "../../../CSS/style.css";
import React, { useContext, useEffect } from "react";

import {
  ActionTypeContext,
  TableTypeContext,
  VGAuthorizedContext,
  VariableKeyRegexContext,
  VariableValueRegexContext,
  VGNameRegexContext,
  VariableNewKeyContext,
  VariableNewValueContext,
  KVAuthorizedContext,
  KeyVaultsContext,
  ProjectsContext,
  SecretsContext,
  VariablesContext,
  VariablesSyncContext,
} from "../../../contexts/Contexts";

import KeyVaultGetForm from "./KeyVault/KeyVaultGetForm";
import VariableGroupGetForm from "./VariableGroup/VariableGroupGetForm";
import VariableGroupDeleteForm from "./VariableGroup/VariableGroupDeleteForm";
import VariableGroupAddForm from "./VariableGroup/VariableGroupAddForm";
import VariableGroupUpdateForm from "./VariableGroup/VariableGroupUpdateForm";
import KeyVaultDeleteForm from "./KeyVault/KeyVaultDeleteForm";
import VGAuthorizeForm from "./Authorize/VGAuthorizeForm";
import KVAuthorizeForm from "./Authorize/KVAuthorizeForm";
import KeyVaultCopyForm from "./KeyVault/KeyVaultCopyForm";
import MainSelects from "./MainSelects";
import KeyVaultRecoverForm from "./KeyVault/KeyVaultRecoverForm";
import AuthorizedSection from "./Authorize/AuthorizedSection";
import {
  getToastOnClose,
  toastErrorPopUp,
} from "../../../services/CommonService";
import SyncForm from "./Sync/SyncForm";
import BuildPipForm from "./BuildPip/BuildPipForm";
import TagAndBuildForm from "./Tag&Build/TagAndBuildForm";
import PRForm from "./PR/PRForm";
import CreatePRsForm from "./PR/CreatePRsForm";
import CreatePRForm from "./PR/CreatePRForm";

function Form() {
  const { actionType } = useContext(ActionTypeContext);
  const { tableType } = useContext(TableTypeContext);
  const { vgAuthorized } = useContext(VGAuthorizedContext);
  const { setKeyRegex } = useContext(VariableKeyRegexContext);
  const { setValueRegex } = useContext(VariableValueRegexContext);
  const { setVgRegex } = useContext(VGNameRegexContext);
  const { setNewKey } = useContext(VariableNewKeyContext);
  const { setNewValue } = useContext(VariableNewValueContext);
  const { kvAuthorized } = useContext(KVAuthorizedContext);
  const { keyVaults } = useContext(KeyVaultsContext);
  const { projects } = useContext(ProjectsContext);
  const { setSecrets } = useContext(SecretsContext);
  const { setVariables } = useContext(VariablesContext);
  const { setSyncVariables } = useContext(VariablesSyncContext);

  const toastMs = getToastOnClose();

  useEffect(() => {
    setKeyRegex("");
    setValueRegex("");
    setVgRegex("");
    setNewKey("");
    setNewValue("");
  }, [
    actionType,
    setKeyRegex,
    setValueRegex,
    setVgRegex,
    setNewKey,
    setNewValue,
  ]);

  useEffect(() => {
    setSecrets([]);
    setVariables([]);
    setSyncVariables([]);
  }, [actionType, tableType, setSecrets, setVariables, setSyncVariables]);

  const getKeyVaultForm = () => {
    if (!kvAuthorized || keyVaults.length === 0) {
      return <KVAuthorizeForm />;
    }
    switch (actionType) {
      case "List":
        return (
          <>
            <AuthorizedSection />
            <KeyVaultGetForm />
          </>
        );
      case "Copy":
        return (
          <>
            <AuthorizedSection />
            <KeyVaultCopyForm />
          </>
        );
      case "Delete":
        return (
          <>
            <AuthorizedSection />
            <KeyVaultDeleteForm />
          </>
        );
      default:
        return (
          <>
            <AuthorizedSection />
            <KeyVaultRecoverForm />
          </>
        );
    }
  };

  const getVGForm = () => {
    if (!vgAuthorized || projects.length === 0) {
      return <VGAuthorizeForm />;
    }
    switch (actionType) {
      case "List":
        return (
          <>
            <AuthorizedSection />
            <VariableGroupGetForm />
          </>
        );
      case "Add":
        return (
          <>
            <AuthorizedSection />
            <VariableGroupAddForm />
          </>
        );
      case "Delete":
        return (
          <>
            <AuthorizedSection />
            <VariableGroupDeleteForm />
          </>
        );
      default:
        return (
          <>
            <AuthorizedSection />
            <VariableGroupUpdateForm />
          </>
        );
    }
  };

  const getSyncForm = () => {
    if (!vgAuthorized || projects.length === 0) {
      return <VGAuthorizeForm />;
    }
    return (
      <>
        <AuthorizedSection />
        <SyncForm />
      </>
    );
  };

  const getPipelineForm = () => {
    if (!vgAuthorized || projects.length === 0) {
      return <VGAuthorizeForm />;
    }
    switch (actionType) {
      case "Build":
        return (
          <>
            <AuthorizedSection />
            <BuildPipForm />
          </>
        );
      case "Release":
        return <h1>New function is about to come :D</h1>;
      default:
        return <></>;
    }
  };

  const getTagAndBuildForm = () => {
    if (!vgAuthorized || projects.length === 0) {
      return <VGAuthorizeForm />;
    }
    return (
      <>
        <AuthorizedSection />
        <TagAndBuildForm />
      </>
    );
  };

  const getPRForm = () => {
    if (!vgAuthorized || projects.length === 0) {
      return <VGAuthorizeForm />;
    }

    switch (actionType) {
      case "List":
        return (
          <>
            <AuthorizedSection />
            <PRForm />
          </>
        );
      case "CreateMultiple":
        return (
          <>
            <AuthorizedSection />
            <CreatePRsForm />
          </>
        );
      case "Create":
        return(
          <>
            <AuthorizedSection />
            <CreatePRForm />
          </>
        );
      default:
        return <></>;
    }
  };

  const getForm = () => {
    if (tableType === "Sync configurations" || actionType !== "") {
      switch (tableType) {
        case "Secrets":
          return getKeyVaultForm();
        case "Variable Groups":
          return getVGForm();
        case "Sync configurations":
          return getSyncForm();
        case "Run pipelines":
          return getPipelineForm();
        case "Tags":
          return getTagAndBuildForm();
        case "Pull requests":
          return getPRForm();
        default:
          toastErrorPopUp("Invalid tableType value!", "table-type", toastMs);
      }
    }
  };

  return (
    <div>
      <MainSelects />
      {getForm()}
    </div>
  );
}

export default Form;
