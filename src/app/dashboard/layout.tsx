import React from 'react';
import Link from 'next/link';
import { DollarSign, Users, BarChart3, AlertTriangle, Settings, Home, PieChart, CreditCard, LogOut } from 'lucide-react';

/**
 * Componente de layout principal que inclui a barra lateral de navegação
 * e o conteúdo principal da aplicação
 */
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 w-64 transform bg-white shadow-lg transition-transform duration-300 dark:bg-gray-800 lg:translate-x-0">
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-blue-600">
            <BarChart3 className="h-6 w-6" />
            <span className="text-xl">SaaS Metrics</span>
          </Link>
        </div>
        <nav className="space-y-1 px-2 py-4">
          <Link href="/dashboard" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-700">
            <Home className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            Dashboard
          </Link>
          <Link href="/metrics/mrr" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <DollarSign className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            MRR e Receita
          </Link>
          <Link href="/metrics/churn" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <BarChart3 className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            Churn e Retenção
          </Link>
          <Link href="/metrics/customers" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <Users className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            Clientes
          </Link>
          <Link href="/metrics/subscriptions" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <CreditCard className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            Assinaturas
          </Link>
          <Link href="/metrics/defaulters" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
            <AlertTriangle className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
            Inadimplência
          </Link>
          
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link href="/settings" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              <Settings className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              Configurações
            </Link>
            <button className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
              <LogOut className="mr-3 h-5 w-5 text-gray-500 dark:text-gray-400" />
              Sair
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto pl-0 lg:pl-64">
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
            <button className="rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700">
              <span className="sr-only">Abrir menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="flex items-center gap-2 rounded-full bg-gray-100 p-1 text-sm dark:bg-gray-700">
                  <span className="sr-only">Abrir menu de usuário</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <span>JD</span>
                  </div>
                  <span className="hidden md:inline-block">João da Silva</span>
                </button>
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="container mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
