import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.text();
  console.log("Cuerpo enviado al servidor:", body);

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyL8CLr9UYjtTIj9V2X07kRuzihw4x7Q0kLh4VlHRzrTvgKgLGlj87fPpQE-N5vW1X8mQ/exec", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const raw = await res.text();
    console.log("Respuesta del servidor:", raw);
    console.log("Código de estado:", res.status);
    console.log("Headers de la respuesta:", Object.fromEntries(res.headers));

    let json;
    try {
      json = JSON.parse(raw);
    } catch (err) {
      return new Response(JSON.stringify({
        ok: false,
        error: "La respuesta del servidor no es JSON válido",
        raw,
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(json), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error en la solicitud:", error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// (opcional) para evitar error si alguien entra por GET
export const GET: APIRoute = async () => {
  return new Response("Este endpoint solo acepta POST.", {
    status: 405,
    headers: { "Content-Type": "text/plain" },
  });
};
