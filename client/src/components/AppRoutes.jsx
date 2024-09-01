import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import ExchangeRequests from "./Pages/ExchangeRequests.jsx";
import YourLibrary from "./Pages/YourLibrary.jsx";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "./NavBar";
import Auth from "./Pages/Auth.jsx";
import RecommendedBooks from "./Pages/RecommendedBooks.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth isRegistering={false} />} />
      <Route path="/register" element={<Auth isRegistering={true} />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <NavBar />
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exchange-requests"
        element={
          <ProtectedRoute>
            <NavBar />
            <ExchangeRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/RecommendedBooks"
        element={
          <ProtectedRoute>
            <NavBar />
            <RecommendedBooks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <NavBar />
            <YourLibrary />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;