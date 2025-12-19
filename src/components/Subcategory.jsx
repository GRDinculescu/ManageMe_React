export default function Subcategory ({subcat, onClick}) {
    return (
        <div 
            className="cursor-pointer flex items-center justify-center text-center bg-slate-600 hover:bg-slate-500 transition duration-200 w-full h-full rounded-2xl p-4"
            onClick={() => onClick(subcat)}
        >
            <p className="font-semibold text-lg">{subcat.name}</p>
        </div>
    );
}