// Componente Navbar - Portal Premium Sport
'use client';

import Link from 'next/link';
import { Menu, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              SPORT <span className="text-orange-500">PREMIUM</span>
            </span>
          </Link>

          {/* Links de Navegação - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/comprar"
              className="text-slate-300 hover:text-orange-500 transition-colors font-medium"
            >
              Comprar
            </Link>
            <Link
              href="/vender"
              className="text-slate-300 hover:text-orange-500 transition-colors font-medium"
            >
              Vender
            </Link>
            <Link
              href="/servicos"
              className="text-slate-300 hover:text-orange-500 transition-colors font-medium"
            >
              Serviços
            </Link>
          </div>

          {/* Botões - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-slate-300 hover:text-white transition-colors flex items-center space-x-2"
            >
              <User size={20} />
              <span>Entrar</span>
            </Link>
            <Link
              href="/anunciar"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              ANUNCIAR
            </Link>
          </div>

          {/* Menu Mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden text-white p-2"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Menu Mobile Expandido */}
      {menuAberto && (
        <div className="md:hidden bg-slate-900 border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/comprar"
              className="block text-slate-300 hover:text-orange-500 transition-colors font-medium"
            >
              Comprar
            </Link>
            <Link
              href="/vender"
              className="block text-slate-300 hover:text-orange-500 transition-colors font-medium"
            >
              Vender
            </Link>
            <Link
              href="/servicos"
              className="block text-slate-300 hover:text-orange-500 transition-colors font-medium"
            >
              Serviços
            </Link>
            <Link
              href="/login"
              className="block text-slate-300 hover:text-white transition-colors flex items-center space-x-2"
            >
              <User size={20} />
              <span>Entrar</span>
            </Link>
            <Link
              href="/anunciar"
              className="block bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold text-center transition-colors"
            >
              ANUNCIAR
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
