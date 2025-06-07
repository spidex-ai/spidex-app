"use client";

import React from "react";
import ReactPaginate from "react-paginate";
interface Props {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}

const PaginationWrapper: React.FC<Props> = ({ total, current, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={total}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={(event) => onPageChange(event.selected)}
      forcePage={current}
      renderOnZeroPageCount={() => null}
      nextLabel=">"
      previousLabel="<"
      containerClassName="flex items-center space-x-2 justify-end"
      pageClassName="px-3 py-1 border border-border-main rounded"
      activeClassName="gradient-border-pagination text-[#009EFF]"
      previousClassName="px-2 py-1"
      nextClassName="px-2 py-1"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};

export default PaginationWrapper;
