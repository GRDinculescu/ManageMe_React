import { useState } from "react";
import Layout from "./Layout";
import "../index.css";
import Product from "../components/Product";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import Filters from "../components/Filters";
import Category from "../components/Category";
import categoriesData from "../data/categories.json";
import productsData from "../data/products.json";

export default function Home() {
    const [showFilters, setShowFilters] = useState(false);

    // extraemos solo el array de categorías
    const categories = categoriesData.categories;
    const products = productsData.products;

    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("create");
    const [selectedProduct, setSelectedProduct] = useState(null);

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
                                onClick={() => setShowFilters(!showFilters)}>VER {showFilters ? "CATEGORIAS" : "FILTROS"}</button>
                            <input type="text"
                                className="flex-1 justify-self-center text-center bg-white text-black rounded-md"
                                placeholder="Insete filtro" />
                            <button type="button" onClick={openCreate}
                                className="cursor-pointer justify-self-end bg-green-600 hover:bg-green-500 transition duration-300 px-2.5 rounded-lg font-bold">+</button>
                        </div>
                        <div className="h-full">
                            {/* Categorias */}
                            <div className={`${showFilters ? "hidden" : "flex"} flex-wrap justify-around gap-5 p-3 pb-13 bg-gray-700 rounded-2xl h-full overflow-y-auto`}>
                                {categories.map((cat) => (
                                    <div key={cat.id}
                                        className="max-w-30 xs:max-w-50 sm:max-w-44 min-w-30 xs:min-w-50 sm:min-w-44 aspect-square rounded-3xl overflow-hidden">
                                        <Category {...cat}/>
                                    </div>
                                ))}
                            </div>

                            {/* Espacio para los filtros */}
                            <div className={`bg-gray-700 rounded-2xl p-2 w-full h-max
                                    ${showFilters ? "" : "hidden"}`}>
                                <Filters/>
                            </div>
                        </div>
                    </div>

                    {/* Productos */}
                    <div className="flex-10 flex flex-wrap gap-5 p-5 min-w-135 bg-gray-700 rounded-t-2xl h-full overflow-y-auto">
                        {products.map((prod) => (
                            <div key={prod.id} className="flex-1"
                            onClick={() => openEdit({ prod })}>
                                <Product {...prod}/>
                            </div>
                        ))}
                    </div>

                    {/* Ventana modal */}
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <ProductForm
                            key={selectedProduct?.id || "new"}
                            mode={mode}
                            product={selectedProduct}
                            onSubmit={(data) => {
                                if (mode === "edit") {
                                    console.log("EDIT", data);
                                } else {
                                    console.log("CREATE", data);
                                }
                                setIsOpen(false);
                            }}
                        />
                    </Modal>
                </div>
            </Layout>
        </>
    );
}
