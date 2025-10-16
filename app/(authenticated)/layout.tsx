import { Navbar } from "@/components/nabar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="px-4 my-4 mx-auto w-full max-w-5xl">{children}</main>
    </>
  );
}
