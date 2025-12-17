import { useState } from 'react';
import Layout from './Layout';

const FAQ_ITEMS = {
  "Tengo una pregunta": "Formulario",
  "Ayuda": "help help help help help help help help help ",
  "¿Por qué no va nada?": "why nothing works why nothing works why nothing works why nothing works why nothing works why nothing works why nothing works ",
  "¿Qué puedo hacer con...?": "What can I do with...? What can I do with...? What can I do with...? What can I do with...? What can I do with...? What can I do with...?",
  "Soy admin": "I am admin I am admin I am admin I am admin I am admin I am admin I am admin I am admin I am admin I am admin I am admin I am admin I am admin I am admin",
};

export default function Help() {
  const faqEntries = Object.entries(FAQ_ITEMS);
  const [selectedKey, setSelectedKey] = useState(faqEntries[0]?.[0] ?? "");
  const selectedVal = FAQ_ITEMS[selectedKey] ?? "";

  return (
    <>
      <Layout>
        <div className="flex flex-wrap gap-4 pt-20 px-10 pb-5">
          {/* Columna izquierda: opciones */}
          <div className="flex flex-1 flex-col gap-4 top-20 h-fit">
            <div className="bg-gray-700 rounded-2xl p-4">
              <p className="font-bold text-white/90 mb-3">Soporte</p>

              <div className="flex flex-col gap-3">
                {faqEntries.map(([key]) => (
                  <button
                    type="button"
                    className="group flex items-center justify-between rounded-2xl px-5 py-5 bg-button-add font-semibold text-black
                               hover:brightness-110 active:brightness-95 transition"
                    onClick={() => setSelectedKey(key)}
                  >
                    <span className="truncate">{key}</span>
                    <span className="ml-4 text-xl opacity-80 group-hover:opacity-100">
                      ›
                    </span>
                  </button>
                ))}
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
                    admin
                  </h2>

                  <div className="mt-4 space-y-2 text-white/70">
                    <p>
                      <span className="font-semibold text-white/80">
                        Email de soporte:
                      </span>{" "}
                      soporte@manageme.es
                    </p>
                    <p>
                      <span className="font-semibold text-white/80">
                        Teléfono de soporte:
                      </span>{" "}
                      +34 967 253 621
                    </p>
                  </div>

                  {/* Mensaje */}
                  <div className="mt-5">
                    <textarea
                      className="w-full min-h-40 resize-none rounded-2xl bg-gray-800 text-white/90 placeholder:text-white/40
                               border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 p-4"
                      placeholder="Escribe tu mensaje..."
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

                  <div className="mt-4 space-y-2 text-white/70 text-center">
                    <p>
                      {selectedVal}
                    </p>
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
