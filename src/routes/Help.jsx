import { useState } from 'react';
import Layout from './Layout';

const FAQ_ITEMS = {
  "Contactar soporte": "Formulario",
  "Como funciona el inventario": "Crea, edita y elimina productos desde el catalogo. Usa filtros y busqueda para encontrar rapido lo que necesitas.",
  "Roles y permisos": "Los admins gestionan stock y usuarios. Los clientes solo consultan el catalogo y reciben notificaciones.",
  "Notificaciones y alertas": "Configura avisos de stock minimo y revisa cambios recientes desde la pantalla principal.",
  "Problemas de acceso": "Verifica usuario y contrasena. Si el acceso falla, usa el modo invitado o contacta soporte."
};

export default function Help() {
  const faqEntries = Object.entries(FAQ_ITEMS);
  const [selectedKey, setSelectedKey] = useState(faqEntries[0]?.[0] ?? "");
  const selectedVal = FAQ_ITEMS[selectedKey] ?? "";

  return (
    <>
      <Layout>
        <div className="flex flex-wrap gap-4 pt-14 px-6 pb-6 w-screen overflow-hidden">
          {/* Columna izquierda: opciones */}
          <div className="flex flex-1 flex-col gap-4 h-fit">
            <div className="bg-gray-700 rounded-2xl p-5">
              <p className="font-bold text-white/90 text-lg">Centro de ayuda</p>
              <p className="text-sm text-white/60 mt-1">
                Selecciona un tema o escribe al soporte.
              </p>

              <div className="flex flex-col gap-3 mt-4">
                {faqEntries.map(([key]) => {
                  const isActive = key === selectedKey;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={`group flex items-center justify-between rounded-2xl px-5 py-4 font-semibold transition ${
                        isActive
                          ? 'bg-slate-900 text-white ring-2 ring-white/10'
                          : 'bg-gray-800 text-white/90 hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedKey(key)}
                    >
                      <span className="truncate">{key}</span>
                      <span className="ml-4 text-lg opacity-70 group-hover:opacity-100">
                        ?
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna derecha: FAQ */}
          <div className="flex flex-10 flex-col gap-5 py-5 px-6 min-w-100 bg-gray-700 rounded-2xl">
            {selectedVal === "Formulario" ? (
              <div className="flex items-start gap-6 bg-slate-900 rounded-3xl p-6">
                {/* Avatar */}
                <div className="shrink-0 w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-2 border-white/30" />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white/90 leading-tight">
                    Soporte ManageMe
                  </h2>

                  <div className="mt-4 space-y-2 text-white/70">
                    <p>
                      <span className="font-semibold text-white/80">
                        Email de soporte:
                      </span>{' '}
                      soporte@manageme.es
                    </p>
                    <p>
                      <span className="font-semibold text-white/80">
                        Telefono:
                      </span>{' '}
                      +34 967 253 621
                    </p>
                    <p>
                      <span className="font-semibold text-white/80">
                        Horario:
                      </span>{' '}
                      L-V 9:00 a 18:00
                    </p>
                  </div>

                  {/* Mensaje */}
                  <div className="mt-5">
                    <textarea
                      className="w-full min-h-40 resize-none rounded-2xl bg-gray-800 text-white/90 placeholder:text-white/40
                               border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 p-4"
                      placeholder="Describe tu problema o pregunta..."
                    />
                  </div>

                  {/* Enviar */}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded-xl px-6 py-3 bg-gray-200 text-black font-semibold
                               hover:brightness-95 active:brightness-90 transition"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-6 bg-slate-900 rounded-3xl p-6">
                {/* FAQ */}
                <div className="flex-1 h-100">
                  <h2 className="text-3xl font-bold text-white/90 leading-tight text-center">
                    {selectedKey}
                  </h2>

                  <div className="mt-4 text-white/70 text-center">
                    <p>{selectedVal}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
