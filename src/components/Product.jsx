import { useEffect, useState } from 'react';
export default function Product ({...prod}) {
    const [exist, setExist] = useState(true); // asumimos que existe

    useEffect(() => {
        const img = new Image();
        img.onload = () => setExist(true);
        img.onerror = () => setExist(false);
        img.src = prod.imgSrc;
    }, [prod.imgSrc]);

    return (
        <div className='cursor-pointer bg-slate-900 hover:bg-gray-800 transition duration-300 rounded-2xl flex justify-between py-5 px-5 h-30 text-xl w-full min-w-125'>
            <img src={`${exist ? prod.imgSrc : "/src/assets/noimage.jpg"}`} alt="" className='rounded-2xl'/>
            <div className='flex flex-col mx-5 mr-7.5 flex-14'>
                <p id='pName'>{prod.name}</p>
                <ul className='flex flex-2 justify-between items-end'>
                    <li id='pCat'>{prod.category}</li>
                    <li id='pBrand'>{prod.brand}</li>
                    <li id='pPrice'>{prod.price}</li>
                    <li id='pStock'>{prod.stock}</li>
                </ul>
            </div>
        </div>
    )
}