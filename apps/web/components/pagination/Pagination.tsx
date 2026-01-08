import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination() {
  return (
    <ReactPaginate
      pageCount={12}
      pageRangeDisplayed={3}
      marginPagesDisplayed={0}
      previousLabel={<ChevronLeftIcon size={20} />}
      nextLabel={<ChevronRightIcon size={20} />}
      breakLabel=""
      containerClassName="flex items-center justify-center gap-2"
      pageClassName="rounded-lg"
      pageLinkClassName="cursor-pointer p-2 rounded-lg transition hover:bg-gray-200 text-sm"
      previousClassName="rounded-lg"
      previousLinkClassName="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition flex items-center justify-center"
      nextClassName="rounded-lg"
      nextLinkClassName="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition flex items-center justify-center"
      breakClassName="p-2"
      activeClassName="bg-primary"
      activeLinkClassName="!bg-primary !text-white !border-primary text-sm"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
}
