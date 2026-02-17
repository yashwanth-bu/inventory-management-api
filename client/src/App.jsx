import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import InventoryPage from "./pages/InventoryPage";
import DeletedInventoryPage from "./pages/DeletedInventoryPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />

        {/* Protected Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen flex bg-slate-950 text-slate-100">

                {/* Sidebar */}
                <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 space-y-6">
                  <h1 className="text-xl font-bold tracking-wide">
                    📦 Inventory Console
                  </h1>

                  <nav className="flex flex-col gap-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `px-4 py-2 rounded transition ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 hover:bg-slate-700"
                        }`
                      }
                    >
                      Active Inventories
                    </NavLink>

                    <NavLink
                      to="/deleted"
                      className={({ isActive }) =>
                        `px-4 py-2 rounded transition ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 hover:bg-slate-700"
                        }`
                      }
                    >
                      Deleted
                    </NavLink>
                  </nav>

                  {/* Logout Button */}
                  <button
                    onClick={logout}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Logout
                  </button>
                </aside>

                {/* Main Workspace */}
                <main className="flex-1 m-6 p-10 overflow-y-auto bg-stone-50 rounded-2xl text-slate-900 shadow-inner">
                  <Routes>
                    <Route path="/" element={<InventoryPage />} />
                    <Route path="/deleted" element={<DeletedInventoryPage />} />
                  </Routes>
                </main>

              </div>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
