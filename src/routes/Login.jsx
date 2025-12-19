import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password.trim()) {
      setError("Completa usuario/email y contraseña.");
      return;
    }

    setIsSubmitting(true);
    const result = login(identifier, password);
    setIsSubmitting(false);

    if (!result?.success) {
      setError(result?.message || "No se pudo iniciar sesión.");
      return;
    }

    navigate("/");
  };

  const handleGuest = () => {
    navigate("/");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gray-900/70 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left panel */}
          <div className="hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-gray-800 to-slate-950">
            <div>
              <p className="text-white/90 text-2xl font-extrabold tracking-tight">
                ManageMe
              </p>
              <p className="mt-3 text-white/60 leading-relaxed">
                Control de usuarios, stock y notificaciones en un mismo sitio.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2">
              <p className="text-sm text-white/70">
                Consejo: usa el menú superior para navegar por la app una vez
                hayas iniciado sesión.
              </p>
              <p className="text-xs text-white/50">
                Admin: alice/bob (admin123) · Clientes: charlie/diana/ethan/fiona/george (client123)
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-8 md:p-10 bg-gray-900/40">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white/90">
                Iniciar sesión
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Introduce tus credenciales para continuar.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Usuario / Email
                </label>
                <input
                  className="w-full rounded-xl bg-gray-800 text-white/90 placeholder:text-white/30 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="alice o alice@manageme.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-white/80">
                    Contraseña
                  </label>
                  <span className="text-xs text-white/50">Usa admin123 o client123</span>
                </div>
                <input
                  type="password"
                  className="w-full rounded-xl bg-gray-800 text-white/90 placeholder:text-white/30 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-white/70 select-none">
                <input type="checkbox" defaultChecked className="accent-white" />
                Recuérdame
              </label>

              {error ? (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 text-red-100 px-4 py-3 text-sm">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className="w-full rounded-xl bg-white text-black font-semibold px-4 py-3 hover:brightness-95 active:brightness-90 transition disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>

              <div className="flex items-center gap-3 pt-2">
                <div className="h-px flex-1 bg-white/10" />
                <p className="text-xs text-white/40">o</p>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-gray-800 text-white/90 font-semibold px-4 py-3 border border-white/10 hover:bg-gray-800/80 transition"
                onClick={handleGuest}
              >
                Continuar como invitado
              </button>

              <p className="text-sm text-white/60 text-center pt-2">
                ¿No tienes cuenta?{" "}
                <span className="text-white/80">Habla con un admin</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
