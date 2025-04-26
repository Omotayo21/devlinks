import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
 Navigate,
  useLocation,
  useNavigate
} from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Loader from "./components/Loader";
import Cookies from "js-cookie";
import {toast} from "react-hot-toast";
import { useUser } from "./context/userContext";


import Navbar from "./components/Navbar";


import VerifyEmailSucessfulPage from "./pages/successful";
import VerifyEmailPage from "./pages/verifyEmail";
import ForgotPasswordReset from "./pages/reset-password";
import ForgotPasswordMail from "./pages/forgotpassword";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));
const LoginPage = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Preview = lazy(() => import("./pages/Preview"));
// TypeScript props for PrivateRoute
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = Cookies.get("token");
  return token ?  <>{children}</> : <Navigate to ="/" /> 
};

const AppContent: React.FC = () => {
   const navigate = useNavigate();
const {refreshUserData} = useUser();
   useEffect(() => {
refreshUserData()
     const token = Cookies.get("token");
     if (!token) return;

     const expirationTimer = setTimeout(() => {
       Cookies.remove("token");
       navigate("/");
       toast.error("Your session expired, please login");
     }, 3 * 60 * 60 * 1000);

     return () => clearTimeout(expirationTimer);
   }, [navigate]);
  const location = useLocation();

  

  const showNavbarAndSidebar = [
    "/add-links",
    "/profile",
  
  
  ].includes(location.pathname);

  return (
    <div className="min-h-screen lg:bg-gray-200">
      {showNavbarAndSidebar && <Navbar />}
      <div style={{ display: "flex" }}>
        <main style={{ flex: 1, padding: showNavbarAndSidebar ? "1rem" : "0" }}>
          <Suspense
            fallback={
              <Loader />
            }
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/successful"
                element={<VerifyEmailSucessfulPage />}
              />
              <Route path="/verifyEmail" element={<VerifyEmailPage />} />
              <Route path="/resetpassword" element={<ForgotPasswordReset />} />
              <Route path="/forgotpassword" element={<ForgotPasswordMail />} />
              <Route
                path="/add-links"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/preview/:id"
                element={
               
                    <Preview />
               
                }
              />
            </Routes>
          </Suspense>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "#fff",
                color: "#0c0e16",
              },
            }}
          />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
