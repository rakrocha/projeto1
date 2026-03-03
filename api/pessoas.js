import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('pessoas').select('*');
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const { bairro, dirigente, saida } = req.body;
      const { error } = await supabase
        .from('pessoas')
        .insert([{ bairro, dirigente, saida }]);
      if (error) throw error;
      return res.status(200).json({ sucesso: true });
    }

    if (req.method === 'DELETE') {
      const id = req.query.id;
      const { error } = await supabase.from('pessoas').delete().eq('id', id);
      if (error) throw error;
      return res.status(200).json({ sucesso: true });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (err) {
    console.error('Erro Supabase:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
