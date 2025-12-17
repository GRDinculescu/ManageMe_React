import Layout from "./Layout";
import "../index.css";
import Product from "../components/Product";
import Category from "../components/Category";

export default function Home() {
    return (
        <>
            <Layout>
                <div className="flex flex-wrap gap-2 pt-14 h-screen">
                    {/* Filtros y categorias */}
                    <div className="flex-1 flex flex-col gap-5 px-5 py-5 rounded-tr-2xl bg-gray-800">
                        {/* Filtros */}
                        <div className="grid grid-cols-3 py-4 px-3 bg-gray-700 rounded-xl w-full h-max">
                            <button type="button"
                                className="justify-self-start bg-sky-700 px-3 py-1 rounded-lg font-bold">FILTROS</button>
                            <input type="text"
                                className="justify-self-center text-center bg-white text-black rounded-md"
                                placeholder="Insete filtro" />
                            <button type="button"
                                className="justify-self-end bg-green-600 px-3 rounded-lg font-bold">+</button>
                        </div>
                        {/* Categorias */}
                        <div className="flex-1 flex flex-col py-5 px-5 bg-gray-700 rounded-2xl min-w-125 justify-between">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex flex-1 justify-between my-2 rounded-lg p-2 gap-4"
                                >
                                    {Array.from({ length: 3 }).map((_, subIndex) => (
                                        <Category key={subIndex} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Productos */}
                    <div className="flex-10 flex gap-5 flex-wrap py-5 px-5 min-w-125 bg-gray-700 rounded-tl-2xl h-full overflow-y-auto">
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
