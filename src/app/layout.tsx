import { ClientAuthContext } from "~/context/ClientAuthContext";
import { ThemeProvider } from "~/context/ThemeContext";
import "~/styles/globals.css";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background-light-gray text-primary-dark-gray transition-colors dark:bg-primary-dark-gray  dark:text-background-light-gray">
        <ClientAuthContext>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ClientAuthContext>
      </body>
    </html>
  );
}
