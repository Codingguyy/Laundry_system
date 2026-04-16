import { drop_down } from "@/types/utils";
import { Status } from "@/types/order";
import { Triggercount } from "@/store/zustand";
export default function Dropdown({ value, onChange, options }:drop_down) {
  const array:Status[]=["DELIVERED","PROCESSING","READY","RECEIVED"]
  const settriggercount=Triggercount(s=>s.setcont)
  return (
    <select
      className="w-full border px-3 py-2 rounded-md border border-2 border border-gray-300 text-gray-500 max-w-[207px]"
      value={value}
      onChange={(e) => {onChange(e.target.value);settriggercount(true)}}
      title="Dropdown"
    >
      <option value="" className="text-gray-500">Select an option</option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="text-gray-500">
          {opt.label}
        </option>
      ))}
    </select>
  );
}