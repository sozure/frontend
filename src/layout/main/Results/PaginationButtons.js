import React, { useState, useEffect, useContext } from "react";
import { PaginationCounterContext } from "../../../contexts/Contexts";
import PagSpan from "./PagSpan";
import { Button } from "@mui/material";

const PaginationButtons = ({ collection }) => {
  const { paginationCounter, setPaginationCounter } = useContext(
    PaginationCounterContext
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [actualPageNumber, setActualPageNumber] = useState(1);

  const number = 10;

  useEffect(() => {
    let collectionLength = collection.length;
    setPageNumber(Math.ceil(collectionLength / number));
  }, [collection]);

  const increasePaginationCounter = () => {
    let helperPageNum = actualPageNumber + 1;
    setActualPageNumber(helperPageNum);
    let increasedPaginationCounter = paginationCounter + number;
    setPaginationCounter(increasedPaginationCounter);
  };

  const decreasedPaginationCounter = () => {
    let helperPageNum = actualPageNumber - 1;
    setActualPageNumber(helperPageNum);
    let increasedPaginationCounter =
      paginationCounter - number <= 0 ? 0 : paginationCounter - number;
    setPaginationCounter(increasedPaginationCounter);
  };

  return (
    <div className="pagination-btn-container">
      <div className="page-number">
        <PagSpan actualPageNumber={actualPageNumber} pageNumber={pageNumber} />
      </div>
      {collection.length <= 10 ? (
        <></>
      ) : (
        <div className="pagination-btns">
          <Button
            className={paginationCounter === 0 ? "previous" : "next"}
            disabled={paginationCounter === 0}
            onClick={decreasedPaginationCounter}
            variant="text"
          >
            Previous
          </Button>
          <Button
            className={
              paginationCounter + number >= collection.length
                ? "previous"
                : "next"
            }
            disabled={
              (paginationCounter + number >= collection.length) |
              (collection.length < 10)
            }
            onClick={increasePaginationCounter}
            variant="contained"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginationButtons;
