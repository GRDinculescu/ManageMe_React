import Layout from "./Layout";
import "../index.css";
import Product from "../components/Product";
import Category from "../components/Category";
import { useState } from "react";

export default function Home() {
    const [showFilters, setShowFilters] = useState(false);

    return (
        <>
            <Layout>
                <div className="flex flex-wrap gap-2 pt-14 h-screen">
                    {/* Filtros y categorias */}
                    <div className="flex-1 flex flex-col gap-5 px-5 py-5 rounded-tr-2xl bg-gray-800">
                        {/* Filtros */}
                        <div className="grid grid-cols-3 py-2 px-3 bg-gray-700 rounded-xl w-full h-max">
                            <button type="button"
                                className="justify-self-start bg-sky-700 px-3 py-1 rounded-lg font-bold" onClick={() => setShowFilters(!showFilters)}>FILTROS</button>
                            <input type="text"
                                className="justify-self-center text-center bg-white text-black rounded-md"
                                placeholder="Insete filtro" />
                            <button type="button"
                                className="justify-self-end bg-green-600 px-3 rounded-lg font-bold">+</button>
                        </div>
                        {/* Categorias */}
                        <div className={`flex-1 flex flex-row xl:flex-col p-5 bg-gray-700 rounded-2xl min-w-125 justify-between gap-4 overflow-y-auto
                            ${showFilters ? "hidden" : "flex"}`}>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col xl:flex-row flex-1 justify-between my-2 rounded-lg p-2 gap-4"
                                >
                                    {Array.from({ length: 3 }).map((_, subIndex) => (
                                        <Category key={subIndex} />
                                    ))}
                                </div>
                            ))}
                        </div>
                        {/* Espacio para los filtros */}
                        <div className={`flex bg-gray-600 rounded-2xl p-3 h-max gap-5 justify-between
                                ${showFilters ? "flex" : "hidden"}`}>
                            <div className="bg-gray-500 rounded-2xl p-3 flex flex-col gap-5">
                                <div>
                                    <p>Precio</p>
                                    <div className="flex gap-2 justify-between">
                                        <input className="max-w-20 bg-sky-100 rounded-md text-black px-2" placeholder="0€" type="number" name="" id="" />
                                        <input className="max-w-20 bg-sky-100 rounded-md text-black px-2" placeholder="1000€" type="number" name="" id="" />
                                    </div>
                                </div>
                                <div>
                                    <p>Marca</p>
                                    <select className="bg-sky-100 text-black" name="" id="">
                                        <option value="">Marca 1</option>
                                        <option value="">Marca 2</option>
                                        <option value="">Marca 3</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Proveedor</p>
                                    <select className="bg-sky-100 text-black" name="" id="">
                                        <option value="">Proveedor 1</option>
                                        <option value="">Proveedor 2</option>
                                        <option value="">Proveedor 3</option>
                                    </select>
                                </div>
                                <div className="flex">
                                    <input type="checkbox" name="comprable" id="comprable"/>
                                    <label className="ml-2" htmlFor="comprable">Comprable</label>
                                </div>
                            </div>
                            <div className="bg-gray-500 rounded-2xl p-3 flex flex-col gap-5">
                                <div>
                                    <p>Stock</p>
                                    <div className="flex gap-2 justify-between">
                                        <input className="max-w-20 bg-sky-100 rounded-md text-black px-2" placeholder="0" type="number" name="" id="" />
                                        <input className="max-w-20 bg-sky-100 rounded-md text-black px-2" placeholder="1000" type="number" name="" id="" />
                                    </div>
                                </div>
                                <div>
                                    <p>Categoria</p>
                                    <select className="bg-sky-100 text-black" name="" id="">
                                        <option value="">Categoria 1</option>
                                        <option value="">Categoria 2</option>
                                        <option value="">Categoria 3</option>
                                    </select>
                                </div>
                                <div>
                                    <p>Sub-Categoria</p>
                                        <select className="bg-sky-100 text-black" name="" id="">
                                            <option value="">Proveedor 1</option>
                                            <option value="">Proveedor 2</option>
                                            <option value="">Proveedor 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Productos */}
                    <div className="flex-10 flex flex-wrap gap-5 p-5 min-w-150 bg-gray-700 rounded-t-2xl h-full overflow-y-auto">
                        {Array.from({ length: 51 }).map((_, index) => (
                            <div key={index} className="flex-1 bg-slate-900 rounded-3xl">
                                <Product />
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
}
