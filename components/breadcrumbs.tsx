"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const pathnameSplit = pathname.split("/");
  pathnameSplit.shift();
  const pathnameLast = pathnameSplit.pop();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathnameSplit.map((p, i) => (
          <>
            <BreadcrumbSeparator key={`${i}-sep`} />
            <BreadcrumbItem key={`${i}-link`}>
              <BreadcrumbLink
                href={`/${pathnameSplit.slice(0, i + 1).join("/")}`}
              >
                {p}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{pathnameLast}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
