'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChartCard, BarChartCard } from '@/components/dashboard/metric-cards';
import { createAsaasService } from '@/lib/asaas-service';

/**
 * Tipo para os dados da tabela de cohort
 */
type CohortData = {
  cohort: string;
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  m5: number;
  m6: number;
};

/**
 * Componente de tabela de análise de cohort
 */
const CohortTable = ({ data }: { data: CohortData[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border p-2 text-left">Cohort</th>
            <th className="border p-2 text-center">Mês 1</th>
            <th className="border p-2 text-center">Mês 2</th>
            <th className="border p-2 text-center">Mês 3</th>
            <th className="border p-2 text-center">Mês 4</th>
            <th className="border p-2 text-center">Mês 5</th>
            <th className="border p-2 text-center">Mês 6</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="border p-2 font-medium">{row.cohort}</td>
              <td className={`border p-2 text-center ${getCellColor(row.m1)}`}>{row.m1 ? `${row.m1}%` : '-'}</td>
              <td className={`border p-2 text-center ${getCellColor(row.m2)}`}>{row.m2 ? `${row.m2}%` : '-'}</td>
              <td className={`border p-2 text-center ${getCellColor(row.m3)}`}>{row.m3 ? `${row.m3}%` : '-'}</td>
              <td className={`border p-2 text-center ${getCellColor(row.m4)}`}>{row.m4 ? `${row.m4}%` : '-'}</td>
              <td className={`border p-2 text-center ${getCellColor(row.m5)}`}>{row.m5 ? `${row.m5}%` : '-'}</td>
              <td className={`border p-2 text-center ${getCellColor(row.m6)}`}>{row.m6 ? `${row.m6}%` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/**
 * Função auxiliar para determinar a cor da célula com base no valor de retenção
 */
const getCellColor = (value: number) => {
  if (!value) return '';
  if (value >= 95) return 'bg-green-100 dark:bg-green-900/20';
  if (value >= 90) return 'bg-green-50 dark:bg-green-900/10';
  if (value >= 85) return 'bg-yellow-50 dark:bg-yellow-900/10';
  if (value >= 80) return 'bg-orange-50 dark:bg-orange-900/10';
  return 'bg-red-50 dark:bg-red-900/10';
};

/**
 * Página de análise de churn e retenção
 * Exibe métricas e dados sobre churn e retenção de clientes
 */
export default function ChurnPage() {
  // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true);
  const [churnData, setChurnData] = useState([]);
  const [churnReasons, setChurnReasons] = useState([]);
  const [cohortData, setCohortData] = useState<CohortData[]>([]);
  const [atRiskCustomers, setAtRiskCustomers] = useState([]);
  const [metrics, setMetrics] = useState({
    churnRate: 0,
    retentionRate: 0,
    lostCustomers: 0
  });
  const [period, setPeriod] = useState('12m');
  const [error, setError] = useState(null);

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

        // Buscar dados de clientes e assinaturas
        const customers = await asaasService.getCustomers();
        const subscriptions = await asaasService.getSubscriptions();
        
        // Calcular churn rate com base nos dados reais
        // Em um ambiente real, isso seria calculado com base em cancelamentos reais
        // Para demonstração, vamos simular com base nos dados disponíveis
        
        const totalCustomers = customers.length;
        const activeSubscriptions = subscriptions.filter(sub => sub.status === 'ACTIVE').length;
        const canceledSubscriptions = subscriptions.filter(sub => sub.status === 'CANCELLED').length;
        
        // Calcular churn rate (simulado para demonstração)
        const churnRate = totalCustomers > 0 ? (canceledSubscriptions / (activeSubscriptions + canceledSubscriptions) * 100).toFixed(1) : 0;
        const retentionRate = (100 - parseFloat(churnRate)).toFixed(1);
        const lostCustomers = canceledSubscriptions;

        // Atualizar métricas principais
        setMetrics({
          churnRate: parseFloat(churnRate),
          retentionRate: parseFloat(retentionRate),
          lostCustomers
        });

        // Preparar dados para o gráfico de evolução do churn (simulado para demonstração)
        // Em um ambiente real, isso viria de dados históricos
        const mockChurnData = [
          { month: 'Jan', churn: parseFloat(churnRate) * 1.5, retenção: 100 - (parseFloat(churnRate) * 1.5) },
          { month: 'Fev', churn: parseFloat(churnRate) * 1.4, retenção: 100 - (parseFloat(churnRate) * 1.4) },
          { month: 'Mar', churn: parseFloat(churnRate) * 1.3, retenção: 100 - (parseFloat(churnRate) * 1.3) },
          { month: 'Abr', churn: parseFloat(churnRate) * 1.2, retenção: 100 - (parseFloat(churnRate) * 1.2) },
          { month: 'Mai', churn: parseFloat(churnRate) * 1.1, retenção: 100 - (parseFloat(churnRate) * 1.1) },
          { month: 'Jun', churn: parseFloat(churnRate), retenção: 100 - parseFloat(churnRate) }
        ];
        setChurnData(mockChurnData);

        // Preparar dados para o gráfico de motivos de cancelamento (simulado para demonstração)
        // Em um ambiente real, isso viria de dados de feedback de cancelamento
        const mockChurnReasons = [
          { reason: 'Preço alto', count: Math.round(lostCustomers * 0.35) },
          { reason: 'Falta de uso', count: Math.round(lostCustomers * 0.25) },
          { reason: 'Mudou para concorrente', count: Math.round(lostCustomers * 0.20) },
          { reason: 'Problemas técnicos', count: Math.round(lostCustomers * 0.15) },
          { reason: 'Outros', count: Math.round(lostCustomers * 0.05) }
        ];
        setChurnReasons(mockChurnReasons);

        // Preparar dados para a análise de cohort (simulado para demonstração)
        // Em um ambiente real, isso viria de dados históricos de retenção por mês
        const mockCohortData = [
          { 
            cohort: 'Jan/2025', 
            m1: 100, 
            m2: Math.round(100 - (parseFloat(churnRate) * 0.5)), 
            m3: Math.round(100 - (parseFloat(churnRate) * 0.8)), 
            m4: Math.round(100 - (parseFloat(churnRate) * 1.0)), 
            m5: Math.round(100 - (parseFloat(churnRate) * 1.2)), 
            m6: Math.round(100 - (parseFloat(churnRate) * 1.3)) 
          },
          { 
            cohort: 'Fev/2025', 
            m1: 100, 
            m2: Math.round(100 - (parseFloat(churnRate) * 0.4)), 
            m3: Math.round(100 - (parseFloat(churnRate) * 0.6)), 
            m4: Math.round(100 - (parseFloat(churnRate) * 0.9)), 
            m5: Math.round(100 - (parseFloat(churnRate) * 1.1)), 
            m6: 0 
          },
          { 
            cohort: 'Mar/2025', 
            m1: 100, 
            m2: Math.round(100 - (parseFloat(churnRate) * 0.3)), 
            m3: Math.round(100 - (parseFloat(churnRate) * 0.5)), 
            m4: Math.round(100 - (parseFloat(churnRate) * 0.7)), 
            m5: 0, 
            m6: 0 
          },
          { 
            cohort: 'Abr/2025', 
            m1: 100, 
            m2: Math.round(100 - (parseFloat(churnRate) * 0.2)), 
            m3: Math.round(100 - (parseFloat(churnRate) * 0.4)), 
            m4: 0, 
            m5: 0, 
            m6: 0 
          },
          { 
            cohort: 'Mai/2025', 
            m1: 100, 
            m2: Math.round(100 - (parseFloat(churnRate) * 0.2)), 
            m3: 0, 
            m4: 0, 
            m5: 0, 
            m6: 0 
          },
          { 
            cohort: 'Jun/2025', 
            m1: 100, 
            m2: 0, 
            m3: 0, 
            m4: 0, 
            m5: 0, 
            m6: 0 
          }
        ];
        setCohortData(mockCohortData);

        // Preparar dados para clientes com risco de churn (simulado para demonstração)
        // Em um ambiente real, isso seria calculado com base em comportamento de uso
        const mockAtRiskCustomers = [
          {
            id: '1',
            name: 'Empresa ABC Ltda',
            lastAccess: '15 dias atrás',
            recentUsage: 'Baixo',
            risk: 'Alto',
            riskClass: 'bg-red-100 text-red-800'
          },
          {
            id: '2',
            name: 'Tech Solutions',
            lastAccess: '7 dias atrás',
            recentUsage: 'Médio',
            risk: 'Médio',
            riskClass: 'bg-yellow-100 text-yellow-800'
          },
          {
            id: '3',
            name: 'Consultoria XYZ',
            lastAccess: '10 dias atrás',
            recentUsage: 'Baixo',
            risk: 'Médio',
            riskClass: 'bg-yellow-100 text-yellow-800'
          }
        ];
        setAtRiskCustomers(mockAtRiskCustomers);

      } catch (err) {
        console.error('Erro ao buscar dados da API Asaas:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

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
        <h1 className="text-3xl font-bold tracking-tight">Churn e Retenção</h1>
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
          {/* Métricas de churn */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Churn Rate</CardTitle>
                <CardDescription>Taxa de cancelamento atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.churnRate}%</div>
                <p className="text-sm text-green-600">↓ 0.3% vs. mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Retenção</CardTitle>
                <CardDescription>Taxa de retenção de clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.retentionRate}%</div>
                <p className="text-sm text-green-600">↑ 0.3% vs. mês anterior</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Clientes Perdidos</CardTitle>
                <CardDescription>No último mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">{metrics.lostCustomers}</div>
                <p className="text-sm text-green-600">↓ {Math.max(1, Math.floor(metrics.lostCustomers * 0.1))} vs. mês anterior</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos de churn */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AreaChartCard
              title="Evolução do Churn"
              description="Taxa de churn ao longo do tempo"
              data={churnData}
              index="month"
              categories={["churn"]}
              colors={["rose"]}
            />
            
            <BarChartCard
              title="Motivos de Cancelamento"
              description="Principais razões para cancelamento"
              data={churnReasons}
              index="reason"
              categories={["count"]}
              colors={["blue"]}
            />
          </div>

          {/* Análise de cohort */}
          <Card>
            <CardHeader>
              <CardTitle>Análise de Cohort</CardTitle>
              <CardDescription>Retenção de clientes por mês de aquisição</CardDescription>
            </CardHeader>
            <CardContent>
              <CohortTable data={cohortData} />
            </CardContent>
          </Card>

          {/* Clientes com risco de churn */}
          <Card>
            <CardHeader>
              <CardTitle>Clientes com Risco de Churn</CardTitle>
              <CardDescription>Baseado em comportamento e uso do produto</CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left">Cliente</th>
                    <th className="pb-2 text-left">Último acesso</th>
                    <th className="pb-2 text-left">Uso recente</th>
                    <th className="pb-2 text-left">Risco</th>
                    <th className="pb-2 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {atRiskCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b">
                      <td className="py-2">{customer.name}</td>
                      <td className="py-2">{customer.lastAccess}</td>
                      <td className="py-2">{customer.recentUsage}</td>
                      <td className="py-2">
                        <span className={`rounded-full ${customer.riskClass} px-2 py-1 text-xs font-medium`}>
                          {customer.risk}
                        </span>
                      </td>
                      <td className="py-2">
                        <button className="text-blue-600 hover:underline">Contatar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
