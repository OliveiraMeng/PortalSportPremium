// Tipos do Banco de Dados - Supabase
// Portal Premium Sport

export interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  versao: string;
  ano: number;
  preco: number;
  km: number;
  cambio: string;
  combustivel: string;
  cor: string;
  blindado: boolean;
  foto_capa: string;
  fotos: string[];
  opcionais: string[];
  descricao: string;
}

export interface Anuncio {
  id: string;
  veiculo_id: string;
  status: 'ativo' | 'pendente' | 'vendido';
  data_criacao: string;
}
