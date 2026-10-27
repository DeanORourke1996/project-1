import { db } from '@/db';
import { items } from '@/db/schema';
import { addItem, deleteItem } from './actions';

export default async function Home() {
  const allItems = await db.select().from(items);

  return (
    <main className="max-w-2xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Project 1: Data Table</h1>

      <form action={addItem} className="flex gap-4 mb-8">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          required
          className="border p-2 rounded w-full text-black"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          required
          className="border p-2 rounded w-full text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white border-b">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No items in database yet.
                </td>
              </tr>
            ) : (
              allItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3 text-right">
                    <form action={deleteItem.bind(null, item.id)}>
                      <button
                        type="submit"
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}