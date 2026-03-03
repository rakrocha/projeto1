// usuarios.js
export async function validarLogin(usuario, senha) {
  try {
    const resposta = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, senha })
    });

    if (!resposta.ok) {
      return { sucesso: false, mensagem: 'Erro na requisição' };
    }

    const resultado = await resposta.json();
    return resultado; // { sucesso: true, usuarioId: ... } ou { sucesso: false }
  } catch (err) {
    console.error('Erro ao validar login:', err);
    return { sucesso: false, mensagem: 'Erro interno' };
  }
}
