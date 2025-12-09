const API_URL = "https://v6nzc8wz0i.execute-api.us-east-1.amazonaws.com";

export async function alterarSenha(email, senhaAtual, novaSenha) {
  try {
    const response = await fetch(`${API_URL}/alterarSenha`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        senhaAntiga: senhaAtual, 
        novaSenha,
      }),
    });

    const data = await response.json();
    return data; // contém .message ou .error
  } catch (err) {
    return { error: "Erro ao conectar com o servidor" };
  }
}
