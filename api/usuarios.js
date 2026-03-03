// usuarios.js
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function validarLogin(usuario, senha) {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, username, password_hash')
      .eq('username', usuario)
      .single();

    if (error || !data) {
      return { sucesso: false, mensagem: 'Usuário não encontrado' };
    }

    const valido = await bcrypt.compare(senha, data.password_hash);

    if (!valido) {
      return { sucesso: false, mensagem: 'Senha inválida' };
    }

    return { sucesso: true, usuarioId: data.id };
  } catch (err) {
    console.error('Erro Supabase:', err.message);
    return { sucesso: false, mensagem: 'Erro interno' };
  }
}
