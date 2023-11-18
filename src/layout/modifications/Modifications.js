import React from "react";
import { ModificationsForm } from "./Forms/ModificationsForm";
import { ModificationsTable } from "./Results/ModificationsTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Modifications = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        id="back_to_main"
        onClick={() => navigate("/")}
      >
        Back to main
      </Button>
      <ModificationsForm />
      <ModificationsTable />
    </>
  );
};
