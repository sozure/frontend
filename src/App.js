import "./CSS/style.css";
import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./layout/main/Main";
import {
  ActionTypeContext,
  VariableKeyRegexContext,
  KeyVaultNameContext,
  LoadingContext,
  MessageContext,
  OnAddContext,
  OnDeleteContext,
  OnUpdateContext,
  OrganizationContext,
  PATContext,
  ProjectNameContext,
  ProjectsContext,
  SecretsContext,
  SecretNameRegexContext,
  TableTypeContext,
  VGAuthorizedContext,
  VGNameRegexContext,
  VariableValueRegexContext,
  VariablesContext,
  VariableNewKeyContext,
  VariableNewValueContext,
  TenantIdContext,
  ClientIdContext,
  ClientSecretContext,
  PaginationCounterContext,
  OnRecoverContext,
  SingleModificationContext,
  SingleOperationContext,
  LocalLoadingContext,
  VariableKeyIsRegexContext,
  VariableGroupsContext,
  ProfileNameContext,
  KeyVaultsContext,
  KVAuthorizedContext,
  SubscriptionsContext,
  DefaultSubscriptionContext,
  VariablesSyncContext,
  ContainingVGsContext,
  ContainingVGsProjectContext,
  PipelineConnectedVGsContext,
  EnvironmentsContext,
  ConfigFileExtensionContext,
} from "./contexts/Contexts";
import { Modifications } from "./layout/modifications/Modifications";
import Welcome from "./layout/main/Welcome";

function App() {
  let envTenantId =
    process.env.REACT_APP_TENANT_ID === undefined ||
    process.env.REACT_APP_TENANT_ID === ""
      ? ""
      : process.env.REACT_APP_TENANT_ID;

  let envClientId =
    process.env.REACT_APP_CLIENT_ID === undefined ||
    process.env.REACT_APP_CLIENT_ID === ""
      ? ""
      : process.env.REACT_APP_CLIENT_ID;

  let envClientSecret =
    process.env.REACT_APP_CLIENT_SECRET === undefined ||
    process.env.REACT_APP_CLIENT_SECRET === ""
      ? ""
      : process.env.REACT_APP_CLIENT_SECRET;

  let envPAT =
    process.env.REACT_APP_PAT === undefined || process.env.REACT_APP_PAT === ""
      ? ""
      : process.env.REACT_APP_PAT;

  let envOrg =
    process.env.REACT_APP_ORGANIZATION === undefined ||
    process.env.REACT_APP_ORGANIZATION === ""
      ? ""
      : process.env.REACT_APP_ORGANIZATION;

  const [keyVaultName, setKeyVaultName] = useState("");
  const [actionType, setActionType] = useState("List");
  const [tableType, setTableType] = useState("KV");
  const [pat, setPat] = useState(envPAT);
  const [projectName, setProjectName] = useState("");
  const [containingVGsProject, setContainingVGsProject] = useState("");
  const [organizationName, setOrganizationName] = useState(envOrg);
  const [valueRegex, setValueRegex] = useState("");
  const [vgRegex, setVgRegex] = useState("");
  const [secretRegex, setSecretRegex] = useState("");
  const [keyRegex, setKeyRegex] = useState("");
  const [variables, setVariables] = useState([]);
  const [variableGroups, setVariableGroups] = useState([]);
  const [secrets, setSecrets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const [onRecover, setOnRecover] = useState(false);
  const [keyIsRegex, setKeyIsRegex] = useState(false);
  const [message, setMessage] = useState({});
  const [projects, setProjects] = useState([]);
  const [keyVaults, setKeyVaults] = useState([]);
  const [pipelineConnectedVGs, setPipelineConnectedVGs] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [containingVGs, setContainingVGs] = useState([]);
  const [vgAuthorized, setVgAuthorized] = useState(false);
  const [kvAuthorized, setKvAuthorized] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [defaultSubscription, setDefaultSubscription] = useState("");
  const [newValue, setNewValue] = useState("");
  const [configFileExtension, setConfigFileExtension] = useState("");
  const [tenantId, setTenantId] = useState(envTenantId);
  const [clientId, setClientId] = useState(envClientId);
  const [clientSecret, setClientSecret] = useState(envClientSecret);
  const [paginationCounter, setPaginationCounter] = useState(0);
  const [profileName, setProfileName] = useState("");
  const [syncVariables, setSyncVariables] = useState([]);
  const [environments, setEnvironments] = useState([]);
  const [onSingleModification, setOnSingleModification] = useState({
    row: -1,
    operation: "",
    modification: false,
  });

  const [singleOperation, setSingleOperation] = useState({
    row: -1,
    modificationHappened: false,
    success: false,
    response: "",
    operation: "",
  });

  const [localLoading, setLocalLoading] = useState({ loading: false, row: -1 });

  return (
    <KeyVaultNameContext.Provider
      value={useMemo(
        () => ({ keyVaultName, setKeyVaultName }),
        [keyVaultName, setKeyVaultName]
      )}
    >
      <ActionTypeContext.Provider
        value={useMemo(
          () => ({ actionType, setActionType }),
          [actionType, setActionType]
        )}
      >
        <TableTypeContext.Provider
          value={useMemo(
            () => ({ tableType, setTableType }),
            [tableType, setTableType]
          )}
        >
          <PATContext.Provider
            value={useMemo(() => ({ pat, setPat }), [pat, setPat])}
          >
            <ProjectNameContext.Provider
              value={useMemo(
                () => ({ projectName, setProjectName }),
                [projectName, setProjectName]
              )}
            >
              <VariableValueRegexContext.Provider
                value={useMemo(
                  () => ({ valueRegex, setValueRegex }),
                  [valueRegex, setValueRegex]
                )}
              >
                <VGNameRegexContext.Provider
                  value={useMemo(
                    () => ({ vgRegex, setVgRegex }),
                    [vgRegex, setVgRegex]
                  )}
                >
                  <SecretNameRegexContext.Provider
                    value={useMemo(
                      () => ({ secretRegex, setSecretRegex }),
                      [secretRegex, setSecretRegex]
                    )}
                  >
                    <VariableKeyRegexContext.Provider
                      value={useMemo(
                        () => ({ keyRegex, setKeyRegex }),
                        [keyRegex, setKeyRegex]
                      )}
                    >
                      <VariablesContext.Provider
                        value={useMemo(
                          () => ({ variables, setVariables }),
                          [variables, setVariables]
                        )}
                      >
                        <LoadingContext.Provider
                          value={useMemo(
                            () => ({ loading, setLoading }),
                            [loading, setLoading]
                          )}
                        >
                          <OnUpdateContext.Provider
                            value={useMemo(
                              () => ({ onUpdate, setOnUpdate }),
                              [onUpdate, setOnUpdate]
                            )}
                          >
                            <OnAddContext.Provider
                              value={useMemo(
                                () => ({ onAdd, setOnAdd }),
                                [onAdd, setOnAdd]
                              )}
                            >
                              <OnDeleteContext.Provider
                                value={useMemo(
                                  () => ({ onDelete, setOnDelete }),
                                  [onDelete, setOnDelete]
                                )}
                              >
                                <SecretsContext.Provider
                                  value={useMemo(
                                    () => ({ secrets, setSecrets }),
                                    [secrets, setSecrets]
                                  )}
                                >
                                  <MessageContext.Provider
                                    value={useMemo(
                                      () => ({ message, setMessage }),
                                      [message, setMessage]
                                    )}
                                  >
                                    <OrganizationContext.Provider
                                      value={useMemo(
                                        () => ({
                                          organizationName,
                                          setOrganizationName,
                                        }),
                                        [organizationName, setOrganizationName]
                                      )}
                                    >
                                      <ProjectsContext.Provider
                                        value={useMemo(
                                          () => ({ projects, setProjects }),
                                          [projects, setProjects]
                                        )}
                                      >
                                        <VGAuthorizedContext.Provider
                                          value={useMemo(
                                            () => ({
                                              vgAuthorized,
                                              setVgAuthorized,
                                            }),
                                            [vgAuthorized, setVgAuthorized]
                                          )}
                                        >
                                          <VariableNewKeyContext.Provider
                                            value={useMemo(
                                              () => ({ newKey, setNewKey }),
                                              [newKey, setNewKey]
                                            )}
                                          >
                                            <VariableNewValueContext.Provider
                                              value={useMemo(
                                                () => ({
                                                  newValue,
                                                  setNewValue,
                                                }),
                                                [newValue, setNewValue]
                                              )}
                                            >
                                              <TenantIdContext.Provider
                                                value={useMemo(
                                                  () => ({
                                                    tenantId,
                                                    setTenantId,
                                                  }),
                                                  [tenantId, setTenantId]
                                                )}
                                              >
                                                <ClientIdContext.Provider
                                                  value={useMemo(
                                                    () => ({
                                                      clientId,
                                                      setClientId,
                                                    }),
                                                    [clientId, setClientId]
                                                  )}
                                                >
                                                  <ClientSecretContext.Provider
                                                    value={useMemo(
                                                      () => ({
                                                        clientSecret,
                                                        setClientSecret,
                                                      }),
                                                      [
                                                        clientSecret,
                                                        setClientSecret,
                                                      ]
                                                    )}
                                                  >
                                                    <PaginationCounterContext.Provider
                                                      value={useMemo(
                                                        () => ({
                                                          paginationCounter,
                                                          setPaginationCounter,
                                                        }),
                                                        [
                                                          paginationCounter,
                                                          setPaginationCounter,
                                                        ]
                                                      )}
                                                    >
                                                      <OnRecoverContext.Provider
                                                        value={useMemo(
                                                          () => ({
                                                            onRecover,
                                                            setOnRecover,
                                                          }),
                                                          [
                                                            onRecover,
                                                            setOnRecover,
                                                          ]
                                                        )}
                                                      >
                                                        <SingleModificationContext.Provider
                                                          value={useMemo(
                                                            () => ({
                                                              onSingleModification,
                                                              setOnSingleModification,
                                                            }),
                                                            [
                                                              onSingleModification,
                                                              setOnSingleModification,
                                                            ]
                                                          )}
                                                        >
                                                          <SingleOperationContext.Provider
                                                            value={useMemo(
                                                              () => ({
                                                                singleOperation,
                                                                setSingleOperation,
                                                              }),
                                                              [
                                                                singleOperation,
                                                                setSingleOperation,
                                                              ]
                                                            )}
                                                          >
                                                            <LocalLoadingContext.Provider
                                                              value={useMemo(
                                                                () => ({
                                                                  localLoading,
                                                                  setLocalLoading,
                                                                }),
                                                                [
                                                                  localLoading,
                                                                  setLocalLoading,
                                                                ]
                                                              )}
                                                            >
                                                              <VariableKeyIsRegexContext.Provider
                                                                value={useMemo(
                                                                  () => ({
                                                                    keyIsRegex,
                                                                    setKeyIsRegex,
                                                                  }),
                                                                  [
                                                                    keyIsRegex,
                                                                    setKeyIsRegex,
                                                                  ]
                                                                )}
                                                              >
                                                                <VariableGroupsContext.Provider
                                                                  value={useMemo(
                                                                    () => ({
                                                                      variableGroups,
                                                                      setVariableGroups,
                                                                    }),
                                                                    [
                                                                      variableGroups,
                                                                      setVariableGroups,
                                                                    ]
                                                                  )}
                                                                >
                                                                  <ProfileNameContext.Provider
                                                                    value={useMemo(
                                                                      () => ({
                                                                        profileName,
                                                                        setProfileName,
                                                                      }),
                                                                      [
                                                                        profileName,
                                                                        setProfileName,
                                                                      ]
                                                                    )}
                                                                  >
                                                                    <KeyVaultsContext.Provider
                                                                      value={useMemo(
                                                                        () => ({
                                                                          keyVaults,
                                                                          setKeyVaults,
                                                                        }),
                                                                        [
                                                                          keyVaults,
                                                                          setKeyVaults,
                                                                        ]
                                                                      )}
                                                                    >
                                                                      <KVAuthorizedContext.Provider
                                                                        value={useMemo(
                                                                          () => ({
                                                                            kvAuthorized,
                                                                            setKvAuthorized,
                                                                          }),
                                                                          [
                                                                            kvAuthorized,
                                                                            setKvAuthorized,
                                                                          ]
                                                                        )}
                                                                      >
                                                                        <SubscriptionsContext.Provider
                                                                          value={useMemo(
                                                                            () => ({
                                                                              subscriptions,
                                                                              setSubscriptions,
                                                                            }),
                                                                            [
                                                                              subscriptions,
                                                                              setSubscriptions,
                                                                            ]
                                                                          )}
                                                                        >
                                                                          <DefaultSubscriptionContext.Provider
                                                                            value={useMemo(
                                                                              () => ({
                                                                                defaultSubscription,
                                                                                setDefaultSubscription,
                                                                              }),
                                                                              [
                                                                                defaultSubscription,
                                                                                setDefaultSubscription,
                                                                              ]
                                                                            )}
                                                                          >
                                                                            <VariablesSyncContext.Provider
                                                                              value={useMemo(
                                                                                () => ({
                                                                                  syncVariables,
                                                                                  setSyncVariables,
                                                                                }),
                                                                                [
                                                                                  syncVariables,
                                                                                  setSyncVariables,
                                                                                ]
                                                                              )}
                                                                            >
                                                                              <ContainingVGsContext.Provider
                                                                                value={useMemo(
                                                                                  () => ({
                                                                                    containingVGs,
                                                                                    setContainingVGs,
                                                                                  }),
                                                                                  [
                                                                                    containingVGs,
                                                                                    setContainingVGs,
                                                                                  ]
                                                                                )}
                                                                              >
                                                                                <ContainingVGsProjectContext.Provider
                                                                                  value={useMemo(
                                                                                    () => ({
                                                                                      containingVGsProject,
                                                                                      setContainingVGsProject,
                                                                                    }),
                                                                                    [
                                                                                      containingVGsProject,
                                                                                      setContainingVGsProject,
                                                                                    ]
                                                                                  )}
                                                                                >
                                                                                  <PipelineConnectedVGsContext.Provider
                                                                                    value={useMemo(
                                                                                      () => ({
                                                                                        pipelineConnectedVGs,
                                                                                        setPipelineConnectedVGs,
                                                                                      }),
                                                                                      [
                                                                                        pipelineConnectedVGs,
                                                                                        setPipelineConnectedVGs,
                                                                                      ]
                                                                                    )}
                                                                                  >
                                                                                    <EnvironmentsContext.Provider
                                                                                      value={useMemo(
                                                                                        () => ({
                                                                                          environments,
                                                                                          setEnvironments,
                                                                                        }),
                                                                                        [
                                                                                          environments,
                                                                                          setEnvironments,
                                                                                        ]
                                                                                      )}
                                                                                    >
                                                                                      <ConfigFileExtensionContext.Provider
                                                                                        value={useMemo(
                                                                                          () => ({
                                                                                            configFileExtension,
                                                                                            setConfigFileExtension,
                                                                                          }),
                                                                                          [
                                                                                            configFileExtension,
                                                                                            setConfigFileExtension,
                                                                                          ]
                                                                                        )}
                                                                                      >
                                                                                        <Welcome />
                                                                                        <BrowserRouter>
                                                                                          <Routes>
                                                                                            <Route
                                                                                              path="/"
                                                                                              element={
                                                                                                <Main />
                                                                                              }
                                                                                            />
                                                                                            <Route
                                                                                              path="/changes"
                                                                                              element={
                                                                                                <Modifications />
                                                                                              }
                                                                                            />
                                                                                          </Routes>
                                                                                        </BrowserRouter>
                                                                                      </ConfigFileExtensionContext.Provider>
                                                                                    </EnvironmentsContext.Provider>
                                                                                  </PipelineConnectedVGsContext.Provider>
                                                                                </ContainingVGsProjectContext.Provider>
                                                                              </ContainingVGsContext.Provider>
                                                                            </VariablesSyncContext.Provider>
                                                                          </DefaultSubscriptionContext.Provider>
                                                                        </SubscriptionsContext.Provider>
                                                                      </KVAuthorizedContext.Provider>
                                                                    </KeyVaultsContext.Provider>
                                                                  </ProfileNameContext.Provider>
                                                                </VariableGroupsContext.Provider>
                                                              </VariableKeyIsRegexContext.Provider>
                                                            </LocalLoadingContext.Provider>
                                                          </SingleOperationContext.Provider>
                                                        </SingleModificationContext.Provider>
                                                      </OnRecoverContext.Provider>
                                                    </PaginationCounterContext.Provider>
                                                  </ClientSecretContext.Provider>
                                                </ClientIdContext.Provider>
                                              </TenantIdContext.Provider>
                                            </VariableNewValueContext.Provider>
                                          </VariableNewKeyContext.Provider>
                                        </VGAuthorizedContext.Provider>
                                      </ProjectsContext.Provider>
                                    </OrganizationContext.Provider>
                                  </MessageContext.Provider>
                                </SecretsContext.Provider>
                              </OnDeleteContext.Provider>
                            </OnAddContext.Provider>
                          </OnUpdateContext.Provider>
                        </LoadingContext.Provider>
                      </VariablesContext.Provider>
                    </VariableKeyRegexContext.Provider>
                  </SecretNameRegexContext.Provider>
                </VGNameRegexContext.Provider>
              </VariableValueRegexContext.Provider>
            </ProjectNameContext.Provider>
          </PATContext.Provider>
        </TableTypeContext.Provider>
      </ActionTypeContext.Provider>
    </KeyVaultNameContext.Provider>
  );
}

export default App;
