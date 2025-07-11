"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useSearchParams, usePathname } from "next/navigation";

type Props = {
  total: number;
  limit: number;
  offset: number;
  className?: string;
};
export default function ServerPagination(props: Props) {
  const pageSpan = 2;

  const searchParams = useSearchParams();
  const pathName = usePathname();

  function getPagesTotal() {
    return Math.ceil(props.total / props.limit);
  }
  function getCurrentPageNumber() {
    return Math.floor((props.offset / props.total) * getPagesTotal());
  }

  function getOffsetForPage(page: number) {
    return page * props.limit;
  }

  function getPageHref(page: number) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("offset", getOffsetForPage(page).toString());
    return `${pathName}?${newSearchParams.toString()}`;
  }

  function getShownPages() {
    return [...Array(1 + 2 * pageSpan).keys()]
      .map((p) => p - pageSpan + getCurrentPageNumber())
      .filter((p) => p > -1 && p < getPagesTotal());
  }

  return (
    <Pagination className={props.className}>
      <PaginationContent>
        {getCurrentPageNumber() > 0 && (
          <PaginationItem>
            <PaginationPrevious
              href={getPageHref(getCurrentPageNumber() - 1)}
            />
          </PaginationItem>
        )}

        {/* TODO: why the assymetry? */}
        {getCurrentPageNumber() > pageSpan && (
          <PaginationItem>
            <PaginationLink href={getPageHref(0)}>{1}</PaginationLink>
          </PaginationItem>
        )}

        {getCurrentPageNumber() > pageSpan + 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {getShownPages().map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href={getPageHref(p)}
              isActive={p === getCurrentPageNumber()}
            >
              {p + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {getCurrentPageNumber() < getPagesTotal() - pageSpan - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {getCurrentPageNumber() < getPagesTotal() - pageSpan - 1 && (
          <PaginationItem>
            <PaginationLink href={getPageHref(getPagesTotal() - 1)}>
              {getPagesTotal()}
            </PaginationLink>
          </PaginationItem>
        )}

        {getCurrentPageNumber() < getPagesTotal() && (
          <PaginationItem>
            <PaginationNext href={getPageHref(getCurrentPageNumber() + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
