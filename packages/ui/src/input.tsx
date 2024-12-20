"use client"

export function Input({
    placeholder,
    onChange,
    type,
    label
}: {
    placeholder: string;
    onChange: (value:string | number ) => void;
    label: string;
    type: string;
}) {
    return <div className="pt-2 ">
        <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
        <input  type={type} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} 
        onChange={(e) => {
          const value = type === "number" ? Number(e.target.value) : e.target.value; 
          onChange(value);
        }}  />
    </div>
}