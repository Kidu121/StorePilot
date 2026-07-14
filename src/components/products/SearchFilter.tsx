import { Search, Plus } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  onAdd: () => void;
};

export default function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  onAdd,
}: Props) {

  return (
    <div className="bg-white p-5 rounded-2xl border flex gap-4">

      <div className="flex items-center bg-gray-100 rounded-xl px-4 flex-1">

        <Search size={20} className="text-gray-400" />

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search products..."
          className="bg-transparent outline-none ml-3 w-full"
        />

      </div>


      <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        className="bg-gray-100 rounded-xl px-4"
      >

        <option value="All">
          All
        </option>

        <option value="Electronics">
          Electronics
        </option>

        <option value="Accessories">
          Accessories
        </option>

      </select>


      <button
        onClick={onAdd}
        className="bg-blue-600 text-white px-5 rounded-xl flex items-center gap-2"
      >

        <Plus size={18}/>

        Add Product

      </button>


    </div>
  );
}