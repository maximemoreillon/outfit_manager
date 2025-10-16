export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="px-4 my-4 mx-auto w-full max-w-5xl">{children}</main>;
}
