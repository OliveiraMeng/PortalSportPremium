// Página Principal - Portal Premium Sport
import Navbar from '@/components/Navbar';
import CardVeiculo from '@/components/CardVeiculo';
import { Veiculo } from '@/types/database.types';
import { Search, MapPin, ChevronDown, Instagram, Facebook, Youtube } from 'lucide-react';

// Dados Mockados - Veículos em Destaque
const VEICULOS_DESTAQUE: Veiculo[] = [
  {
    id: '1',
    marca: 'Porsche',
    modelo: '911 GT3',
    versao: 'GT3 RS 4.0',
    ano: 2024,
    preco: 1850000,
    km: 2500,
    cambio: 'Automático PDK',
    combustivel: 'Gasolina',
    cor: 'Branco Carrara',
    blindado: false,
    foto_capa: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    fotos: [],
    opcionais: ['Bancos Esportivos', 'Suspensão Adaptativa', 'Pacote Fibra de Carbono'],
    descricao: 'Esportivo de alta performance com motor boxer 4.0 naturalmente aspirado.',
  },
  {
    id: '2',
    marca: 'Lamborghini',
    modelo: 'Huracán',
    versao: 'EVO RWD Spyder',
    ano: 2023,
    preco: 2950000,
    km: 1200,
    cambio: 'Automático DCT',
    combustivel: 'Gasolina',
    cor: 'Verde Mantis',
    blindado: false,
    foto_capa: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    fotos: [],
    opcionais: ['Teto Conversível', 'Sistema de Som B&O', 'Rodas 20 polegadas'],
    descricao: 'Super esportivo italiano com motor V10 5.2 e tração traseira.',
  },
  {
    id: '3',
    marca: 'BMW',
    modelo: 'M4',
    versao: 'Competition xDrive',
    ano: 2024,
    preco: 980000,
    km: 800,
    cambio: 'Automático M Steptronic',
    combustivel: 'Gasolina',
    cor: 'Azul São Marino',
    blindado: true,
    foto_capa: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    fotos: [],
    opcionais: ['M Driver Package', 'Suspensão M Adaptativa', 'Teto Solar Panorâmico'],
    descricao: 'Cupê esportivo alemão com motor 6 cilindros biturbo e tração integral.',
  },
  {
    id: '4',
    marca: 'Audi',
    modelo: 'RS6 Avant',
    versao: 'Performance',
    ano: 2024,
    preco: 1250000,
    km: 1500,
    cambio: 'Automático Tiptronic',
    combustivel: 'Gasolina',
    cor: 'Cinza Nardo',
    blindado: false,
    foto_capa: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    fotos: [],
    opcionais: ['Suspensão a Ar', 'Bang & Olufsen 3D', 'Matrix LED'],
    descricao: 'Wagon esportiva com motor V8 4.0 TFSI biturbo e 630 cv de potência.',
  },
];

export default function Home() {
  return (
    <div className="bg-slate-950">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background com Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
            alt="Carro Esportivo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950"></div>
        </div>

        {/* Conteúdo Hero */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tight">
            A EMOÇÃO DE
            <span className="block text-orange-500">PILOTAR</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light">
            Veículos esportivos de alta performance e exclusividade
          </p>

          {/* Barra de Busca Flutuante */}
          <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Input Marca/Modelo */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Marca ou modelo..."
                  className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-lg border border-slate-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
              </div>

              {/* Select Localização */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <select className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-lg border border-slate-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all appearance-none cursor-pointer">
                  <option>Todas as cidades</option>
                  <option>São Paulo</option>
                  <option>Rio de Janeiro</option>
                  <option>Brasília</option>
                  <option>Curitiba</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
              </div>

              {/* Botão Buscar */}
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-orange-600/30">
                BUSCAR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Destaques */}
      <section className="py-20 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Título da Seção */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                ESTOQUE <span className="text-orange-500">PREMIUM</span>
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
            </div>
            <p className="text-slate-400 mt-4 text-lg">
              Seleção exclusiva dos melhores veículos esportivos
            </p>
          </div>

          {/* Grid de Veículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VEICULOS_DESTAQUE.map((veiculo) => (
              <CardVeiculo key={veiculo.id} veiculo={veiculo} />
            ))}
          </div>

          {/* Botão Ver Mais */}
          <div className="text-center mt-12">
            <button className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-12 py-4 rounded-lg border border-slate-700 hover:border-orange-500 transition-all">
              VER TODOS OS VEÍCULOS
            </button>
          </div>
        </div>
      </section>

      {/* Footer Simples */}
      <footer className="bg-black border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">
                SPORT <span className="text-orange-500">PREMIUM</span>
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                © 2025 Portal Premium Sport. Todos os direitos reservados.
              </p>
            </div>

            {/* Redes Sociais */}
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-500 transition-colors">
                <Youtube size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
