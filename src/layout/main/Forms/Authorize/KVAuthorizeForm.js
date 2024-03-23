import React, { useContext, useEffect } from "react";
import KeyVaultBaseForm from "../KeyVault/BaseForms/KeyVaultBaseForm";
import { getProjects } from "../../../../services/ProjectService";
import { getProfile } from "../../../../services/ProfileService";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import {
  ClientIdContext,
  ClientSecretContext,
  DefaultSubscriptionContext,
  KVAuthorizedContext,
  KeyVaultsContext,
  LoadingContext,
  OrganizationContext,
  PATContext,
  ProfileNameContext,
  ProjectNameContext,
  ProjectsContext,
  SubscriptionsContext,
  TenantIdContext,
} from "../../../../contexts/Contexts";
import { checkRequiredInputs, getToastOnClose } from "../../../../services/CommonService";
import { sendListKeyVaultsRequest } from "../../../../services/SecretServices/SecretService";
import { CommonAuthorizeFormElements } from "./CommonAuthorizeFormElements";

const KVAuthorizeForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const { tenantId } = useContext(TenantIdContext);
  const { clientId } = useContext(ClientIdContext);
  const { clientSecret } = useContext(ClientSecretContext);
  const { keyVaults, setKeyVaults } = useContext(KeyVaultsContext);
  const { kvAuthorized, setKvAuthorized } = useContext(KVAuthorizedContext);
  const { organizationName } = useContext(OrganizationContext);
  const { pat } = useContext(PATContext);
  const { setProjects } = useContext(ProjectsContext);
  const { setProjectName } = useContext(ProjectNameContext);
  const { profileName, setProfileName } = useContext(ProfileNameContext);
  const { setSubscriptions } = useContext(SubscriptionsContext);
  const { setDefaultSubscription } = useContext(
    DefaultSubscriptionContext
  );

  const mandatoryFields = [tenantId, clientId, clientSecret];
  const toastMs = getToastOnClose();

  const auth = async () => {
    let incorrectFill = checkRequiredInputs(mandatoryFields, "getform", toastMs);
    if (!incorrectFill) {
      setLoading(true);
      await getProjects(
        organizationName,
        pat,
        setProjects,
        setProjectName,
        setSubscriptions,
        setLoading
      );
      await getProfile(organizationName, pat, setProfileName, setLoading);
      let message = {
        tenantId: tenantId,
        clientId: clientId,
        clientSecret: clientSecret,
        userName: profileName === "" ? "empty" : profileName,
      };
      await sendListKeyVaultsRequest(
        message,
        setKeyVaults,
        setDefaultSubscription,
        setLoading
      );
    }
  };

  useEffect(() => {
    if(!kvAuthorized && keyVaults.length > 0 && profileName !== ""){
      setKvAuthorized(true);
      setLoading(false);
    }
  }, [kvAuthorized, keyVaults, profileName, setKvAuthorized, setLoading]);

  return (
    <div className="form">
      <KeyVaultBaseForm />
      <CommonAuthorizeFormElements />
      <Button variant="contained" id="authorize_keyvault" onClick={auth}>
        Sign in
      </Button>
      <ToastContainer />
    </div>
  );
};

export default KVAuthorizeForm;
