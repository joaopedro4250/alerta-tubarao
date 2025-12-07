// src/apiAtaques.js
const BASE = "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com";

async function request(path, body) {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  // tenta parsear JSON e retornar
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: "Resposta inválida do servidor", raw: text };
  }
}

export function listarAtaques() {
  // se implementou listar via POST com acao listar, adapte aqui; caso contrário use endpoint apropriado
  return request("gerenciarAtaque", { acao: "listar" });
}

export function adicionarAtaque(payload) {
  return request("gerenciarAtaque", { acao: "adicionar", ...payload });
}

export function atualizarAtaque(payload) {
  return request("gerenciarAtaque", { acao: "atualizar", ...payload });
}

export function deletarAtaque(id) {
  return request("gerenciarAtaque", { acao: "deletar", id });
}

export function listarPraias() {
  return request("getPraias", {}); // se getPraias for GET, adapte para fetch GET
}
