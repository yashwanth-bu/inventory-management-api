import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import InventoryPage from "./pages/InventoryPage";
import DeletedInventoryPage from "./pages/DeletedInventoryPage";

function App() {
  return (
    <BrowserRouter>
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
        </aside>

        {/* Main Workspace */}
        <main className="
          flex-1
          m-6
          p-10
          overflow-y-auto
          bg-stone-50
          rounded-2xl
          text-slate-900
          shadow-inner
        ">
          <Routes>
            <Route path="/" element={<InventoryPage />} />
            <Route path="/deleted" element={<DeletedInventoryPage />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
