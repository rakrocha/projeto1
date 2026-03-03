// usuarios.js
export async function validarLogin(usuario, senha) {
  // Exemplo: consulta uma API que você cria no backend
  const resposta = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  });

  if (!resposta.ok) {
    return { sucesso: false };
  }

  const resultado = await resposta.json();
  return resultado; // deve ser { sucesso: true } ou { sucesso: false }
}
