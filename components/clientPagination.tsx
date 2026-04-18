"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  total: number;
  limit: number;
  offset: number;
  onPageChange: ({ offset }: { offset: number }) => void;
  className?: string;
};
export default function ClientPagination(props: Props) {
  function getPagesTotal() {
    return Math.ceil(props.total / props.limit);
  }
  function getCurrentPageNumber() {
    return Math.floor(props.offset / props.limit);
  }

  function getOffsetForPage(page: number) {
    return page * props.limit;
  }

  return (
    <Pagination className={props.className}>
      <PaginationContent>
        {getCurrentPageNumber() > 0 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.onPageChange({
                  offset: getOffsetForPage(getCurrentPageNumber() - 1),
                });
              }}
            />
          </PaginationItem>
        )}

        {getCurrentPageNumber() < getPagesTotal() - 1 && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                props.onPageChange({
                  offset: getOffsetForPage(getCurrentPageNumber() + 1),
                });
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
