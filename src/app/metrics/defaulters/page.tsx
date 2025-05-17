import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChartCard, BarChartCard } from '@/components/dashboard/metric-cards';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

/**
 * Dados mockados para a página de inadimplência
 */
const mockDefaultersData = [
  { month: 'Jan', valor: 3200 },
  { month: 'Fev', valor: 3800 },
  { month: 'Mar', valor: 4500 },
  { month: 'Abr', valor: 4100 },
  { month: 'Mai', valor: 4800 },
  { month: 'Jun', valor: 4890 },
];

const mockDefaultersDistribution = [
  { dias: '1-7 dias', valor: 1250 },
  { dias: '8-15 dias', valor: 1890 },
  { dias: '16-30 dias', valor: 1150 },
  { dias: '31-60 dias', valor: 450 },
  { dias: '60+ dias', valor: 150 },
];

/**
 * Página de análise de inadimplência
 */
export default function DefaultersPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Inadimplência</h1>
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

      {/* Métricas de inadimplência */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total em Atraso</CardTitle>
            <CardDescription>Valor total inadimplente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 4.890,00</div>
            <p className="text-sm text-red-600">↑ R$ 90,00 vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Inadimplência</CardTitle>
            <CardDescription>% do MRR em atraso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">3,2%</div>
            <p className="text-sm text-red-600">↑ 0,1% vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Clientes Inadimplentes</CardTitle>
            <CardDescription>Total de clientes em atraso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">12</div>
            <p className="text-sm text-red-600">↑ 2 vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Atraso</CardTitle>
            <CardDescription>Dias em média</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">14</div>
            <p className="text-sm text-green-600">↓ 2 dias vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de inadimplência */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AreaChartCard
          title="Evolução da Inadimplência"
          description="Valor total em atraso ao longo do tempo"
          data={mockDefaultersData}
          index="month"
          categories={["valor"]}
          colors={["rose"]}
        />
        
        <BarChartCard
          title="Distribuição por Tempo de Atraso"
          description="Valores agrupados por dias em atraso"
          data={mockDefaultersDistribution}
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
              />
              <button className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300">
                Buscar
              </button>
            </div>
            <div className="flex gap-2">
              <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
                <option value="all">Todos os atrasos</option>
                <option value="1-7">1-7 dias</option>
                <option value="8-15">8-15 dias</option>
                <option value="16-30">16-30 dias</option>
                <option value="31+">31+ dias</option>
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
                <tr className="border-b">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">Empresa ABC Ltda</div>
                      <div className="text-xs text-gray-500">financeiro@abc.com.br</div>
                    </div>
                  </td>
                  <td className="py-3">R$ 450,00</td>
                  <td className="py-3">15</td>
                  <td className="py-3">3</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                      <AlertTriangle className="h-3 w-3" /> Crítico
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Contatar</button>
                      <button className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200">Renovar</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">Tech Solutions</div>
                      <div className="text-xs text-gray-500">admin@techsolutions.com.br</div>
                    </div>
                  </td>
                  <td className="py-3">R$ 1.200,00</td>
                  <td className="py-3">12</td>
                  <td className="py-3">2</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      <Clock className="h-3 w-3" /> Em andamento
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Contatar</button>
                      <button className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200">Renovar</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">Consultoria XYZ</div>
                      <div className="text-xs text-gray-500">pagamentos@xyz.com.br</div>
                    </div>
                  </td>
                  <td className="py-3">R$ 890,00</td>
                  <td className="py-3">8</td>
                  <td className="py-3">1</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      <Clock className="h-3 w-3" /> Em andamento
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Contatar</button>
                      <button className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 hover:bg-green-200">Renovar</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">Startup Inovadora</div>
                      <div className="text-xs text-gray-500">contato@startup.com.br</div>
                    </div>
                  </td>
                  <td className="py-3">R$ 350,00</td>
                  <td className="py-3">5</td>
                  <td className="py-3">1</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      <CheckCircle className="h-3 w-3" /> Resolvido
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">Detalhes</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Mostrando 4 de 12 clientes inadimplentes
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border px-3 py-1 text-sm disabled:opacity-50">
                Anterior
              </button>
              <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
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
    </div>
  );
}
