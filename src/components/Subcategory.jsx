import { useState, useEffect } from "react";

export default function Subcategory ({subcat, onClick}) {
    const [exist, setExist] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setExist(true);
        img.onerror = () => setExist(false);
        img.src = subcat.imgSrc;
    }, [subcat.imgSrc]);

    return (
        <div 
            className="cursor-pointer flex flex-col text-center bg-slate-600 hover:bg-slate-500 transition duration-200 w-full h-full"
            onClick={() => onClick(subcat)}
        >
            <img src={`${import.meta.env.BASE_URL}${subcat.imgSrc}`} alt={`${subcat.name}`} title={`${subcat.name}`} 
                className={`${exist ? "" : "hidden"} w-full h-full object-cover`}
            />
            <p className={`${exist ? "hidden" : ""} my-auto`}>{subcat.name}</p>
        </div>
    );
}