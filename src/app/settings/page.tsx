import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Página de configuração para integração com Asaas e outras plataformas
 */
export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      </div>

      {/* Configuração de API */}
      <Card>
        <CardHeader>
          <CardTitle>Integração com Asaas</CardTitle>
          <CardDescription>Configure sua integração com a API da Asaas</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="api-key" className="block text-sm font-medium">
                Token de API
              </label>
              <div className="flex">
                <input
                  id="api-key"
                  type="password"
                  placeholder="$aact_YourApiKeyHere"
                  className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue="$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmNkY2FhNjdiLWUyNWYtNDdlOC1iZTVlLWI1ZjUxYTA0MDQxYTo6JGFhY2hfODkzZjBkMTItNGIyZi00YTMwLWFlN2QtNjk4Yzk1ZWYwY2I3"
                />
                <button
                  type="button"
                  className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100"
                >
                  Mostrar
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Encontre seu token de API no painel da Asaas em Configurações &gt; API.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="environment" className="block text-sm font-medium">
                Ambiente
              </label>
              <select
                id="environment"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="sandbox">Sandbox (Testes)</option>
                <option value="production">Produção</option>
              </select>
              <p className="text-xs text-gray-500">
                Use o ambiente Sandbox para testes sem afetar dados reais.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Testar Conexão
              </button>
            </div>

            <div className="rounded-md bg-green-50 p-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Conexão estabelecida com sucesso!
                  </p>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Configurações de Notificações */}
      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>Configure alertas e relatórios automáticos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Relatório diário de MRR</h3>
                <p className="text-xs text-gray-500">
                  Receba um resumo diário do seu MRR e métricas principais.
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Alerta de churn</h3>
                <p className="text-xs text-gray-500">
                  Seja notificado quando um cliente cancelar sua assinatura.
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Alerta de inadimplência</h3>
                <p className="text-xs text-gray-500">
                  Seja notificado quando um pagamento falhar ou estiver atrasado.
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label htmlFor="email" className="block text-sm font-medium">
                E-mail para notificações
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="admin@seudominio.com.br"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Detecção de Churn */}
      <Card>
        <CardHeader>
          <CardTitle>Detecção de Churn</CardTitle>
          <CardDescription>Configure parâmetros para identificação de clientes com risco de churn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="inactivity-threshold" className="block text-sm font-medium">
                Limite de inatividade (dias)
              </label>
              <input
                id="inactivity-threshold"
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="14"
              />
              <p className="text-xs text-gray-500">
                Número de dias sem login para considerar um cliente em risco.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="usage-threshold" className="block text-sm font-medium">
                Limite de uso (%)
              </label>
              <input
                id="usage-threshold"
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="30"
              />
              <p className="text-xs text-gray-500">
                Percentual mínimo de uso do produto para não considerar em risco.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="payment-failures" className="block text-sm font-medium">
                Falhas de pagamento
              </label>
              <input
                id="payment-failures"
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="2"
              />
              <p className="text-xs text-gray-500">
                Número de falhas de pagamento para considerar um cliente em risco.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Salvar Configurações
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configurações da Conta */}
      <Card>
        <CardHeader>
          <CardTitle>Conta</CardTitle>
          <CardDescription>Gerencie suas informações de conta</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue="João da Silva"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  defaultValue="joao@empresa.com.br"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-medium">
                Empresa
              </label>
              <input
                id="company"
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                defaultValue="Meu Micro-SaaS"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
