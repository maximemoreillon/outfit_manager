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

  console.log({ pathnameLast });

  // TODO: get route
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {/* TODO: add intermediate pages here */}
        {pathnameSplit.map((p, i) => (
          // PROBLEM: this div braks everything!
          <>
            <BreadcrumbSeparator key={`${p}-sep`} />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${pathnameSplit.slice(0, i + 1).join("/")}`}
                key={p}
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
