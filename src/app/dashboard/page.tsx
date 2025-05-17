import React from 'react';
import { MetricCard, AreaChartCard, BarChartCard, CustomersAtRiskCard } from '@/components/dashboard/metric-cards';
import { Users, BarChart3, AlertTriangle } from 'lucide-react'; // Add this line

/**
 * Dados mockados para o dashboard
 * Em um ambiente real, esses dados viriam da API do Asaas
 */
const mockMrrData = [
  { month: 'Jan', value: 12500 },
  { month: 'Fev', value: 13200 },
  { month: 'Mar', value: 14100 },
  { month: 'Abr', value: 15300 },
  { month: 'Mai', value: 16200 },
  { month: 'Jun', value: 17500 },
];

const mockChurnData = [
  { month: 'Jan', churn: 2.3, expansão: 3.5 },
  { month: 'Fev', churn: 2.1, expansão: 3.8 },
  { month: 'Mar', churn: 1.9, expansão: 4.2 },
  { month: 'Abr', churn: 2.2, expansão: 4.5 },
  { month: 'Mai', churn: 1.8, expansão: 5.1 },
  { month: 'Jun', churn: 1.5, expansão: 5.8 },
];

const mockCustomersAtRisk = [
  { id: 1, name: 'Empresa ABC Ltda', email: 'financeiro@abc.com.br', overdueAmount: '450,00', daysOverdue: 15 },
  { id: 2, name: 'Consultoria XYZ', email: 'pagamentos@xyz.com.br', overdueAmount: '890,00', daysOverdue: 8 },
  { id: 3, name: 'Tech Solutions', email: 'admin@techsolutions.com.br', overdueAmount: '1.200,00', daysOverdue: 12 },
  { id: 4, name: 'Startup Inovadora', email: 'contato@startup.com.br', overdueAmount: '350,00', daysOverdue: 5 },
];

/**
 * Componente principal do Dashboard
 * Exibe métricas, gráficos e lista de clientes em risco
 */
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-4">
          <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="12m" selected>Últimos 12 meses</option>
            <option value="ytd">Ano atual</option>
            <option value="all">Todo período</option>
          </select>
          <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
            Exportar
          </button>
        </div>
      </div>

      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="MRR"
          value="17.500,00"
          description="Receita Recorrente Mensal"
          trend="up"
          trendValue="8.2%"
          prefix="R$ "
        />
        <MetricCard
          title="Clientes Ativos"
          value="142"
          description="Assinaturas ativas"
          trend="up"
          trendValue="12"
          icon={Users}
        />
        <MetricCard
          title="Churn Rate"
          value="1.5%"
          description="Taxa de cancelamento"
          trend="down"
          trendValue="0.3%"
          icon={BarChart3}
        />
        <MetricCard
          title="Inadimplência"
          value="4.890,00"
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
          data={mockMrrData}
          index="month"
          categories={["value"]}
          colors={["blue"]}
        />
        <BarChartCard
          title="Churn vs Expansão"
          description="Comparativo entre churn e expansão de receita"
          data={mockChurnData}
          index="month"
          categories={["churn", "expansão"]}
          colors={["rose", "emerald"]}
        />
        <CustomersAtRiskCard
          title="Clientes em Risco"
          customers={mockCustomersAtRisk}
        />
      </div>
    </div>
  );
}
