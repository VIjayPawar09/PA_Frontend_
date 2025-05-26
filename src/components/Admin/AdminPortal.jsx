import { useState } from "react";
import LoginPage from './LoginPage'
import Dashboard from './DashBoard'


export default function AdminPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoggedIn ? (
        <LoginPage onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onLogout={() => setIsLoggedIn(false)}
        />
      )}
    </div>
  );
}
