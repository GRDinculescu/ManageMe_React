import React from "react";
import Modal from "./Modal";
function ConfirmModal({ onConfirm, onClose }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">¿Estás seguro de que deseas eliminar este producto?</h2>
      <div className="flex gap-4 mt-4">
        <button

          onClick={onConfirm}
          className="rounded-sm hover:rounded-2xl cursor-pointer text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-red-400 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Sí, eliminar
        </button>
        <button
          onClick={onClose}
          className="rounded-sm hover:rounded-2xl cursor-pointer text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}




export default function ProductForm({ mode, product, onSubmit, onDelete, onClose }) {
  const [name, setName] = React.useState(product?.name || "");
  const [price, setPrice] = React.useState(product?.price || "");
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const isEdit = mode === "edit";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...product,
      name,
      price,
    });
  };

  const handleDelete = () => {
    onDelete(product);
    setIsConfirmOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h2>

      <div className="flex justify-center">
        <img src="/src/assets/face.png" alt="" className="w-25"/>
        <div className="flex flex-col justify-center ml-4 gap-5">
          <div className="flex gap-5">
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ml-2 p-1 rounded bg-gray-700"
              />
            </div>
            <div>
              <label htmlFor="precio">Precio</label>
              <input 
                type="number" 
                id="precio" 
                name="precio" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="ml-2 p-1 rounded bg-gray-700"
              />
            </div>
            <div>
              <label htmlFor="cantidad">Cantidad</label>
              <input type="number" id="cantidad" name="cantidad" className="ml-2 p-1 rounded bg-gray-700"/>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div>
              <label htmlFor="descripcion">Descripción</label>
              <input type="text" id="descripcion" name="descripcion" className="ml-2 p-1 rounded bg-gray-700"/>
            </div>
            <div>
              <label htmlFor="proveedor">Proveedor</label>
              <select name="proveedor" id="proveedor" className="ml-2 p-1 rounded bg-gray-700">
                <option value="">Seleccionar proveedor</option>
                <option value="Proveedor A">Proveedor A</option>
                <option value="Proveedor B">Proveedor B</option>
              </select>
            </div>
            <div>
              <input className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" type="checkbox" name="comprable" id="comprable" />
              <label className="ml-3" htmlFor="comprable">Comprable</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div>
          <label htmlFor="categoria">Categoria</label>
          <select name="categoria" id="categoria" className="ml-2 p-1 rounded bg-gray-700">
            <option value="">Seleccionar categoria</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Ropa">Ropa</option>
            <option value="Hogar">Hogar</option>
          </select>
        </div>
        <div>
          <label htmlFor="subcategoria">Sub-Categoria</label>
          <select name="subcategoria" id="subcategoria" className="ml-2 p-1 rounded bg-gray-700">
            <option value="">Seleccionar sub-categoria</option>
            <option value="Sub-Categoria 1">Sub-Categoria 1</option>
            <option value="Sub-Categoria 2">Sub-Categoria 2</option>
          </select>
        </div>
        <div>
          <label htmlFor="marca">Marca</label>
          <select name="marca" id="marca" className="ml-2 p-1 rounded bg-gray-700">
            <option value="">Seleccionar marca</option>
            <option value="Marca A">Marca A</option>
            <option value="Marca B">Marca B</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-4 mr-5">
        <button
          type="submit"
          className={`p-2 rounded font-bold ${
            isEdit ? "bg-sky-600" : "bg-green-600"
          }`}
        >
          {isEdit ? "Guardar cambios" : "Crear producto"}
        </button>

        <div className="flex gap-5">
          {isEdit && (
            <button
              type="button"
              onClick={() => setIsConfirmOpen(true)}
              className="p-2 rounded font-bold bg-red-600 hover:bg-red-500"
            >
              Borrar
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white"
          >
            Cerrar
          </button>
        </div>
      </div>

      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={() => setIsConfirmOpen(false)}
        />
      </Modal>
    </form>
  );
}