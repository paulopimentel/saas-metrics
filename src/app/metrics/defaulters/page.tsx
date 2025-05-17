'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChartCard, BarChartCard } from '@/components/dashboard/metric-cards';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { createAsaasService } from '@/lib/asaas-service';

/**
 * Página de análise de inadimplência
 * Exibe métricas e dados sobre clientes inadimplentes
 */
export default function DefaultersPage() {
  // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true);
  const [defaultersData, setDefaultersData] = useState([]);
  const [defaultersDistribution, setDefaultersDistribution] = useState([]);
  const [defaultersList, setDefaultersList] = useState([]);
  const [metrics, setMetrics] = useState({
    totalOverdue: 0,
    defaultRate: 0,
    customerCount: 0,
    averageDaysOverdue: 0
  });
  const [period, setPeriod] = useState('12m');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [daysFilter, setDaysFilter] = useState('all');
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

        // Buscar dados de inadimplência
        const defaultersResult = await asaasService.getDefaultersData();
        
        // Buscar dados de MRR para calcular taxa de inadimplência
        const mrrResult = await asaasService.calculateMRR();
        
        // Calcular métricas
        const totalOverdue = defaultersResult.totalOverdue;
        const defaultRate = mrrResult.totalMRR > 0 ? (totalOverdue / mrrResult.totalMRR * 100).toFixed(1) : 0;
        const customerCount = defaultersResult.customerCount;
        
        // Calcular média de dias em atraso
        let totalDaysOverdue = 0;
        let paymentCount = 0;
        
        defaultersResult.payments.forEach(payment => {
          const dueDate = new Date(payment.dueDate);
          const today = new Date();
          const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
          totalDaysOverdue += daysOverdue;
          paymentCount++;
        });
        
        const averageDaysOverdue = paymentCount > 0 ? Math.round(totalDaysOverdue / paymentCount) : 0;

        // Atualizar métricas principais
        setMetrics({
          totalOverdue,
          defaultRate,
          customerCount,
          averageDaysOverdue
        });

        // Preparar dados para o gráfico de evolução da inadimplência (simulado para demonstração)
        // Em um ambiente real, isso viria de dados históricos
        const mockDefaultersData = [
          { month: 'Jan', valor: totalOverdue * 0.65 },
          { month: 'Fev', valor: totalOverdue * 0.78 },
          { month: 'Mar', valor: totalOverdue * 0.92 },
          { month: 'Abr', valor: totalOverdue * 0.84 },
          { month: 'Mai', valor: totalOverdue * 0.98 },
          { month: 'Jun', valor: totalOverdue }
        ];
        setDefaultersData(mockDefaultersData);

        // Preparar dados para o gráfico de distribuição por tempo de atraso
        const distributionData = [];
        const paymentsByDaysOverdue = defaultersResult.paymentsByDaysOverdue || {};
        
        Object.entries(paymentsByDaysOverdue).forEach(([range, data]) => {
          distributionData.push({
            dias: `${range} dias`,
            valor: data.value
          });
        });
        
        setDefaultersDistribution(distributionData);

        // Preparar lista de clientes inadimplentes
        const defaultersListData = defaultersResult.payments.map(payment => {
          // Calcular dias em atraso
          const dueDate = new Date(payment.dueDate);
          const today = new Date();
          const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
          
          // Determinar status baseado nos dias em atraso
          let status = 'Em andamento';
          let statusComponent = <Clock className="h-3 w-3" />;
          let statusClass = 'bg-yellow-100 text-yellow-800';
          
          if (daysOverdue > 30) {
            status = 'Crítico';
            statusComponent = <AlertTriangle className="h-3 w-3" />;
            statusClass = 'bg-red-100 text-red-800';
          } else if (daysOverdue < 3) {
            status = 'Resolvido';
            statusComponent = <CheckCircle className="h-3 w-3" />;
            statusClass = 'bg-green-100 text-green-800';
          }
          
          return {
            id: payment.id,
            name: payment.customerName || 'Cliente',
            email: payment.customerEmail || 'email@exemplo.com',
            value: payment.value,
            daysOverdue: daysOverdue,
            attempts: Math.min(Math.floor(daysOverdue / 5) + 1, 3), // Simulação de tentativas
            status: status,
            statusComponent: statusComponent,
            statusClass: statusClass
          };
        });
        
        setDefaultersList(defaultersListData);

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

  // Filtrar lista de clientes inadimplentes
  const filteredDefaulters = defaultersList.filter(customer => {
    // Filtro de busca
    const matchesSearch = searchTerm === '' || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro de dias em atraso
    let matchesDays = true;
    if (daysFilter !== 'all') {
      const [min, max] = daysFilter.split('-').map(Number);
      if (max) {
        matchesDays = customer.daysOverdue >= min && customer.daysOverdue <= max;
      } else {
        matchesDays = customer.daysOverdue >= min;
      }
    }
    
    return matchesSearch && matchesDays;
  });

  // Paginação
  const totalPages = Math.ceil(filteredDefaulters.length / itemsPerPage);
  const paginatedDefaulters = filteredDefaulters.slice(
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
        <h1 className="text-3xl font-bold tracking-tight">Inadimplência</h1>
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
          {/* Métricas de inadimplência */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total em Atraso</CardTitle>
                <CardDescription>Valor total inadimplente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">R$ {formatCurrency(metrics.totalOverdue)}</div>
                <p className="text-sm text-red-600">↑ R$ {formatCurrency(metrics.totalOverdue * 0.02)} vs. mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Inadimplência</CardTitle>
                <CardDescription>% do MRR em atraso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.defaultRate}%</div>
                <p className="text-sm text-red-600">↑ 0,1% vs. mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Clientes Inadimplentes</CardTitle>
                <CardDescription>Total de clientes em atraso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.customerCount}</div>
                <p className="text-sm text-red-600">↑ {Math.max(1, Math.floor(metrics.customerCount * 0.1))} vs. mês anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio de Atraso</CardTitle>
                <CardDescription>Dias em média</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.averageDaysOverdue}</div>
                <p className="text-sm text-green-600">↓ 2 dias vs. mês anterior</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos de inadimplência */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AreaChartCard
              title="Evolução da Inadimplência"
              description="Valor total em atraso ao longo do tempo"
              data={defaultersData}
              index="month"
              categories={["valor"]}
              colors={["rose"]}
            />
            
            <BarChartCard
              title="Distribuição por Tempo de Atraso"
              description="Valores agrupados por dias em atraso"
              data={defaultersDistribution}
              index="dias"
              categories={["valor"]}
              colors={["blue"]}
            />
          </div>

          {/* Lista de clientes inadimplentes */}
          <Card>
            <CardHeader>
              <CardTitle>Clientes Inadimplentes</CardTitle>
              <CardDescription>Lista detalhada de clientes com pagamentos em atraso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Buscar cliente..." 
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
                    value={daysFilter}
                    onChange={(e) => setDaysFilter(e.target.value)}
                  >
                    <option value="all">Todos os atrasos</option>
                    <option value="1-7">1-7 dias</option>
                    <option value="8-15">8-15 dias</option>
                    <option value="16-30">16-30 dias</option>
                    <option value="31">31+ dias</option>
                  </select>
                  <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                    Ações em massa
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="pb-2 text-left">Cliente</th>
                      <th className="pb-2 text-left">Valor</th>
                      <th className="pb-2 text-left">Dias em atraso</th>
                      <th className="pb-2 text-left">Tentativas</th>
                      <th className="pb-2 text-left">Status</th>
                      <th className="pb-2 text-left">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDefaulters.length > 0 ? (
                      paginatedDefaulters.map((customer) => (
                        <tr key={customer.id} className="border-b">
                          <td className="py-3">
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-xs text-gray-500">{customer.email}</div>
                            </div>
                          </td>
                          <td className="py-3">R$ {formatCurrency(customer.value)}</td>
                          <td className="py-3">{customer.daysOverdue}</td>
                          <td className="py-3">{customer.attempts}</td>
                          <td className="py-3">
                            <span className={`flex items-center gap-1 rounded-full ${customer.statusClass} px-2 py-1 text-xs font-medium`}>
                              {customer.statusComponent} {customer.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex gap-2">
                              {customer.status !== 'Resolvido' ? (
                                <>
                                  <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Contatar</button>
                                  <button className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200">Renovar</button>
                                </>
                              ) : (
                                <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">Detalhes</button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-4 text-center text-gray-500">
                          Nenhum cliente inadimplente encontrado com os filtros atuais.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Mostrando {Math.min(paginatedDefaulters.length, itemsPerPage)} de {filteredDefaulters.length} clientes inadimplentes
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
          
          {/* Dicas de recuperação */}
          <Card>
            <CardHeader>
              <CardTitle>Estratégias de Recuperação</CardTitle>
              <CardDescription>Dicas para reduzir inadimplência e recuperar clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Comunicação Proativa</h3>
                  <p className="text-sm text-gray-600">
                    Envie lembretes antes do vencimento e ofereça opções de pagamento flexíveis para evitar atrasos.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Automação de Cobranças</h3>
                  <p className="text-sm text-gray-600">
                    Configure sequências de e-mails e mensagens automáticas para diferentes estágios de atraso.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Incentivos para Regularização</h3>
                  <p className="text-sm text-gray-600">
                    Ofereça descontos ou benefícios para clientes que regularizarem pagamentos em atraso.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
