import brandsData from '../data/brands.json';
/* import suppliersData from '../data/suppliers.json'; */
import categoriesData from '../data/categories.json';

import { useEffect, useState } from 'react';
export default function Product ({...prod}) {
    const brands = brandsData.brands;
    /* const suppliers = suppliersData.suppliers; */
    const categories = categoriesData.categories;

    const brand = brands.find(b => b.id === prod.brandId)?.name || "Desconocida";
    const category = categories.find(c => c.id === prod.categoryId)?.name || "Desconocida";
    const subcategory = categories.find(c => c.id === prod.categoryId)?.subcategories?.find(sc => sc.id === prod.subcategoryId)?.name || "";

    const [exist, setExist] = useState(true); // asumimos que existe

    useEffect(() => {
        const img = new Image();
        img.onload = () => setExist(true);
        img.onerror = () => setExist(false);
        img.src = prod.imgSrc;
    }, [prod.imgSrc]);

    return (
        <div className='flex py-5 px-5 h-30 text-md'>
            <img src={`${exist ? prod.imgSrc : "/src/assets/noimage.jpg"}`} alt="" className='rounded-2xl aspect-square object-cover'/>
            <div className='flex flex-col mx-5 mr-7.5 flex-14'>
                <div className='flex justify-between mb-2.5 font-bold uppercase'>
                    <p className='truncate max-w-[60%]'>{prod.name}</p>
                    <p className={`${prod.purchasable ? "" : "text-red-500"}`}>{prod.purchasable ? "COMPRABLE" : "NO SE PUEDE VENDER"}</p>
                </div>
                <div className='flex flex-2 justify-between items-end'>
                    <div className='flex flex-4 flex-col flex-wrap'>
                        <div className='flex gap-5'>
                            <p className='truncate'>{category}</p>
                            <p className='truncate'>{subcategory}</p>
                        </div>
                        <p>{brand}</p>
                    </div>
                    <div className='flex justify-between flex-2'>
                        <p className='truncate'>{prod.price}€</p>
                        <p className={`${prod.stock <= 0 ? "text-red-500" : ""} truncate`}>{prod.stock} uds</p>
                    </div>
                </div>
            </div>
        </div>
    )
}