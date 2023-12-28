import React, { useContext } from "react";

import { Input } from "@mui/material";
import { SecretNameRegexContext } from "../../../../../contexts/Contexts";

const SecretRegexInput = () => {
  const { secretRegex, setSecretRegex } = useContext(SecretNameRegexContext);

  return (
    <>
      <Input
        fullWidth
        type="text"
        id="filter"
        name="filter"
        placeholder={"Secret name (regex)"}
        value={secretRegex}
        onChange={(event) => setSecretRegex(event.target.value)}
      />
      <br />
      <br />
    </>
  );
};

export default SecretRegexInput;
