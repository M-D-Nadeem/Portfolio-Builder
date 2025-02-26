import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PortfolioLanding from "./pages/landingPage.jsx"
// Assuming you might have other components like a Navbar here
function App() {
  return (
    <AuthProvider>
      {/* Your app layout, navbar, etc. would go here */}
        {/* <PortfolioLanding /> */}
        <Outlet />
    </AuthProvider>
  );
}

export default App;