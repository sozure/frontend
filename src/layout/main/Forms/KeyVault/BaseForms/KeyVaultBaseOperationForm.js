import PropTypes from "prop-types";
import React from "react";

import { Button, Box } from "@mui/material";
import KeyVaultSelect from "./KeyVaultSelect";
import SecretRegexInput from "./SecretRegexInput";

const KeyVaultBaseOperationForm = ({ send }) => {

  return (
    <div className="form">
      <KeyVaultSelect />
      <SecretRegexInput />

      <Box>
        <Button id="submit_button" onClick={send} variant="contained">
          Send request
        </Button>
      </Box>
    </div>
  );
};

KeyVaultBaseOperationForm.propTypes = {
  send: PropTypes.func.isRequired,
};

export default KeyVaultBaseOperationForm;
