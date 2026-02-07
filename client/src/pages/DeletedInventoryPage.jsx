import { useEffect, useState } from "react";
import { getDeletedInventory, recoverInventory } from "../api/inventoryApi";
import toast from "react-hot-toast";

export default function DeletedInventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getDeletedInventory();
      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load deleted items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRecover = async (id) => {
    try {
      await recoverInventory(id);
      toast.success("Inventory recovered");
      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Recover failed");
    }
  };

  if (loading) return <div className="p-8 text-slate-700">Loading...</div>;

  if (!items.length) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 p-4 rounded text-slate-900">
        No deleted inventories
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-slate-900">
        Deleted Inventories
      </h1>

      {/* Dark table card — matches active table */}
      <div className="
        bg-slate-900
        border border-slate-800
        rounded-xl
        shadow-lg
        overflow-hidden
      ">
        <table className="w-full text-slate-200">

          <thead className="bg-slate-800 text-left text-slate-300">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Deleted At</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-800 hover:bg-slate-800/60 transition"
              >
                <td className="p-4 font-medium">
                  {item.name}
                </td>

                <td className="p-4 text-slate-400">
                  {new Date(item.deletedAt).toLocaleString()}
                </td>

                <td className="p-4">
                  <button
                    onClick={() => handleRecover(item.id)}
                    className="
                      bg-emerald-600 hover:bg-emerald-700
                      text-white px-4 py-1.5
                      rounded-lg
                      transition
                    "
                  >
                    Recover
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
