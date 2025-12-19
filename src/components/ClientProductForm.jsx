import { useState, useEffect } from "react";

export default function ClientProductForm({ product, onSubmit, onClose }) {
    const [stock, setStock] = useState(product?.stock || 0);
    const [purchasable, setPurchasable] = useState(product?.purchasable || false);

    useEffect(() => {
        if (product) {
            setStock(product.stock);
            setPurchasable(product.purchasable);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const updatedData = {
            ...product,
            stock: Number(stock),
            purchasable: purchasable
        };
        
        onSubmit(updatedData);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-2xl max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">Gestionar Producto</h2>
            
            {/* Información del producto (solo lectura) */}
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <div className="mb-2">
                    <span className="font-semibold">Nombre:</span> {product?.name}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Precio:</span> €{product?.price}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Descripción:</span> {product?.description || "Sin descripción"}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Stock - Editable */}
                <div>
                    <label htmlFor="stock" className="block font-semibold mb-2">
                        Stock
                    </label>
                    <input
                        id="stock"
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-2 bg-gray-700 rounded-md text-white"
                        required
                    />
                </div>

                {/* Es comprable - Editable */}
                <div className="flex items-center gap-3">
                    <input
                        id="purchasable"
                        type="checkbox"
                        checked={purchasable}
                        onChange={(e) => setPurchasable(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <label htmlFor="purchasable" className="font-semibold">
                        Producto comprable
                    </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-gray-600 hover:bg-gray-500 transition duration-200 py-2 rounded-lg font-bold"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-500 transition duration-200 py-2 rounded-lg font-bold"
                    >
                        Actualizar Stock
                    </button>
                </div>
            </form>
        </div>
    );
}