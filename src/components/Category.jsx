import { useState, useEffect } from "react";

export default function Category ({...cat}) {
    const [exist, setExist] = useState(true); // asumimos que existe

    useEffect(() => {
        const img = new Image();
        img.onload = () => setExist(true);
        img.onerror = () => setExist(false);
        img.src = cat.imgSrc;
    }, [cat.imgSrc]);
    
    return (
    <div className="cursor-pointer flex flex-col text-center bg-slate-600 w-full h-full">
      <img src={cat.imgSrc} alt={`${cat.name}`} title={`${cat.name}`} className={`${exist ? "" : "hidden"} w-full h-full object-cover`}/>
      <p className={`${exist ? "hidden" : ""} my-auto`}>{cat.name}</p>
    </div>
  );
}