'use client';

import React, { useEffect, useState } from 'react';
import { MetricCard, AreaChartCard, BarChartCard, CustomersAtRiskCard } from '@/components/dashboard/metric-cards';
import { Users, BarChart3, AlertTriangle, DollarSign } from 'lucide-react';
import { createAsaasService } from '@/lib/asaas-service';

/**
 * Componente principal do Dashboard
 * Exibe métricas, gráficos e lista de clientes em risco
 */
export default function DashboardPage() {
  // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true);
  const [mrrData, setMrrData] = useState([]);
  const [churnData, setChurnData] = useState([]);
  const [customersAtRisk, setCustomersAtRisk] = useState([]);
  const [metrics, setMetrics] = useState({
    mrr: 0,
    activeCustomers: 0,
    churnRate: 0,
    overdueAmount: 0
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

        // Buscar dados de MRR
        const mrrResult = await asaasService.calculateMRR();
        
        // Buscar clientes
        const customers = await asaasService.getCustomers();
        
        // Buscar dados de inadimplência
        const defaultersData = await asaasService.getDefaultersData();
        
        // Buscar clientes com potencial de churn
        const potentialChurnCustomers = await asaasService.identifyPotentialChurn();

        // Calcular taxa de churn (simulado para demonstração)
        // Em um ambiente real, isso seria calculado com base em dados históricos
        const churnRate = potentialChurnCustomers.length > 0 
          ? (potentialChurnCustomers.length / customers.length * 100).toFixed(1)
          : 0;

        // Atualizar métricas principais
        setMetrics({
          mrr: mrrResult.totalMRR,
          activeCustomers: customers.length,
          churnRate: churnRate,
          overdueAmount: defaultersData.totalOverdue
        });

        // Preparar dados para o gráfico de MRR (simulado para demonstração)
        // Em um ambiente real, isso viria de dados históricos
        const mockMrrData = [
          { month: 'Jan', value: mrrResult.totalMRR * 0.7 },
          { month: 'Fev', value: mrrResult.totalMRR * 0.75 },
          { month: 'Mar', value: mrrResult.totalMRR * 0.8 },
          { month: 'Abr', value: mrrResult.totalMRR * 0.85 },
          { month: 'Mai', value: mrrResult.totalMRR * 0.9 },
          { month: 'Jun', value: mrrResult.totalMRR }
        ];
        setMrrData(mockMrrData);

        // Preparar dados para o gráfico de churn (simulado para demonstração)
        const mockChurnData = [
          { month: 'Jan', churn: parseFloat(churnRate) + 0.8, expansão: 3.5 },
          { month: 'Fev', churn: parseFloat(churnRate) + 0.6, expansão: 3.8 },
          { month: 'Mar', churn: parseFloat(churnRate) + 0.4, expansão: 4.2 },
          { month: 'Abr', churn: parseFloat(churnRate) + 0.3, expansão: 4.5 },
          { month: 'Mai', churn: parseFloat(churnRate) + 0.1, expansão: 5.1 },
          { month: 'Jun', churn: parseFloat(churnRate), expansão: 5.8 }
        ];
        setChurnData(mockChurnData);

        // Preparar dados de clientes em risco
        const customersAtRiskData = defaultersData.payments.slice(0, 4).map(payment => {
          // Calcular dias em atraso
          const dueDate = new Date(payment.dueDate);
          const today = new Date();
          const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
          
          return {
            id: payment.id,
            name: payment.customerName || 'Cliente',
            email: payment.customerEmail || 'email@exemplo.com',
            overdueAmount: payment.value.toFixed(2).replace('.', ','),
            daysOverdue: daysOverdue
          };
        });
        setCustomersAtRisk(customersAtRiskData);

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
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
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
          {/* Cards de métricas principais */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="MRR"
              value={formatCurrency(metrics.mrr)}
              description="Receita Recorrente Mensal"
              trend="up"
              trendValue="8.2%"
              prefix="R$ "
              icon={DollarSign}
            />
            <MetricCard
              title="Clientes Ativos"
              value={metrics.activeCustomers.toString()}
              description="Assinaturas ativas"
              trend="up"
              trendValue="12"
              icon={Users}
            />
            <MetricCard
              title="Churn Rate"
              value={`${metrics.churnRate}%`}
              description="Taxa de cancelamento"
              trend="down"
              trendValue="0.3%"
              icon={BarChart3}
            />
            <MetricCard
              title="Inadimplência"
              value={formatCurrency(metrics.overdueAmount)}
              description="Valor total em atraso"
              trend="up"
              trendValue="1.250,00"
              prefix="R$ "
              icon={AlertTriangle}
            />
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AreaChartCard
              title="Evolução do MRR"
              description="Receita recorrente mensal ao longo do tempo"
              data={mrrData}
              index="month"
              categories={["value"]}
              colors={["blue"]}
            />
            <BarChartCard
              title="Churn vs Expansão"
              description="Comparativo entre churn e expansão de receita"
              data={churnData}
              index="month"
              categories={["churn", "expansão"]}
              colors={["rose", "emerald"]}
            />
            <CustomersAtRiskCard
              title="Clientes em Risco"
              customers={customersAtRisk}
            />
          </div>
        </>
      )}
    </div>
  );
}
