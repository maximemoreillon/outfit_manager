"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const pathnameSplit = pathname.split("/");
  pathnameSplit.shift();
  const pathnameLast = pathnameSplit.pop();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnameSplit.map((p, i) => (
          <React.Fragment key={i}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${pathnameSplit.slice(0, i + 1).join("/")}`}>
                  {p}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}

        {pathnameLast && (
          <>
            {pathnameSplit.length > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbPage>{pathnameLast}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
