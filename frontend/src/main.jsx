import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import { SignIn, SignUp } from "./components/Auth.jsx";
import "./index.css";
import InputForm from "./pages/InputPage.jsx";
import PortfolioPreview from "./portfolio/indexPreview.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import PortfolioLanding from "./pages/landingPage.jsx";
import ExamplePortfoliosPage from "./pages/ExamplePortfolios.jsx";
import PortfolioMain from "./portfolio/index.jsx";

// We need to modify our approach because AuthProvider uses useNavigate which
// must be used inside a Router context
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<PortfolioLanding />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="previewProfile/:id" element={<PortfolioPreview />} />
      <Route path="inputForm" element={<InputForm />} />
      <Route path="examplePortfolio" element={<ExamplePortfoliosPage />} />
      <Route path="/:name/:id" element={<PortfolioMain />} />

    </Route>
  )
);

// Create a wrapper component that will provide the AuthProvider
const AppWithProviders = () => {
  return (
    <React.StrictMode>

<ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <RouterProvider router={router}>
        {/* ✅ AuthProvider is now inside RouterProvider to access useNavigate */}
        <AuthProvider>
          <App />
        </AuthProvider>
      </RouterProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<AppWithProviders />);