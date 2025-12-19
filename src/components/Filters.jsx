export default function Filters () {
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
                        <option value="">Marca 1</option>
                        <option value="">Marca 2</option>
                        <option value="">Marca 3</option>
                    </select>
                </div>
                <div className="flex">
                    <label htmlFor="proveedor" className="font-bold">PROVEEDOR</label>
                    <select className="ml-5 bg-sky-100 text-black rounded-md" name="" id="proveedor">
                        <option value="">Proveedor 1</option>
                        <option value="">Proveedor 2</option>
                        <option value="">Proveedor 3</option>
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
                    <select className="ml-5 bg-sky-100 text-black rounded-md" name="" id="categoria">
                        <option value="">Categoria 1</option>
                        <option value="">Categoria 2</option>
                        <option value="">Categoria 3</option>
                    </select>
                </div>
                <div className="flex">
                    <label htmlFor="subcategoria" className="font-bold">SUB-CATEGORIA</label>
                    <select className="ml-5 bg-sky-100 text-black rounded-md" name="" id="subcategoria">
                        <option value="">Subcategoria 1</option>
                        <option value="">Subcategoria 2</option>
                        <option value="">Subcategoria 3</option>
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