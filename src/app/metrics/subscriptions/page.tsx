import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChartCard, BarChartCard } from '@/components/dashboard/metric-cards';
import { CreditCard, CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Dados mockados para a página de assinaturas
 */
const mockSubscriptionsData = [
  { month: 'Jan', ativas: 120, trial: 25 },
  { month: 'Fev', ativas: 125, trial: 28 },
  { month: 'Mar', ativas: 130, trial: 30 },
  { month: 'Abr', ativas: 135, trial: 32 },
  { month: 'Mai', ativas: 138, trial: 35 },
  { month: 'Jun', ativas: 142, trial: 38 },
];

const mockPlanDistribution = [
  { plano: 'Básico', assinantes: 65 },
  { plano: 'Profissional', assinantes: 48 },
  { plano: 'Empresarial', assinantes: 29 },
];

/**
 * Página de análise de assinaturas
 */
export default function SubscriptionsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Assinaturas</h1>
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

      {/* Métricas de assinaturas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Assinaturas Ativas</CardTitle>
            <CardDescription>Total de assinantes pagantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">142</div>
            <p className="text-sm text-green-600">↑ 4 vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Assinaturas em Trial</CardTitle>
            <CardDescription>Usuários em período de teste</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">38</div>
            <p className="text-sm text-green-600">↑ 3 vs. mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão</CardTitle>
            <CardDescription>Trial para pagante</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">42%</div>
            <p className="text-sm text-green-600">↑ 2% vs. mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valor Médio</CardTitle>
            <CardDescription>Ticket médio por assinatura</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">R$ 123,00</div>
            <p className="text-sm text-green-600">↑ R$ 3,00 vs. mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos de assinaturas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AreaChartCard
          title="Evolução de Assinaturas"
          description="Assinaturas ativas e trials ao longo do tempo"
          data={mockSubscriptionsData}
          index="month"
          categories={["ativas", "trial"]}
          colors={["blue", "green"]}
        />
        
        <BarChartCard
          title="Distribuição por Plano"
          description="Quantidade de assinantes por plano"
          data={mockPlanDistribution}
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
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-2">
                  <CreditCard className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Nova assinatura</p>
                  <p className="text-xs text-gray-500">Startup Inovadora - Plano Profissional</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+ R$ 199,00/mês</p>
                <p className="text-xs text-gray-500">Hoje, 10:23</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <ArrowUp className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Upgrade de plano</p>
                  <p className="text-xs text-gray-500">Tech Solutions - Básico → Empresarial</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+ R$ 250,00/mês</p>
                <p className="text-xs text-gray-500">Ontem, 15:47</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-100 p-2">
                  <ArrowDown className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Downgrade de plano</p>
                  <p className="text-xs text-gray-500">Consultoria XYZ - Empresarial → Profissional</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">- R$ 150,00/mês</p>
                <p className="text-xs text-gray-500">2 dias atrás</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Cancelamento</p>
                  <p className="text-xs text-gray-500">Empresa ABC Ltda - Plano Básico</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">- R$ 99,00/mês</p>
                <p className="text-xs text-gray-500">3 dias atrás</p>
              </div>
            </div>
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
              />
              <button className="rounded-md bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300">
                Buscar
              </button>
            </div>
            <div className="flex gap-2">
              <select className="rounded-md border border-gray-300 px-3 py-1 text-sm">
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
                <tr className="border-b">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">Tech Solutions</div>
                      <div className="text-xs text-gray-500">admin@techsolutions.com.br</div>
                    </div>
                  </td>
                  <td className="py-3">Empresarial</td>
                  <td className="py-3">R$ 349,00/mês</td>
                  <td className="py-3">10/01/2025</td>
                  <td className="py-3">10/06/2025</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      <CheckCircle className="h-3 w-3" /> Ativa
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Editar</button>
                      <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">Detalhes</button>
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
                  <td className="py-3">Profissional</td>
                  <td className="py-3">R$ 199,00/mês</td>
                  <td className="py-3">15/03/2025</td>
                  <td className="py-3">15/06/2025</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      <CheckCircle className="h-3 w-3" /> Ativa
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Editar</button>
                      <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">Detalhes</button>
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
                  <td className="py-3">Profissional</td>
                  <td className="py-3">R$ 199,00/mês</td>
                  <td className="py-3">02/05/2025</td>
                  <td className="py-3">02/06/2025</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      <CheckCircle className="h-3 w-3" /> Ativa
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Editar</button>
                      <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">Detalhes</button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">
                    <div>
                      <div className="font-medium">Empresa DEF</div>
                      <div className="text-xs text-gray-500">contato@def.com.br</div>
                    </div>
                  </td>
                  <td className="py-3">Básico</td>
                  <td className="py-3">R$ 99,00/mês</td>
                  <td className="py-3">20/04/2025</td>
                  <td className="py-3">20/06/2025</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      <AlertTriangle className="h-3 w-3" /> Pendente
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 hover:bg-blue-200">Editar</button>
                      <button className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 hover:bg-gray-200">Detalhes</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Mostrando 4 de 142 assinaturas
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
    </div>
  );
}
