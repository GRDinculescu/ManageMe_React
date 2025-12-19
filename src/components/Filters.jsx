import Brands from "../data/brands.json";
import Suppliers from "../data/suppliers.json";
import Categories from "../data/categories.json";
import { useState, useEffect } from "react";

export default function Filters ({ onFilterChange }) {
    const brands = Brands.brands;
    const suppliers = Suppliers.suppliers;
    const categories = Categories.categories;
    
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [filters, setFilters] = useState({
        minPrice: null,
        maxPrice: null,
        brandId: null,
        supplierId: null,
        minStock: null,
        maxStock: null,
        categoryId: null,
        subcategoryId: null,
        purchasable: false
    });

    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);

    // Emitir cambios de filtros al padre
    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col gap-2 justify-between text-center w-full h-full rounded-2xl overflow-hidden">
            <div className="flex-1 bg-gray-500 p-3 flex flex-col gap-5">
                <div className="flex justify-between">
                    <label htmlFor="precio" className="font-bold">PRECIO</label>
                    <input 
                        className="max-w-40 bg-sky-100 rounded-md text-black px-2" 
                        placeholder="0€" 
                        type="number" 
                        onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : null)}
                    />
                    <input 
                        className="max-w-40 bg-sky-100 rounded-md text-black px-2" 
                        placeholder="1000€" 
                        type="number"
                        onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : null)}
                    />
                </div>
                <div className="flex">
                    <label htmlFor="marca" className="font-bold">MARCA</label>
                    <select 
                        className="ml-5 bg-sky-100 text-black rounded-md" 
                        id="marca"
                        onChange={(e) => updateFilter('brandId', e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">Todas</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex">
                    <label htmlFor="proveedor" className="font-bold">PROVEEDOR</label>
                    <select 
                        className="ml-5 bg-sky-100 text-black rounded-md" 
                        id="proveedor"
                        onChange={(e) => updateFilter('supplierId', e.target.value ? Number(e.target.value) : null)}
                    >
                        <option value="">Todos</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex-1 bg-gray-500 p-3 flex flex-col gap-5">
                <div className="flex justify-between">
                    <label htmlFor="stock" className="font-bold">STOCK</label>
                    <input 
                        className="max-w-40 bg-sky-100 rounded-md text-black px-2" 
                        placeholder="0" 
                        type="number"
                        onChange={(e) => updateFilter('minStock', e.target.value ? Number(e.target.value) : null)}
                    />
                    <input 
                        className="max-w-40 bg-sky-100 rounded-md text-black px-2" 
                        placeholder="1000" 
                        type="number"
                        onChange={(e) => updateFilter('maxStock', e.target.value ? Number(e.target.value) : null)}
                    />
                </div>
                <div className="flex">
                    <label htmlFor="categoria" className="font-bold">CATEGORIA</label>
                    <select
                        className="ml-5 bg-sky-100 text-black rounded-md" 
                        id="categoria"
                        onChange={(e) => {
                            const catId = e.target.value ? Number(e.target.value) : null;
                            setSelectedCategoryId(catId);
                            updateFilter('categoryId', catId);
                            updateFilter('subcategoryId', null); // Reset subcategory
                        }}
                        value={selectedCategoryId || ""}
                    >
                        <option value="">Todas</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex">
                    <label htmlFor="subcategoria" className="font-bold">SUB-CATEGORIA</label>
                    <select 
                        className="ml-5 bg-sky-100 text-black rounded-md" 
                        id="subcategoria"
                        onChange={(e) => updateFilter('subcategoryId', e.target.value ? Number(e.target.value) : null)}
                        disabled={!selectedCategory}
                    >
                        <option value="">Todas</option>
                        {selectedCategory?.subcategories?.map(subcat => (
                            <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex bg-gray-500 px-3 py-1">
                <input 
                    type="checkbox" 
                    id="comprable"
                    onChange={(e) => updateFilter('purchasable', e.target.checked)}
                />
                <label className="ml-2 font-bold" htmlFor="comprable">COMPRABLE</label>
            </div>
        </div>
    );
}