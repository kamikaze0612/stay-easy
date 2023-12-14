import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";

/* Importing page components */
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import AppLayout from "./ui/AppLayout";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";

const App: React.FC = () => {
  return (
    <>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="settings" element={<Settings />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </>
  );
};

export default App;
