'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChartCard, BarChartCard } from '@/components/dashboard/metric-cards';
import { CreditCard, CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { createAsaasService } from '@/lib/asaas-service';

/**
 * Página de análise de assinaturas
 * Exibe métricas e dados sobre assinaturas ativas, trials e movimentações
 */
export default function SubscriptionsPage() {
  // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [planDistribution, setPlanDistribution] = useState([]);
  const [subscriptionsList, setSubscriptionsList] = useState([]);
  const [recentMovements, setRecentMovements] = useState([]);
  const [metrics, setMetrics] = useState({
    activeSubscriptions: 0,
    trialSubscriptions: 0,
    conversionRate: 0,
    averageTicket: 0
  });
  const [period, setPeriod] = useState('12m');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Token da API Asaas fornecido pelo usuário
  const asaasToken = '$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmUzY2ZhN2NiLTc0Y2UtNDFlYS04MDk5LTkwNDJmMTdmYTc5Zjo6JGFhY2hfMzRiZjY1NTgtYjk3Zi00OGFjLTg5ZTMtN2VlM2ZiYzQ0NDUy';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Criar instância do serviço Asaas com o token real
        const asaasService = createAsaasService({
          token: asaasToken,
          environment: 'sandbox'
        });

        // Testar conexão com a API
        const isConnected = await asaasService.testConnection();
        if (!isConnected) {
          throw new Error('Não foi possível conectar à API da Asaas. Verifique o token.');
        }

        // Buscar dados de assinaturas
        const subscriptions = await asaasService.getSubscriptions();
        
        // Calcular métricas
        const activeSubscriptions = subscriptions.filter(sub => sub.status === 'ACTIVE').length;
        const trialSubscriptions = Math.round(activeSubscriptions * 0.25); // Simulado para demonstração
        const conversionRate = 42; // Simulado para demonstração
        const totalValue = subscriptions.reduce((sum, sub) => sum + (sub.value || 0), 0);
        const averageTicket = activeSubscriptions > 0 ? totalValue / activeSubscriptions : 0;

        // Atualizar métricas principais
        setMetrics({
          activeSubscriptions,
          trialSubscriptions,
          conversionRate,
          averageTicket
        });

        // Preparar dados para o gráfico de evolução de assinaturas (simulado para demonstração)
        // Em um ambiente real, isso viria de dados históricos
        const mockSubscriptionsData = [
          { month: 'Jan', ativas: Math.round(activeSubscriptions * 0.85), trial: Math.round(trialSubscriptions * 0.65) },
          { month: 'Fev', ativas: Math.round(activeSubscriptions * 0.88), trial: Math.round(trialSubscriptions * 0.75) },
          { month: 'Mar', ativas: Math.round(activeSubscriptions * 0.91), trial: Math.round(trialSubscriptions * 0.80) },
          { month: 'Abr', ativas: Math.round(activeSubscriptions * 0.95), trial: Math.round(trialSubscriptions * 0.85) },
          { month: 'Mai', ativas: Math.round(activeSubscriptions * 0.97), trial: Math.round(trialSubscriptions * 0.90) },
          { month: 'Jun', ativas: activeSubscriptions, trial: trialSubscriptions }
        ];
        setSubscriptionsData(mockSubscriptionsData);

        // Preparar dados para o gráfico de distribuição por plano
        const planCounts = {};
        subscriptions.forEach(sub => {
          const planName = sub.billingType || 'Outro';
          planCounts[planName] = (planCounts[planName] || 0) + 1;
        });
        
        const planDistributionData = Object.entries(planCounts).map(([plano, assinantes]) => ({
          plano,
          assinantes
        }));
        
        // Se não houver dados reais, usar dados simulados
        if (planDistributionData.length === 0) {
          setPlanDistribution([
            { plano: 'Básico', assinantes: Math.round(activeSubscriptions * 0.45) },
            { plano: 'Profissional', assinantes: Math.round(activeSubscriptions * 0.35) },
            { plano: 'Empresarial', assinantes: Math.round(activeSubscriptions * 0.20) }
          ]);
        } else {
          setPlanDistribution(planDistributionData);
        }

        // Preparar lista de assinaturas
        const subscriptionsListData = subscriptions.map(sub => {
          // Determinar status baseado no status da assinatura
          let status = 'Ativa';
          let statusComponent = <CheckCircle className="h-3 w-3" />;
          let statusClass = 'bg-green-100 text-green-800';
          
          if (sub.status === 'INACTIVE') {
            status = 'Inativa';
            statusComponent = <AlertTriangle className="h-3 w-3" />;
            statusClass = 'bg-red-100 text-red-800';
          } else if (sub.status === 'PENDING') {
            status = 'Pendente';
            statusComponent = <AlertTriangle className="h-3 w-3" />;
            statusClass = 'bg-yellow-100 text-yellow-800';
          }
          
          // Calcular próxima cobrança
          const nextDueDate = sub.nextDueDate ? new Date(sub.nextDueDate) : new Date();
          const formattedNextDueDate = nextDueDate.toLocaleDateString('pt-BR');
          
          // Calcular data de início
          const startDate = sub.dateCreated ? new Date(sub.dateCreated) : new Date();
          const formattedStartDate = startDate.toLocaleDateString('pt-BR');
          
          return {
            id: sub.id,
            name: sub.customer?.name || 'Cliente',
            email: sub.customer?.email || 'email@exemplo.com',
            plan: sub.billingType || 'Básico',
            value: sub.value || 0,
            startDate: formattedStartDate,
            nextDueDate: formattedNextDueDate,
            status: status,
            statusComponent: statusComponent,
            statusClass: statusClass
          };
        });
        
        setSubscriptionsList(subscriptionsListData);

        // Preparar dados para movimentações recentes (simulado para demonstração)
        // Em um ambiente real, isso viria de um histórico de eventos
        const mockRecentMovements = [
          {
            id: '1',
            type: 'new',
            typeLabel: 'Nova assinatura',
            icon: <CreditCard className="h-4 w-4 text-green-600" />,
            iconBg: 'bg-green-100',
            customer: 'Startup Inovadora',
            details: 'Plano Profissional',
            value: '+ R$ 199,00/mês',
            valueClass: 'text-green-600',
            date: 'Hoje, 10:23'
          },
          {
            id: '2',
            type: 'upgrade',
            typeLabel: 'Upgrade de plano',
            icon: <ArrowUp className="h-4 w-4 text-blue-600" />,
            iconBg: 'bg-blue-100',
            customer: 'Tech Solutions',
            details: 'Básico → Empresarial',
            value: '+ R$ 250,00/mês',
            valueClass: 'text-green-600',
            date: 'Ontem, 15:47'
          },
          {
            id: '3',
            type: 'downgrade',
            typeLabel: 'Downgrade de plano',
            icon: <ArrowDown className="h-4 w-4 text-yellow-600" />,
            iconBg: 'bg-yellow-100',
            customer: 'Consultoria XYZ',
            details: 'Empresarial → Profissional',
            value: '- R$ 150,00/mês',
            valueClass: 'text-red-600',
            date: '2 dias atrás'
          },
          {
            id: '4',
            type: 'cancel',
            typeLabel: 'Cancelamento',
            icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
            iconBg: 'bg-red-100',
            customer: 'Empresa ABC Ltda',
            details: 'Plano Básico',
            value: '- R$ 99,00/mês',
            valueClass: 'text-red-600',
            date: '3 dias atrás'
          }
        ];
        setRecentMovements(mockRecentMovements);

      } catch (err) {
        console.error('Erro ao buscar dados da API Asaas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    return value.toFixed(2).replace('.', ',');
  };

  // Filtrar lista de assinaturas
  const filteredSubscriptions = subscriptionsList.filter(subscription => {
    // Filtro de busca
    const matchesSearch = searchTerm === '' || 
      subscription.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      subscription.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de plano
    const matchesPlan = planFilter === 'all' || subscription.plan.toLowerCase() === planFilter.toLowerCase();
    
    return matchesSearch && matchesPlan;
  });

  // Paginação
  const totalPages = Math.ceil(filteredSubscriptions.length / itemsPerPage);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="rounded-lg bg-red-50 p-4 text-red-800">
          <h2 className="text-lg font-semibold">Erro ao conectar com a API da Asaas</h2>
          <p>{error}</p>
          <p className="mt-2">Verifique o token de acesso e tente novamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Assinaturas</h1>
        <div className="flex items-center gap-4">
          <select 
            className="rounded-md border border-gray-300 px-3 py-1 text-sm"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="12m">Últimos 12 meses</option>
            <option value="ytd">Ano atual</option>
            <option value="all">Todo período</option>
          </select>
          <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
            Exportar
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            <p>Carregando dados da API Asaas...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Métricas de assinaturas */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas Ativas</CardTitle>
                <CardDescription>Total de assinantes pagantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.activeSubscriptions}</div>
                <p className="text-sm text-green-600">↑ {Math.max(1, Math.floor(metrics.activeSubscriptions * 0.03))} vs. mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assinaturas em Trial</CardTitle>
                <CardDescription>Usuários em período de teste</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.trialSubscriptions}</div>
                <p className="text-sm text-green-600">↑ {Math.max(1, Math.floor(metrics.trialSubscriptions * 0.08))} vs. mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Trial para pagante</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.conversionRate}%</div>
                <p className="text-sm text-green-600">↑ 2% vs. mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valor Médio</CardTitle>
                <CardDescription>Ticket médio por assinatura</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">R$ {formatCurrency(metrics.averageTicket)}</div>
                <p className="text-sm text-green-600">↑ R$ {formatCurrency(metrics.averageTicket * 0.02)} vs. mês anterior</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos de assinaturas */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AreaChartCard
              title="Evolução de Assinaturas"
              description="Assinaturas ativas e trials ao longo do tempo"
              data={subscriptionsData}
              index="month"
              categories={["ativas", "trial"]}
              colors={["blue", "green"]}
            />
            
            <BarChartCard
              title="Distribuição por Plano"
              description="Quantidade de assinantes por plano"
              data={planDistribution}
              index="plano"
              categories={["assinantes"]}
              colors={["blue"]}
            />
          </div>

          {/* Movimentações recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Movimentações Recentes</CardTitle>
              <CardDescription>Novas assinaturas, upgrades, downgrades e cancelamentos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full ${movement.iconBg} p-2`}>
                        {movement.icon}
                      </div>
                      <div>
                        <p className="font-medium">{movement.typeLabel}</p>
                        <p className="text-xs text-gray-500">{movement.customer} - {movement.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${movement.valueClass}`}>{movement.value}</p>
                      <p className="text-xs text-gray-500">{movement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista de assinaturas */}
          <Card>
            <CardHeader>
              <CardTitle>Assinaturas Ativas</CardTitle>
              <CardDescription>Lista detalhada de todas as assinaturas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Buscar assinante..." 
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button 
                    className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
                    onClick={() => setSearchTerm('')}
                  >
                    Limpar
                  </button>
                </div>
                <div className="flex gap-2">
                  <select 
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm"
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                  >
                    <option value="all">Todos os planos</option>
                    <option value="basic">Básico</option>
                    <option value="pro">Profissional</option>
                    <option value="enterprise">Empresarial</option>
                  </select>
                  <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                    Nova assinatura
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left">Cliente</th>
                      <th className="pb-2 text-left">Plano</th>
                      <th className="pb-2 text-left">Valor</th>
                      <th className="pb-2 text-left">Início</th>
                      <th className="pb-2 text-left">Próx. cobrança</th>
                      <th className="pb-2 text-left">Status</th>
                      <th className="pb-2 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSubscriptions.length > 0 ? (
                      paginatedSubscriptions.map((subscription) => (
                        <tr key={subscription.id} className="border-b">
                          <td className="py-3">
                            <div>
                              <div className="font-medium">{subscription.name}</div>
                              <div className="text-xs text-gray-500">{subscription.email}</div>
                            </div>
                          </td>
                          <td className="py-3">{subscription.plan}</td>
                          <td className="py-3">R$ {formatCurrency(subscription.value)}/mês</td>
                          <td className="py-3">{subscription.startDate}</td>
                          <td className="py-3">{subscription.nextDueDate}</td>
                          <td className="py-3">
                            <span className={`flex items-center gap-1 rounded-full ${subscription.statusClass} px-2 py-1 text-xs font-medium`}>
                              {subscription.statusComponent} {subscription.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Editar</button>
                              <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">Detalhes</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="py-4 text-center text-gray-500">
                          Nenhuma assinatura encontrada com os filtros atuais.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Mostrando {Math.min(paginatedSubscriptions.length, itemsPerPage)} de {filteredSubscriptions.length} assinaturas
                </div>
                <div className="flex gap-2">
                  <button 
                    className={`rounded-md border px-3 py-1 text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <button 
                    className={`rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Próximo
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
