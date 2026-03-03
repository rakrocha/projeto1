import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { usuario, senha } = req.body;

    const { data, error } = await supabase
      .from('usuarios')
      .select('id, username, password_hash')
      .eq('username', usuario)
      .single();

    if (error || !data) {
      return res.status(401).json({ sucesso: false, mensagem: 'Usuário não encontrado' });
    }

    const valido = await bcrypt.compare(senha, data.password_hash);
    if (!valido) {
      return res.status(401).json({ sucesso: false, mensagem: 'Senha inválida' });
    }

    return res.status(200).json({ sucesso: true, usuarioId: data.id });
  }

  return res.status(405).json({ sucesso: false, mensagem: 'Método não permitido' });
}
