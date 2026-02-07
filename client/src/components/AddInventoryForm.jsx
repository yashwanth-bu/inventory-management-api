import { useState } from "react";
import { createInventory } from "../api/inventoryApi";
import toast from "react-hot-toast";

export default function AddInventoryForm({ open, onClose, onCreated }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await createInventory({ name });

      toast.success("Inventory created");
      setName("");
      onCreated();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      fixed inset-0
      bg-black/60
      flex items-center justify-center
      z-50
    ">
      <div className="
        bg-slate-900
        border border-slate-800
        rounded-xl
        p-6
        w-full max-w-md
        shadow-2xl
      ">
        <h2 className="text-xl font-semibold text-white mb-4">
          Create Inventory
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Inventory name"
            className="
              w-full
              bg-slate-800 border border-slate-700
              text-white placeholder-slate-400
              p-3 rounded-lg
              outline-none focus:border-blue-500
            "
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="
                px-4 py-2
                bg-slate-700 hover:bg-slate-600
                text-white rounded-lg
              "
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="
                bg-blue-600 hover:bg-blue-700
                text-white px-5 py-2
                rounded-lg
              "
            >
              {loading ? "Creating..." : "Create"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
