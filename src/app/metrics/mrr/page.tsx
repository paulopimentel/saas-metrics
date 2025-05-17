import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChartCard, BarChartCard } from '@/components/dashboard/metric-cards';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

/**
 * Dados mockados para a página de MRR e receita
 */
const mockMrrData = [
  { month: 'Jan', mrr: 12500, novos: 1500, expansão: 800, churn: 500, contração: 300 },
  { month: 'Fev', mrr: 13200, novos: 1800, expansão: 900, churn: 600, contração: 400 },
  { month: 'Mar', mrr: 14100, novos: 1600, expansão: 1100, churn: 550, contração: 250 },
  { month: 'Abr', mrr: 15300, novos: 1900, expansão: 1200, churn: 650, contração: 350 },
  { month: 'Mai', mrr: 16200, novos: 1700, expansão: 1300, churn: 700, contração: 400 },
  { month: 'Jun', mrr: 17500, novos: 2000, expansão: 1400, churn: 800, contração: 300 },
];

const mockMrrBreakdown = [
  { plano: 'Básico', valor: 6435 },
  { plano: 'Profissional', valor: 7960 },
  { plano: 'Empresarial', valor: 3105 },
];

/**
 * Página de análise de MRR e receita
 */
export default function MrrPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">MRR e Receita</h1>
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

      {/* Métricas de MRR */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>MRR Atual</CardTitle>
            <CardDescription>Receita recorrente mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 17.500,00</div>
            <p className="text-sm text-green-600">↑ R$ 1.300,00 (8,0%) vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Novo MRR</CardTitle>
            <CardDescription>Novos clientes este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 2.000,00</div>
            <p className="text-sm text-green-600">↑ R$ 300,00 vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Expansão</CardTitle>
            <CardDescription>Upgrades e expansões</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 1.400,00</div>
            <p className="text-sm text-green-600">↑ R$ 100,00 vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Churn</CardTitle>
            <CardDescription>MRR perdido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-600">R$ 800,00</div>
            <p className="text-sm text-red-600">↑ R$ 100,00 vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas adicionais */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Net MRR</CardTitle>
            <CardDescription>Crescimento líquido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 2.300,00</div>
            <p className="text-sm text-green-600">↑ R$ 300,00 vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ARR</CardTitle>
            <CardDescription>Receita recorrente anual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 210.000,00</div>
            <p className="text-sm text-green-600">↑ R$ 15.600,00 vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>ARPU</CardTitle>
            <CardDescription>Receita média por usuário</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 123,00</div>
            <p className="text-sm text-green-600">↑ R$ 3,00 vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LTV</CardTitle>
            <CardDescription>Valor do tempo de vida</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 3.690,00</div>
            <p className="text-sm text-green-600">↑ R$ 90,00 vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de MRR */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AreaChartCard
          title="Evolução do MRR"
          description="Crescimento do MRR ao longo do tempo"
          data={mockMrrData}
          index="month"
          categories={["mrr"]}
          colors={["blue"]}
        />
        
        <BarChartCard
          title="Componentes do MRR"
          description="Detalhamento do crescimento mensal"
          data={mockMrrData}
          index="month"
          categories={["novos", "expansão", "churn", "contração"]}
          colors={["green", "blue", "red", "amber"]}
        />

        <Card>
          <CardHeader>
            <CardTitle>Distribuição do MRR</CardTitle>
            <CardDescription>Por plano de assinatura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              {/* Gráfico de pizza simplificado */}
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">R$ 17.500</span>
                </div>
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {/* Segmento Básico - 37% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="251.2 251.2"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Segmento Profissional - 45% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="20"
                    strokeDasharray="251.2 251.2"
                    strokeDashoffset="158.3"
                    transform="rotate(-90 50 50)"
                  />
                  {/* Segmento Empresarial - 18% */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#6366f1"
                    strokeWidth="20"
                    strokeDasharray="251.2 251.2"
                    strokeDashoffset="92.9"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="ml-2 text-sm">Básico</span>
                </div>
                <span className="text-sm font-medium">R$ 6.435,00 (37%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="ml-2 text-sm">Profissional</span>
                </div>
                <span className="text-sm font-medium">R$ 7.960,00 (45%)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                  <span className="ml-2 text-sm">Empresarial</span>
                </div>
                <span className="text-sm font-medium">R$ 3.105,00 (18%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Métricas de crescimento */}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Crescimento</CardTitle>
          <CardDescription>Indicadores-chave de desempenho financeiro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Net Dollar Retention</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-500">108%</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-green-500" style={{ width: '108%' }}></div>
              </div>
              <p className="text-xs text-gray-500">
                Receita retida de clientes existentes, incluindo expansões e contrações.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Gross Dollar Retention</span>
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-4 w-4 text-amber-500" />
                  <span className="font-medium text-amber-500">94%</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '94%' }}></div>
              </div>
              <p className="text-xs text-gray-500">
                Receita retida de clientes existentes, sem considerar expansões.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Taxa de Crescimento MRR</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="font-medium text-green-500">8,0%</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full rounded-full bg-green-500" style={{ width: '80%' }}></div>
              </div>
              <p className="text-xs text-gray-500">
                Crescimento percentual do MRR em relação ao mês anterior.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previsões e projeções */}
      <Card>
        <CardHeader>
          <CardTitle>Previsões e Projeções</CardTitle>
          <CardDescription>Estimativas de crescimento futuro</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left">Período</th>
                  <th className="pb-2 text-right">MRR Projetado</th>
                  <th className="pb-2 text-right">Crescimento</th>
                  <th className="pb-2 text-right">Novos Clientes</th>
                  <th className="pb-2 text-right">Churn Estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Julho/2025</td>
                  <td className="py-3 text-right">R$ 18.900,00</td>
                  <td className="py-3 text-right text-green-600">+8,0%</td>
                  <td className="py-3 text-right">15</td>
                  <td className="py-3 text-right">3</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Agosto/2025</td>
                  <td className="py-3 text-right">R$ 20.400,00</td>
                  <td className="py-3 text-right text-green-600">+7,9%</td>
                  <td className="py-3 text-right">14</td>
                  <td className="py-3 text-right">4</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Setembro/2025</td>
                  <td className="py-3 text-right">R$ 22.000,00</td>
                  <td className="py-3 text-right text-green-600">+7,8%</td>
                  <td className="py-3 text-right">16</td>
                  <td className="py-3 text-right">3</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Q3/2025</td>
                  <td className="py-3 text-right">R$ 22.000,00</td>
                  <td className="py-3 text-right text-green-600">+25,7%</td>
                  <td className="py-3 text-right">45</td>
                  <td className="py-3 text-right">10</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Final de 2025</td>
                  <td className="py-3 text-right">R$ 30.100,00</td>
                  <td className="py-3 text-right text-green-600">+72,0%</td>
                  <td className="py-3 text-right">120</td>
                  <td className="py-3 text-right">35</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              * Projeções baseadas nas taxas de crescimento atuais e tendências históricas. Sujeitas a variações.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
