import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Importing global styles
import GlobalStyles from "./styles/GlobalStyles";

// Importing page components
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import AppLayout from "./ui/AppLayout";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Checkin from "./pages/Checkin";
import Login from "./features/authentication/Login";
import Booking from "./features/bookings/Booking";
import ProtectedRoute from "./ui/ProtectedRoute";
import DarkModeContextProvider from "./context/darkModeContext";
import Account from "./features/users/Account";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DarkModeContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:bookingId" element={<Booking />} />
                <Route path="/users" element={<Users />} />
                <Route path="/checkin/:bookingId" element={<Checkin />} />
                <Route path="/account" element={<Account />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={8}
            containerStyle={{ margin: "8px", textAlign: "center" }}
            toastOptions={{
              success: {
                duration: 5000,
              },
              error: {
                duration: 3000,
              },
            }}
          />
        </DarkModeContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
