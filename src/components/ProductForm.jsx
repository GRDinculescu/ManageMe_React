import { useState, useEffect } from "react";
import React from "react";
import Modal from "./Modal";
import Brands from "../data/brands.json";
import Suppliers from "../data/suppliers.json";
import Categories from "../data/categories.json";

function ConfirmModal({ onConfirm, onClose }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">¿Estás seguro de que deseas eliminar este producto?</h2>
      <div className="flex gap-4 mt-4">
        <button

          onClick={onConfirm}
          className="rounded-sm cursor-pointer transition duration-150 text-white bg-red-600 hover:bg-red-500 focus:ring-1 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Sí, eliminar
        </button>
        <button
          onClick={onClose}
          className="rounded-sm cursor-pointer text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}




export default function ProductForm({ mode, product, onSubmit, onDelete, onClose }) {
  // Cargar datos de marcas, proveedores y categorías
  const brands = Brands.brands;
  const suppliers = Suppliers.suppliers;
  const categories = Categories.categories;
 
  // Estados para los campos del formulario
  const [img, setImg] = useState("/src/assets/noimage.jpg");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [supplierId, setSupplierId] = useState(0);
  const [purchasable, setPurchasable] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [brandId, setBrandId] = useState(0);

  // Obtener las subcategorías de la categoría seleccionada
  const selectedCategory = categories.find(cat => cat.id === categoryId);

  // Estado para controlar la visibilidad del modal de confirmación
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Verificar si estamos en modo edición
  const isEdit = mode === "edit";  

  // Rellenar los campos del formulario si estamos en modo edición
  useEffect(() => {
    setName(product?.name ?? "");
    setPrice(product?.price ?? "");
    setStock(product?.stock ?? "");
    setDescription(product?.description ?? "");
    setSupplierId(product?.supplierId ?? 0);
    setPurchasable(product?.purchasable ?? false);
    setImg(product?.imgSrc ?? "/src/assets/noimage.jpg");
    setCategoryId(product?.categoryId ?? 0);
    setSubcategoryId(product?.subcategoryId ?? 0);
    setBrandId(product?.brandId ?? 0);
  }, [product]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
      e.preventDefault();
      
      const formData = {
          imgSrc: img,
          name: name,
          price: price,
          stock: stock,
          description: description,
          supplierId: supplierId,
          purchasable: purchasable,
          categoryId: categoryId,
          subcategoryId: subcategoryId,
          brandId: brandId
      };
      
      // ✅ Si estamos editando, incluir el producto completo con el id
      onSubmit(mode === "edit" ? { ...product, ...formData } : formData);
  };

  // Manejar la eliminación del producto
  const handleDelete = () => {
    onDelete(product);
    setIsConfirmOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">
        {isEdit ? "Editar producto" : "Nuevo producto"}
      </h2>

      {/* Formulario */}
      <div className="flex justify-center">
        <div>
          <img src={img} alt="" className="w-25 object-cover aspect-square rounded-2xl"/>
          {/* <img src="/src/assets/img.png" alt="" /> */}
        </div>

        {/* Linea 1 */}
        <div className="flex flex-col justify-center ml-4 gap-5">
          <div className="flex gap-5">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" name="nombre" className="ml-2 p-1 rounded bg-gray-700"
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>

            {/* Precio */}
            <div>
              <label htmlFor="precio">Precio</label>
              <input type="number" id="precio" name="precio" className="ml-2 p-1 rounded bg-gray-700"
                value={price}
                onChange={(e) => setPrice(e.target.value)}/>
            </div>
            
            {/* Cantidad */}
            <div>
              <label htmlFor="cantidad">Cantidad</label>
              <input type="number" id="cantidad" name="cantidad" className="ml-2 p-1 rounded bg-gray-700"
                value={stock}
                onChange={(e) => setStock(e.target.value)}/>
            </div>
          </div>


          {/* Linea 2 */}
          <div className="flex gap-5 items-center">
            {/* Descripcion */}
            <div>
              <label htmlFor="descripcion">Descripción</label>
              <input type="text" id="descripcion" name="descripcion" className="ml-2 p-1 rounded bg-gray-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
            </div>

            {/* Proveedor */}
            <div>
              <label htmlFor="proveedor">Proveedor</label>
              <select name="proveedor" id="proveedor" className="ml-2 p-1 rounded bg-gray-700"
                value={supplierId || ""}
                onChange={(e) => setSupplierId(e.target.value)}>
                { suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                )) }
              </select>
            </div>
            
            {/* Es comprable */}
            <div>
              <input className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" type="checkbox" name="comprable" id="comprable"
                checked={purchasable}
                onChange={(e) => setPurchasable(e.target.checked)}/>
              <label className="ml-3" htmlFor="comprable">Comprable</label>
            </div>
          </div>
        </div>
      </div>


      {/* Linea 3 */}
      <div className="flex gap-5">
        {/* Categoria */}
        <div>
          <label htmlFor="categoria">Categoria</label>
          <select name="categoria" id="categoria" className="ml-2 p-1 rounded bg-gray-700"
            value={categoryId || ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}>
            {
              categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        {/* Sub-Categoria */}
        <div>
          <label htmlFor="subcategoria">Sub-Categoria</label>
          <select name="subcategoria" id="subcategoria" className="ml-2 p-1 rounded bg-gray-700"
            value={subcategoryId || ""}
            onChange={(e) => setSubcategoryId(Number(e.target.value))}>
            {
              selectedCategory?.subcategories?.map(subcat => (
                  <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
              ))
            }
          </select>
        </div>

        {/* Marca */}
        <div>
          <label htmlFor="marca">Marca</label>
          <select name="marca" id="marca" className="ml-2 p-1 rounded bg-gray-700"
            value={brandId || ""}
            onChange={(e) => setBrandId(Number(e.target.value))}>
            {
              brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))
            }
          </select>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-4 mr-5">
        <button // Guardar cambios / Crear producto
          type="submit"
          className={`p-2 rounded font-bold ${
            isEdit ? "bg-sky-600" : "bg-green-600"
          }`}
        >
          {isEdit ? "Guardar cambios" : "Crear producto"}
        </button>

        <div className="flex gap-5">
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className={`${isEdit ? "" : "hidden"} p-2 rounded font-bold bg-red-600 hover:bg-red-500`}
          >
            Borrar
          </button>

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