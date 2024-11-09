
import Nav from "@/components/note/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
