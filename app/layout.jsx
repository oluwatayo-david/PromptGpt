import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import ToastNotification from "@/components/NotificationContainer";

export const metadata = {
  title: "Promptgpt",
  description: "Discover & Share AI Prompts",
};

export const fetchCache = 'force-no-store';


const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
        <Provider>
        <ToastNotification />
      <div className="main">
        <div className="gradient" />
      </div>

      <main className="app">
        <Nav />
        {children}
      </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
