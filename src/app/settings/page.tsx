'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createAsaasService } from '@/lib/asaas-service';

/**
 * Página de configuração para integração com Asaas e outras plataformas
 */
export default function SettingsPage() {
  // Estados para gerenciar os valores dos campos e feedback
  const [apiToken, setApiToken] = useState('$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmUzY2ZhN2NiLTc0Y2UtNDFlYS04MDk5LTkwNDJmMTdmYTc5Zjo6JGFhY2hfMzRiZjY1NTgtYjk3Zi00OGFjLTg5ZTMtN2VlM2ZiYzQ0NDUy');
  const [environment, setEnvironment] = useState('sandbox');
  const [showToken, setShowToken] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    tested: false,
    success: false,
    message: ''
  });
  const [loading, setLoading] = useState(false);
  
  // Estados para notificações
  const [dailyReport, setDailyReport] = useState(true);
  const [churnAlert, setChurnAlert] = useState(true);
  const [defaultAlert, setDefaultAlert] = useState(true);
  const [notificationEmail, setNotificationEmail] = useState('admin@seudominio.com.br');
  
  // Estados para detecção de churn
  const [inactivityThreshold, setInactivityThreshold] = useState(14);
  const [usageThreshold, setUsageThreshold] = useState(30);
  const [paymentFailures, setPaymentFailures] = useState(2);
  
  // Estados para conta
  const [name, setName] = useState('João da Silva');
  const [email, setEmail] = useState('joao@empresa.com.br');
  const [company, setCompany] = useState('Meu Micro-SaaS');

  // Testar conexão com a API Asaas
  const testConnection = async () => {
    setLoading(true);
    try {
      const asaasService = createAsaasService({
        token: apiToken,
        environment: environment
      });
      
      const isConnected = await asaasService.testConnection();
      
      if (isConnected) {
        setConnectionStatus({
          tested: true,
          success: true,
          message: 'Conexão estabelecida com sucesso!'
        });
      } else {
        setConnectionStatus({
          tested: true,
          success: false,
          message: 'Não foi possível conectar à API da Asaas. Verifique o token e o ambiente.'
        });
      }
    } catch (error) {
      setConnectionStatus({
        tested: true,
        success: false,
        message: `Erro ao conectar: ${error.message}`
      });
    } finally {
      setLoading(false);
    }
  };

  // Testar conexão ao carregar a página
  useEffect(() => {
    testConnection();
  }, []);

  // Salvar configurações de notificações
  const saveNotificationSettings = () => {
    // Aqui seria implementada a lógica para salvar as configurações
    alert('Configurações de notificações salvas com sucesso!');
  };

  // Salvar configurações de detecção de churn
  const saveChurnSettings = () => {
    // Aqui seria implementada a lógica para salvar as configurações
    alert('Configurações de detecção de churn salvas com sucesso!');
  };

  // Salvar configurações de conta
  const saveAccountSettings = () => {
    // Aqui seria implementada a lógica para salvar as configurações
    alert('Configurações de conta salvas com sucesso!');
  };

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
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); testConnection(); }}>
            <div className="space-y-2">
              <label htmlFor="api-key" className="block text-sm font-medium">
                Token de API
              </label>
              <div className="flex">
                <input
                  id="api-key"
                  type={showToken ? "text" : "password"}
                  placeholder="$aact_YourApiKeyHere"
                  className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
                <button
                  type="button"
                  className="rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => setShowToken(!showToken)}
                >
                  {showToken ? 'Ocultar' : 'Mostrar'}
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
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
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
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading}
              >
                {loading ? 'Testando...' : 'Testar Conexão'}
              </button>
            </div>

            {connectionStatus.tested && (
              <div className={`rounded-md ${connectionStatus.success ? 'bg-green-50' : 'bg-red-50'} p-3`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {connectionStatus.success ? (
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
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${connectionStatus.success ? 'text-green-800' : 'text-red-800'}`}>
                      {connectionStatus.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
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
                  <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={dailyReport}
                    onChange={() => setDailyReport(!dailyReport)}
                  />
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
                  <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={churnAlert}
                    onChange={() => setChurnAlert(!churnAlert)}
                  />
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
                  <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={defaultAlert}
                    onChange={() => setDefaultAlert(!defaultAlert)}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300"></div>
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <label htmlFor="notification-email" className="block text-sm font-medium">
                E-mail para notificações
              </label>
              <input
                id="notification-email"
                type="email"
                placeholder="seu@email.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={saveNotificationSettings}
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
                value={inactivityThreshold}
                onChange={(e) => setInactivityThreshold(parseInt(e.target.value))}
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
                value={usageThreshold}
                onChange={(e) => setUsageThreshold(parseInt(e.target.value))}
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
                value={paymentFailures}
                onChange={(e) => setPaymentFailures(parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-500">
                Número de falhas de pagamento para considerar um cliente em risco.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={saveChurnSettings}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="account-email" className="block text-sm font-medium">
                  E-mail
                </label>
                <input
                  id="account-email"
                  type="email"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={saveAccountSettings}
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
