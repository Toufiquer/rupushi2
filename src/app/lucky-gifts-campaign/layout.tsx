export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full min-h-screen bg-slate-900">{children}</div>;
}
