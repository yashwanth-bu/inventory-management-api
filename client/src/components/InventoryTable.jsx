import { deleteInventory } from "../api/inventoryApi";
import toast from "react-hot-toast";

export default function InventoryTable({ items, onDeleted }) {
  if (!items.length) {
    return (
      <div className="bg-yellow-100 border border-yellow-300 p-4 rounded">
        No inventory records found
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this inventory?")) return;

    try {
      await deleteInventory(id);
      toast.success("Inventory moved to deleted");
      onDeleted();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  return (
  <table className="w-full border border-slate-800 rounded-xl overflow-hidden">
    
    <thead className="bg-slate-800 text-slate-200 text-left">
      <tr>
        <th className="p-3 font-semibold">Name</th>
        <th className="p-3 font-semibold">Created</th>
        <th className="p-3 font-semibold">Actions</th>
      </tr>
    </thead>

    <tbody className="bg-slate-900 text-slate-100">
      {items.map((item) => (
        <tr
          key={item.id}
          className="border-t border-slate-800 hover:bg-slate-800 transition"
        >
          <td className="p-3 font-medium">
            {item.name}
          </td>

          <td className="p-3 text-slate-300">
            {new Date(item.createdAt).toLocaleString()}
          </td>

          <td className="p-3">
            <button
              onClick={() => handleDelete(item.id)}
              className="
                bg-red-600 hover:bg-red-700
                text-white
                px-3 py-1
                rounded-lg
                transition
              "
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
);
}
