import React from "react";
import { ModificationsForm } from "./Forms/ModificationsForm";
import { ModificationsTable } from "./Results/ModificationsTable";

export const Modifications = () => {
  return (
    <>
      <ModificationsForm />
      <ModificationsTable/>
    </>
  );
};
