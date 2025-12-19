import { useMemo, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";
import Modal from "../components/Modal";
import { useAuth } from "../context/AuthContext";

function UserForm({ mode, user, onSubmit, onDelete, onClose }) {
  const isEdit = mode === "edit";
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("client");

  useEffect(() => {
    setName(user?.name ?? "");
    setUsername(user?.username ?? "");
    setEmail(user?.email ?? "");
    setPassword(user?.password ?? "");
    setRol(user?.rol ?? "client");
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
      rol,
    });
  };

  const handleDelete = () => {
    if (!user) return;
    if (window.confirm("¿Eliminar este usuario?")) {
      onDelete(user);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">
        {isEdit ? "Editar usuario" : "Nuevo usuario"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Nombre</span>
          <input
            className="rounded-lg bg-gray-700 px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Usuario</span>
          <input
            className="rounded-lg bg-gray-700 px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Email</span>
          <input
            type="email"
            className="rounded-lg bg-gray-700 px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Contraseña</span>
          <input
            type="text"
            className="rounded-lg bg-gray-700 px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm text-white/70">Rol</span>
          <select
            className="rounded-lg bg-gray-700 px-3 py-2"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="client">Cliente</option>
          </select>
        </label>
      </div>

      <div className="flex justify-between pt-2">
        <button
          type="submit"
          className={`rounded-lg px-4 py-2 font-bold ${
            isEdit ? "bg-sky-600" : "bg-green-600"
          }`}
        >
          {isEdit ? "Guardar cambios" : "Crear usuario"}
        </button>
        <div className="flex gap-4">
          {isEdit ? (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg px-4 py-2 font-bold bg-red-600 hover:bg-red-500"
            >
              Borrar
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white"
          >
            Cerrar
          </button>
        </div>
      </div>
    </form>
  );
}

export default function Users() {
  const { user, role, users, setUsers } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    const normalized = searchText.trim().toLowerCase();
    if (!normalized) return users;
    return users.filter((candidate) => {
      return (
        candidate.name?.toLowerCase().includes(normalized) ||
        candidate.username?.toLowerCase().includes(normalized) ||
        candidate.email?.toLowerCase().includes(normalized)
      );
    });
  }, [users, searchText]);

  const openCreate = () => {
    setMode("create");
    setSelectedUser(null);
    setIsOpen(true);
  };

  const openEdit = (user) => {
    setMode("edit");
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleCreateUser = (newUser) => {
    const nextId =
      users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers((prev) => [...prev, { ...newUser, id: nextId }]);
  };

  const handleEditUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((candidate) =>
        candidate.id === selectedUser.id
          ? { ...candidate, ...updatedUser, id: selectedUser.id }
          : candidate
      )
    );
  };

  const handleDeleteUser = (userToDelete) => {
    setUsers((prev) => prev.filter((candidate) => candidate.id !== userToDelete.id));
    setIsOpen(false);
  };

  if (role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 pt-14 h-screen w-screen overflow-hidden">
          <div className="flex gap-5 py-3 px-5 bg-gray-800 rounded-2xl mx-5">
            <input
              type="text"
              className="flex-1 text-center bg-white text-black rounded-md"
              placeholder="Buscar usuario"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="button"
              onClick={openCreate}
              className="bg-green-600 hover:bg-green-500 transition duration-300 px-3 rounded-lg font-bold"
            >
              +
            </button>
          </div>

          <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-5 p-5 bg-gray-700 rounded-t-2xl overflow-y-auto content-start">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((candidate) => (
                <div
                  key={candidate.id}
                  className="cursor-pointer bg-slate-900 hover:bg-gray-800 transition duration-200 rounded-2xl overflow-hidden"
                  onClick={() => openEdit(candidate)}
                >
                  <div className="flex items-center justify-between px-6 py-5">
                    <div>
                      <p className="text-lg font-bold">{candidate.name}</p>
                      <p className="text-sm text-gray-400">@{candidate.username}</p>
                      <p className="text-sm text-gray-400">{candidate.email}</p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-sky-300">
                      {candidate.rol}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 w-full mt-10 col-span-full">
                No se encontraron usuarios
              </p>
            )}
          </div>

          <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <UserForm
              mode={mode}
              user={selectedUser}
              onSubmit={(data) => {
                if (mode === "edit") {
                  handleEditUser(data);
                } else {
                  handleCreateUser(data);
                }
                setIsOpen(false);
              }}
              onDelete={handleDeleteUser}
            />
          </Modal>
        </div>
      </Layout>
    </>
  );
}
