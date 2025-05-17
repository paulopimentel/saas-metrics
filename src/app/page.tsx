import React from 'react';
import Link from 'next/link';

/**
 * Página inicial que redireciona para o dashboard
 * Serve como ponto de entrada para a aplicação
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6 text-center">
      <div className="max-w-3xl">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-blue-600">
          SaaS Metrics Dashboard
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Acompanhe o desempenho do seu Micro-SaaS com métricas em tempo real, 
          integração com Asaas e detecção inteligente de churn.
        </p>
        
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
          >
            Acessar Dashboard
          </Link>
          <Link 
            href="/settings" 
            className="rounded-lg border border-blue-600 bg-white px-6 py-3 text-lg font-medium text-blue-600 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
          >
            Configurar Integração
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Métricas Essenciais</h3>
            <p className="text-gray-600">
              MRR, churn, retenção, inadimplência e outras métricas vitais para seu negócio.
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Integração com Asaas</h3>
            <p className="text-gray-600">
              Conecte-se facilmente com sua conta Asaas para dados em tempo real.
            </p>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">Prevenção de Churn</h3>
            <p className="text-gray-600">
              Identifique clientes em risco antes que eles cancelem suas assinaturas.
            </p>
          </div>
        </div>
        
        <p className="mt-12 text-sm text-gray-500">
          Desenvolvido para empreendedores de Micro-SaaS que valorizam decisões baseadas em dados.
        </p>
      </div>
    </div>
  );
}
