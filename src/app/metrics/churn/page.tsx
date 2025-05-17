import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChartCard, BarChartCard } from '@/components/dashboard/metric-cards';

/**
 * Dados mockados para a página de churn
 */
const mockChurnData = [
  { month: 'Jan', churn: 2.3, retenção: 97.7 },
  { month: 'Fev', churn: 2.1, retenção: 97.9 },
  { month: 'Mar', churn: 1.9, retenção: 98.1 },
  { month: 'Abr', churn: 2.2, retenção: 97.8 },
  { month: 'Mai', churn: 1.8, retenção: 98.2 },
  { month: 'Jun', churn: 1.5, retenção: 98.5 },
];

const mockChurnReasons = [
  { reason: 'Preço alto', count: 35 },
  { reason: 'Falta de uso', count: 28 },
  { reason: 'Mudou para concorrente', count: 22 },
  { reason: 'Problemas técnicos', count: 15 },
  { reason: 'Outros', count: 10 },
];

const mockCohortData = [
  { cohort: 'Jan/2025', m1: 100, m2: 95, m3: 92, m4: 90, m5: 88, m6: 87 },
  { cohort: 'Fev/2025', m1: 100, m2: 96, m3: 94, m4: 91, m5: 89, m6: 0 },
  { cohort: 'Mar/2025', m1: 100, m2: 97, m3: 95, m4: 93, m5: 0, m6: 0 },
  { cohort: 'Abr/2025', m1: 100, m2: 98, m3: 96, m4: 0, m5: 0, m6: 0 },
  { cohort: 'Mai/2025', m1: 100, m2: 98, m3: 0, m4: 0, m5: 0, m6: 0 },
  { cohort: 'Jun/2025', m1: 100, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0 },
];

/**
 * Componente de tabela de análise de cohort
 */
const CohortTable = ({ data }) => {
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
const getCellColor = (value) => {
  if (!value) return '';
  if (value >= 95) return 'bg-green-100 dark:bg-green-900/20';
  if (value >= 90) return 'bg-green-50 dark:bg-green-900/10';
  if (value >= 85) return 'bg-yellow-50 dark:bg-yellow-900/10';
  if (value >= 80) return 'bg-orange-50 dark:bg-orange-900/10';
  return 'bg-red-50 dark:bg-red-900/10';
};

/**
 * Página de análise de churn e retenção
 */
export default function ChurnPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Churn e Retenção</h1>
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

      {/* Métricas de churn */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Churn Rate</CardTitle>
            <CardDescription>Taxa de cancelamento atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">1.5%</div>
            <p className="text-sm text-green-600">↓ 0.3% vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Retenção</CardTitle>
            <CardDescription>Taxa de retenção de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">98.5%</div>
            <p className="text-sm text-green-600">↑ 0.3% vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Clientes Perdidos</CardTitle>
            <CardDescription>No último mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">4</div>
            <p className="text-sm text-green-600">↓ 2 vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de churn */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AreaChartCard
          title="Evolução do Churn"
          description="Taxa de churn ao longo do tempo"
          data={mockChurnData}
          index="month"
          categories={["churn"]}
          colors={["rose"]}
        />
        
        <BarChartCard
          title="Motivos de Cancelamento"
          description="Principais razões para cancelamento"
          data={mockChurnReasons}
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
          <CohortTable data={mockCohortData} />
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
              <tr className="border-b">
                <td className="py-2">Empresa ABC Ltda</td>
                <td className="py-2">15 dias atrás</td>
                <td className="py-2">Baixo</td>
                <td className="py-2"><span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Alto</span></td>
                <td className="py-2"><button className="text-blue-600 hover:underline">Contatar</button></td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Tech Solutions</td>
                <td className="py-2">7 dias atrás</td>
                <td className="py-2">Médio</td>
                <td className="py-2"><span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Médio</span></td>
                <td className="py-2"><button className="text-blue-600 hover:underline">Contatar</button></td>
              </tr>
              <tr className="border-b">
                <td className="py-2">Consultoria XYZ</td>
                <td className="py-2">10 dias atrás</td>
                <td className="py-2">Baixo</td>
                <td className="py-2"><span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">Médio</span></td>
                <td className="py-2"><button className="text-blue-600 hover:underline">Contatar</button></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
