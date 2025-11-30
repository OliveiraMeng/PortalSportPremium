// Página de Detalhes do Veículo - Portal Premium Sport
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, Gauge, Settings2, Fuel, Check, MessageCircle, Eye, Shield, Palette, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Veiculo } from '@/types/database.types';

export default function VeiculoDetalhes({ params }: { params: { id: string } }) {
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    buscarVeiculo();
  }, [params.id]);

  async function buscarVeiculo() {
    try {
      setLoading(true);
      setErro(false);

      const { data, error } = await supabase
        .from('veiculos')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Erro ao buscar veículo:', error);
        setErro(true);
        return;
      }

      if (!data) {
        setErro(true);
        return;
      }

      setVeiculo(data);
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  // Tela de Carregamento
  if (loading) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-orange-500 animate-spin mx-auto mb-4" size={48} />
          <p className="text-slate-400 text-lg">Carregando veículo...</p>
        </div>
      </div>
    );
  }

  // Tela de Erro
  if (erro || !veiculo) {
    return (
      <div className="bg-slate-950 min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-32 pb-12 px-4">
          <div className="text-center max-w-md">
            <AlertCircle className="text-orange-500 mx-auto mb-4" size={64} />
            <h1 className="text-3xl font-bold text-white mb-4">Veículo não encontrado</h1>
            <p className="text-slate-400 mb-8">
              O veículo que você está procurando não existe ou foi removido.
            </p>
            <Link
              href="/"
              className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Formatar preço
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(veiculo.preco);

  // Formatar KM
  const kmFormatado = new Intl.NumberFormat('pt-BR').format(veiculo.km);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Container Principal */}
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/comprar" className="hover:text-orange-500 transition-colors">
              Comprar
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">{veiculo.marca} {veiculo.modelo}</span>
          </div>

          {/* Grid Assimétrico */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda - 65% (2 colunas do grid) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Galeria de Imagens */}
              <div className="space-y-4">
                {/* Imagem Principal */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={veiculo.foto_capa}
                    alt={`${veiculo.marca} ${veiculo.modelo}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {veiculo.fotos && veiculo.fotos.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {veiculo.fotos.map((foto, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 cursor-pointer hover:ring-2 hover:ring-orange-500 transition-all"
                      >
                        <img
                          src={foto}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Descrição */}
              {veiculo.descricao && (
                <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-orange-500">●</span> Descrição
                  </h2>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {veiculo.descricao}
                  </div>
                </div>
              )}

              {/* Opcionais */}
              {veiculo.opcionais && veiculo.opcionais.length > 0 && (
                <div className="bg-slate-900 rounded-xl p-8 border border-slate-800">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-orange-500">●</span> Equipamentos e Opcionais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {veiculo.opcionais.map((opcional, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-slate-300">{opcional}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Coluna Direita - 35% (1 coluna do grid) - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Card Principal de Informações */}
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                  {/* Marca e Modelo */}
                  <div className="mb-4">
                    <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider mb-1">
                      {veiculo.marca}
                    </p>
                    <h1 className="text-4xl font-black text-white leading-tight">
                      {veiculo.modelo}
                    </h1>
                    <p className="text-slate-400 mt-1">{veiculo.versao}</p>
                  </div>

                  {/* Preço */}
                  <div className="mb-6 pb-6 border-b border-slate-800">
                    <p className="text-5xl font-bold text-orange-500">{precoFormatado}</p>
                    <p className="text-slate-400 text-sm mt-2">À vista ou parcelado</p>
                  </div>

                  {/* Grid de Especificações Técnicas */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {/* Ano */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <Calendar className="text-orange-500 mb-2" size={20} />
                      <p className="text-slate-400 text-xs mb-1">Ano</p>
                      <p className="text-white font-bold">{veiculo.ano}</p>
                    </div>

                    {/* Quilometragem */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <Gauge className="text-orange-500 mb-2" size={20} />
                      <p className="text-slate-400 text-xs mb-1">Km</p>
                      <p className="text-white font-bold">{kmFormatado}</p>
                    </div>

                    {/* Câmbio */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <Settings2 className="text-orange-500 mb-2" size={20} />
                      <p className="text-slate-400 text-xs mb-1">Câmbio</p>
                      <p className="text-white font-bold text-sm">{veiculo.cambio}</p>
                    </div>

                    {/* Combustível */}
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                      <Fuel className="text-orange-500 mb-2" size={20} />
                      <p className="text-slate-400 text-xs mb-1">Combustível</p>
                      <p className="text-white font-bold text-sm">{veiculo.combustivel}</p>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 text-slate-300 text-sm">
                      <Palette className="text-orange-500" size={18} />
                      <span>{veiculo.cor}</span>
                    </div>
                    {veiculo.blindado && (
                      <div className="flex items-center gap-3 text-slate-300 text-sm">
                        <Shield className="text-orange-500" size={18} />
                        <span>Veículo Blindado</span>
                      </div>
                    )}
                  </div>

                  {/* Botões de Ação */}
                  <div className="space-y-3">
                    {/* WhatsApp */}
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/30">
                      <MessageCircle size={20} />
                      TENHO INTERESSE
                    </button>

                    {/* Agendar Visita */}
                    <button className="w-full bg-transparent hover:bg-slate-800 text-white font-semibold py-4 rounded-lg border-2 border-orange-500 hover:border-orange-600 flex items-center justify-center gap-2 transition-all">
                      <Eye size={20} />
                      AGENDAR VISITA
                    </button>
                  </div>
                </div>

                {/* Card de Aviso */}
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <p className="text-slate-400 text-xs text-center">
                    <span className="text-orange-500 font-semibold">ID do Anúncio:</span> {params.id}
                  </p>
                  <p className="text-slate-500 text-xs text-center mt-2">
                    Todas as informações foram verificadas pelo vendedor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
