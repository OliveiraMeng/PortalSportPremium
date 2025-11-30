// API de Anúncios - Portal Premium Sport
// Service Layer para centralizar chamadas ao Supabase

import { supabase } from '@/lib/supabase';
import { AnuncioComVeiculo, Veiculo } from '@/types/database.types';

/**
 * Busca todos os anúncios ativos com os dados dos veículos associados
 * @returns Lista de anúncios ativos com informações completas dos veículos
 */
export async function buscarAnunciosAtivos(): Promise<AnuncioComVeiculo[]> {
  try {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*, veiculos(*)')
      .eq('status', 'ativo')
      .order('data_criacao', { ascending: false });

    if (error) {
      console.error('Erro ao buscar anúncios ativos:', error);
      
      // Se a tabela anuncios não existir, buscar diretamente da tabela veiculos
      if (error.code === 'PGRST116' || error.message.includes('relation') || error.message.includes('does not exist')) {
        console.log('Tabela anuncios não encontrada, buscando diretamente de veiculos...');
        return buscarVeiculosDirecto();
      }
      
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Erro na função buscarAnunciosAtivos:', error);
    
    // Fallback: tentar buscar diretamente dos veículos
    return buscarVeiculosDirecto();
  }
}

/**
 * Busca direta dos veículos (fallback quando tabela anuncios não existe)
 * @returns Lista de veículos formatados como anúncios
 */
async function buscarVeiculosDirecto(): Promise<AnuncioComVeiculo[]> {
  try {
    const { data, error } = await supabase
      .from('veiculos')
      .select('*')
      .order('ano', { ascending: false })
      .limit(8);

    if (error) {
      console.error('Erro ao buscar veículos:', error);
      throw error;
    }

    // Transforma veículos em formato de anúncio
    return (data || []).map((veiculo: Veiculo) => ({
      id: veiculo.id,
      veiculo_id: veiculo.id,
      status: 'ativo' as const,
      data_criacao: new Date().toISOString(),
      veiculos: veiculo,
    }));
  } catch (error) {
    console.error('Erro ao buscar veículos direto:', error);
    return [];
  }
}

/**
 * Busca um anúncio específico pelo ID com os dados do veículo
 * @param id - ID do anúncio
 * @returns Anúncio com informações completas do veículo ou null
 */
export async function buscarAnuncioPorId(id: string): Promise<AnuncioComVeiculo | null> {
  try {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*, veiculos(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Erro ao buscar anúncio por ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Erro na função buscarAnuncioPorId:', error);
    return null;
  }
}
