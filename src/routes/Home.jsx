import { useState } from "react";
import Layout from "./Layout";
import "../index.css";
import Product from "../components/Product";
import Category from "../components/Category";
import Modal from "../components/Modal";
import ProductForm from "../components/ProductForm";
import Filters from "../components/Filters";

export default function Home() {
    const [showFilters, setShowFilters] = useState(false);

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
                <div className="flex flex-wrap gap-2 pt-14 h-screen overflow-hidden">
                    {/* Filtros y categorias */}
                    <div className="flex-1 flex flex-col gap-2 px-5 py-5 rounded-tr-2xl bg-gray-800 w-max">
                        {/* Filtros */}
                        <div className="flex gap-5 py-2 px-3 bg-gray-700 rounded-xl w-max h-max">
                            <button type="button"
                                className="cursor-pointer justify-self-start bg-sky-700 hover:bg-sky-600 transition duration-300 px-3 py-1 rounded-lg font-bold min-w-40" onClick={() => setShowFilters(!showFilters)}>VER {showFilters ? "CATEGORIAS" : "FILTROS"}</button>
                            <input type="text"
                                className="justify-self-center text-center bg-white text-black rounded-md"
                                placeholder="Insete filtro" />
                            <button type="button" onClick={openCreate}
                                className="cursor-pointer justify-self-end bg-green-600 hover:bg-green-500 transition duration-300 px-3 rounded-lg font-bold">+</button>
                        </div>
                        <div>
                            {/* Categorias */}
                            <div className={`p-5 bg-gray-700 rounded-2xl overflow-y-auto gap-5 ${showFilters ? "hidden" : "flex flex-col"}`}>
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <div key={index}>
                                        <Category />
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
                    <div className="flex-10 flex flex-wrap gap-5 p-5 min-w-150 bg-gray-700 rounded-t-2xl h-full overflow-y-auto">
                        {Array.from({ length: 51 }).map((_, index) => (
                            <div key={index} className="flex-1" onClick={openEdit}>
                                <Product />
                            </div>
                        ))}
                    </div>

                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <ProductForm
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
