/* eslint-disable react/prop-types */

import React from 'react'

const PagSpan = ({actualPageNumber, pageNumber}) => {
  return (
    <div>
        <span>{`Page: ${actualPageNumber}/${pageNumber}`}</span>
    </div>
  )
}

export default PagSpan