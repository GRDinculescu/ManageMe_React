import { useState, useMemo } from "react";
import Layout from "./Layout";
import "../index.css";
import Product from "../components/Product";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import Filters from "../components/Filters";
import Category from "../components/Category";
import Subcategory from "../components/Subcategory";
import categoriesData from "../data/categories.json";
import productsData from "../data/products.json";

export default function Home() {
    const [showFilters, setShowFilters] = useState(false);

    const categories = categoriesData.categories;
    const [products, setProducts] = useState(productsData.products || []);
    const [searchText, setSearchText] = useState("");
    const [filters, setFilters] = useState({});

    // Estados para categorías y subcategorías
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Función para filtrar productos
    const filteredProducts = useMemo(() => {
        return products.filter(prod => {
            // Filtro de búsqueda por texto
            if (searchText && !prod.name.toLowerCase().includes(searchText.toLowerCase())) {
                return false;
            }

            // Filtro por categoría seleccionada (desde las tarjetas)
            if (selectedCategory && prod.categoryId !== selectedCategory.id) {
                return false;
            }

            // Filtro por subcategoría seleccionada
            if (selectedSubcategory && prod.subcategoryId !== selectedSubcategory.id) {
                return false;
            }

            // Filtro de precio
            if (filters.minPrice !== null && prod.price < filters.minPrice) return false;
            if (filters.maxPrice !== null && prod.price > filters.maxPrice) return false;

            // Filtro de marca
            if (filters.brandId && prod.brandId !== filters.brandId) return false;

            // Filtro de proveedor
            if (filters.supplierId && prod.supplierId !== filters.supplierId) return false;

            // Filtro de stock
            if (filters.minStock !== null && prod.stock < filters.minStock) return false;
            if (filters.maxStock !== null && prod.stock > filters.maxStock) return false;

            // Filtro de categoría (desde filtros)
            if (filters.categoryId && prod.categoryId !== filters.categoryId) return false;

            // Filtro de subcategoría (desde filtros)
            if (filters.subcategoryId && prod.subcategoryId !== filters.subcategoryId) return false;

            // Filtro de comprable
            if (filters.purchasable && !prod.purchasable) return false;

            return true;
        });
    }, [products, searchText, filters, selectedCategory, selectedSubcategory]);

    const handleCreateProduct = (newProduct) => {
        setProducts(prevProducts => [...prevProducts, { ...newProduct }]);
    };

    const handleEditProduct = (updatedProduct) => {
        setProducts(prevProducts => 
            prevProducts.map((prod) =>
                prod.id === updatedProduct.id 
                    ? { ...prod, ...updatedProduct } 
                    : prod
            )
        );
    };

    const handleDeleteProduct = (productId) => {
        setProducts(prevProducts => 
            prevProducts.filter(prod => prod.id !== productId)
        );
    };

    const openCreate = () => {
        setMode("create");
        setSelectedProduct(null);
        setIsOpen(true);
    };

    const openEdit = (product) => {
        setMode("edit");
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSelectedSubcategory(null); // Reset subcategoría
    };

    const handleSubcategoryClick = (subcat) => {
        setSelectedSubcategory(subcat);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setSelectedSubcategory(null);
    };

    const handleBackToSubcategories = () => {
        setSelectedSubcategory(null);
    };

    return (
        <>
            <Layout>
                <div className="flex flex-wrap gap-2 pt-14 h-screen w-screen overflow-hidden">
                    {/* Filtros y categorias */}
                    <div className="flex-1 flex flex-col gap-2 px-5 py-5 rounded-tr-2xl bg-gray-800 h-full">
                        {/* Filtros */}
                        <div className="flex gap-5 py-2 px-3 bg-gray-700 rounded-xl w-full h-max">
                            <button type="button"
                                className="cursor-pointer justify-self-start bg-sky-700 hover:bg-sky-600 transition duration-300 py-1 rounded-lg font-bold min-w-40"
                                onClick={() => setShowFilters(!showFilters)}>
                                VER {showFilters ? "CATEGORIAS" : "FILTROS"}
                            </button>
                            <input type="text"
                                className="flex-1 justify-self-center text-center bg-white text-black rounded-md"
                                placeholder="Buscar producto"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button type="button" onClick={openCreate}
                                className="cursor-pointer justify-self-end bg-green-600 hover:bg-green-500 transition duration-300 px-2.5 rounded-lg font-bold">
                                +
                            </button>
                        </div>
                        <div className="h-full">
                            {/* Categorias */}
                            <div className={`${showFilters ? "hidden" : "flex"} flex-col gap-3 p-3 bg-gray-700 rounded-2xl h-full overflow-y-auto`}>
                                {/* Botón de volver */}
                                {(selectedCategory || selectedSubcategory) && (
                                    <button
                                        className="bg-sky-600 hover:bg-sky-500 transition duration-200 py-2 px-4 rounded-lg font-bold"
                                        onClick={selectedSubcategory ? handleBackToSubcategories : handleBackToCategories}
                                    >
                                        ← {selectedSubcategory ? 'Volver a Subcategorías' : 'Volver a Categorías'}
                                    </button>
                                )}

                                {/* Mostrar categorías si no hay ninguna seleccionada */}
                                {!selectedCategory && (
                                    <div className="flex flex-wrap justify-around gap-5">
                                        {categories.map((cat) => (
                                            <div key={cat.id}
                                                className="max-w-30 xs:max-w-50 sm:max-w-44 min-w-30 xs:min-w-50 sm:min-w-44 aspect-square rounded-3xl overflow-hidden">
                                                <Category cat={cat} onClick={handleCategoryClick}/>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Mostrar subcategorías si hay una categoría seleccionada */}
                                {selectedCategory && !selectedSubcategory && (
                                    <div className="flex flex-wrap justify-around gap-5">
                                        {selectedCategory.subcategories?.map((subcat) => (
                                            <div key={subcat.id}
                                                className="max-w-30 xs:max-w-50 sm:max-w-44 min-w-30 xs:min-w-50 sm:min-w-44 aspect-square rounded-3xl overflow-hidden">
                                                <Subcategory subcat={subcat} onClick={handleSubcategoryClick}/>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Mostrar nombre de subcategoría seleccionada */}
                                {selectedSubcategory && (
                                    <div className="text-center p-4 bg-gray-600 rounded-lg">
                                        <h2 className="text-2xl font-bold">{selectedSubcategory.name}</h2>
                                        <p className="text-gray-300">en {selectedCategory.name}</p>
                                    </div>
                                )}
                            </div>

                            {/* Espacio para los filtros */}
                            <div className={`bg-gray-700 rounded-2xl p-2 w-full h-max ${showFilters ? "" : "hidden"}`}>
                                <Filters onFilterChange={setFilters} />
                            </div>
                        </div>
                    </div>

                    {/* Productos */}
                    <div className="flex-10 grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-5 p-5 min-w-135 bg-gray-700 rounded-t-2xl h-full overflow-y-auto content-start">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((prod) => (
                                <div key={prod.id} 
                                    className="cursor-pointer bg-slate-900 hover:bg-gray-800 transition duration-200 rounded-2xl overflow-hidden h-max"
                                    onClick={() => openEdit(prod)}>
                                    <Product {...prod}/>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-400 w-full mt-10 col-span-full">
                                No se encontraron productos
                            </p>
                        )}
                    </div>

                    {/* Ventana modal */}
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <ProductForm
                            mode={mode}
                            product={selectedProduct}
                            onSubmit={(data) => {
                                if (mode === "edit") {
                                    handleEditProduct(data);
                                } else {
                                    data.id = products[products.length - 1].id + 1;
                                    handleCreateProduct(data);
                                }
                                setIsOpen(false);
                            }}
                            onDelete={() => {
                                if (selectedProduct?.id) {
                                    handleDeleteProduct(selectedProduct.id);
                                    setIsOpen(false);
                                }
                            }}
                        />
                    </Modal>
                </div>
            </Layout>
        </>
    );
}