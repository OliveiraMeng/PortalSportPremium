// Componente Card de Veículo - Portal Premium Sport
import Link from 'next/link';
import { Calendar, Gauge, Settings2 } from 'lucide-react';
import { Veiculo } from '@/types/database.types';

interface CardVeiculoProps {
  veiculo: Veiculo;
}

export default function CardVeiculo({ veiculo }: CardVeiculoProps) {
  // Formatar preço para moeda brasileira
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  }).format(veiculo.preco);

  // Formatar KM
  const kmFormatado = new Intl.NumberFormat('pt-BR').format(veiculo.km);

  return (
    <Link href={`/veiculos/${veiculo.id}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-orange-500 transition-all duration-300 group cursor-pointer">
        {/* Imagem do Veículo */}
        <div className="relative aspect-video overflow-hidden bg-slate-800">
          <img
            src={veiculo.foto_capa}
            alt={`${veiculo.marca} ${veiculo.modelo}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badge de Blindado (se aplicável) */}
          {veiculo.blindado && (
            <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              BLINDADO
            </div>
          )}
        </div>

        {/* Corpo do Card */}
        <div className="p-5 space-y-4">
          {/* Título e Versão */}
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-orange-500 transition-colors">
              {veiculo.marca} {veiculo.modelo}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{veiculo.versao}</p>
          </div>

          {/* Especificações */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{veiculo.ano}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={16} />
              <span>{kmFormatado} km</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings2 size={16} />
              <span>{veiculo.cambio}</span>
            </div>
          </div>

          {/* Preço */}
          <div className="pt-3 border-t border-slate-800">
            <p className="text-2xl font-bold text-orange-500">{precoFormatado}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
