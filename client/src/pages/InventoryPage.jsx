import { useEffect, useState } from "react";
import { getAllInventory } from "../api/inventoryApi";
import InventoryTable from "../components/InventoryTable";
import AddInventoryForm from "../components/AddInventoryForm";

export default function InventoryPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce typing
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const loadData = async (nameParam) => {
    try {
      setLoading(true);
      const res = await getAllInventory(
        nameParam ? { name: nameParam } : undefined
      );
      setItems(res.data.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  // run when debounced search changes
  useEffect(() => {
    loadData(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="space-y-8">

      {/* Toolbar */}
      <div className="
        bg-slate-900 border border-slate-800
        rounded-xl p-5
        flex items-center justify-between
        shadow-lg
      ">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Inventory Workspace
          </h1>
          <p className="text-slate-400 text-sm">
            {items.length} active records
          </p>
        </div>

        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inventory..."
              className="
                bg-slate-800 border border-slate-700
                text-white placeholder-slate-400
                pl-4 pr-10 py-2
                rounded-lg
                outline-none focus:border-blue-500
                w-64
              "
            />

            <button
              onClick={() => loadData(search.trim())}
              className="
                absolute right-2 top-1/2 -translate-y-1/2
                text-slate-400 hover:text-white
              "
            >
              🔍
            </button>
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="
              bg-blue-600 hover:bg-blue-700
              text-white px-5 py-2
              rounded-lg
            "
          >
            + New
          </button>

        </div>
      </div>

      {/* Loading indicator (non-blocking) */}
      {loading && (
        <div className="text-slate-400 text-sm px-2">
          Searching…
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-500 px-2">
          {error}
        </div>
      )}

      {/* Empty search result message */}
      {!loading && items.length === 0 && debouncedSearch && (
        <div className="
          bg-slate-800 border border-slate-700
          text-slate-300
          p-6 rounded-xl
        ">
          No results found for "<b>{debouncedSearch}</b>"
        </div>
      )}

      {/* Table */}
      {items.length > 0 && (
        <div className="
          bg-slate-900 border border-slate-800
          rounded-xl p-4 shadow-lg
        ">
          <InventoryTable items={items} onDeleted={() => loadData(debouncedSearch)} />
        </div>
      )}

      {/* Modal */}
      <AddInventoryForm
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={() => loadData(debouncedSearch)}
      />

    </div>
  );
}
