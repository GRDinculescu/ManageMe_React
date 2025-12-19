import Brands from "../data/brands.json";
import Suppliers from "../data/suppliers.json";
import Categories from "../data/categories.json";
import { useState } from "react";

export default function Filters () {
    const brands = Brands.brands;
    const suppliers = Suppliers.suppliers;
    const categories = Categories.categories;
    
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

    return (
        <div className="flex flex-col gap-2 justify-between text-center w-full h-full rounded-2xl overflow-hidden">
            <div className="flex-1 bg-gray-500 p-3 flex flex-col gap-5">
                <div className="flex justify-between">
                    <label htmlFor="precio" className="font-bold">PRECIO</label>
                    <input className="max-w-40 bg-sky-100 rounded-md text-black px-2" placeholder="0€" type="number" name="" id="" />
                    <input className="max-w-40 bg-sky-100 rounded-md text-black px-2" placeholder="1000€" type="number" name="" id="" />
                </div>
                <div className="flex">
                    <label htmlFor="marca" className="font-bold">MARCA</label>
                    <select className="ml-5 bg-sky-100 text-black rounded-md" name="" id="marca">
                        {
                            brands.map((brand) => (
                                <option key={brand.id} value="">{brand.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex">
                    <label htmlFor="proveedor" className="font-bold">PROVEEDOR</label>
                    <select className="ml-5 bg-sky-100 text-black rounded-md" name="" id="proveedor">
                        {
                            suppliers.map((supplier) => (
                                <option key={supplier.id} value="">{supplier.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="flex-1 bg-gray-500 p-3 flex flex-col gap-5">
                <div className="flex justify-between">
                    <label htmlFor="stock" className="font-bold">STOCK</label>
                        <input className="max-w-40 bg-sky-100 rounded-md text-black px-2" placeholder="0" type="number" name="" id="" />
                        <input className="max-w-40 bg-sky-100 rounded-md text-black px-2" placeholder="1000" type="number" name="" id="" />
                </div>
                <div className="flex">
                    <label htmlFor="categoria" className="font-bold">CATEGORIA</label>
                    <select
                        className="ml-5 bg-sky-100 text-black rounded-md" name="" id="categoria"
                        onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                        value={selectedCategoryId || ""}>
                        {
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex">
                    <label htmlFor="subcategoria" className="font-bold">SUB-CATEGORIA</label>
                    <select className="ml-5 bg-sky-100 text-black rounded-md" name="" id="subcategoria">
                        {
                            selectedCategory?.subcategories?.map(subcat => (
                                <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="flex bg-gray-500 px-3 py-1">
                <input type="checkbox" name="comprable" id="comprable"/>
                <label className="ml-2 font-bold" htmlFor="comprable">COMPRABLE</label>
            </div>
        </div>
    )
}