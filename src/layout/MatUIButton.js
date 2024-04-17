import { Box, Button } from '@mui/material'
import React from 'react'
import PropTypes from "prop-types";

const MatUIButton = ({id, send, displayName, disabled}) => {
  return (
    <Box>
        <Button id={id} onClick={send} variant="contained" disabled={disabled}>
          {displayName}
        </Button>
      </Box>
  )
}

MatUIButton.propTypes = {
  id: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
  displayName: PropTypes.any.isRequired,
  disabled: PropTypes.bool
};

export default MatUIButton