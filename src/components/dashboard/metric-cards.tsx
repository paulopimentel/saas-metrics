import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, AlertTriangle, BarChart3 } from 'lucide-react';
import { AreaChart, BarChart } from '@tremor/react';

/**
 * Componente de card de métrica para exibir valores importantes com variação
 * @param title Título da métrica
 * @param value Valor atual da métrica
 * @param description Descrição adicional
 * @param trend Tendência (positiva ou negativa)
 * @param trendValue Valor da variação
 * @param icon Ícone a ser exibido
 * @param prefix Prefixo para o valor (ex: R$)
 */
interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  trend?: 'up' | 'down';
  trendValue: string;
  icon?: React.ComponentType<{ className?: string }>;
  prefix?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  trend = 'up',
  trendValue,
  icon: Icon = DollarSign,
  prefix = '',
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}{value}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="px-6 py-2 bg-slate-50 dark:bg-slate-800">
        <div className="flex items-center gap-1 text-xs">
          {trend === 'up' ? (
            <ArrowUpRight className="h-3 w-3 text-emerald-500" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-rose-500" />
          )}
          <span className={trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}>
            {trendValue}
          </span>
          <span className="text-muted-foreground">vs. mês anterior</span>
        </div>
      </CardFooter>
    </Card>
  );
};

/**
 * Props para o componente AreaChartCard
 */
interface AreaChartCardProps {
  title: string;
  description: string;
  data: any[];
  index: string;
  categories: string[];
  colors: string[];
}

/**
 * Componente de card para exibir gráfico de área
 * @param title Título do gráfico
 * @param description Descrição do gráfico
 * @param data Dados para o gráfico
 * @param index Campo a ser usado como índice
 * @param categories Categorias a serem exibidas
 * @param colors Cores para cada categoria
 */
export const AreaChartCard: React.FC<AreaChartCardProps> = ({
  title,
  description,
  data,
  index,
  categories,
  colors,
}) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <AreaChart
          className="h-72"
          data={data}
          index={index}
          categories={categories}
          colors={colors}
          showLegend={true}
          showGridLines={false}
          showAnimation={true}
          showTooltip={true}
          showXAxis={true}
          showYAxis={true}
        />
      </CardContent>
    </Card>
  );
};

/**
 * Props para o componente BarChartCard
 */
interface BarChartCardProps {
  title: string;
  description: string;
  data: any[];
  index: string;
  categories: string[];
  colors: string[];
}

/**
 * Componente de card para exibir gráfico de barras
 * @param title Título do gráfico
 * @param description Descrição do gráfico
 * @param data Dados para o gráfico
 * @param index Campo a ser usado como índice
 * @param categories Categorias a serem exibidas
 * @param colors Cores para cada categoria
 */
export const BarChartCard: React.FC<BarChartCardProps> = ({
  title,
  description,
  data,
  index,
  categories,
  colors,
}) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          className="h-72"
          data={data}
          index={index}
          categories={categories}
          colors={colors}
          showLegend={true}
          showGridLines={false}
          showAnimation={true}
          showTooltip={true}
          showXAxis={true}
          showYAxis={true}
        />
      </CardContent>
    </Card>
  );
};

/**
 * Props para o componente CustomersAtRiskCard
 */
interface CustomersAtRiskCardProps {
  title: string;
  customers: {
    id: string | number;
    name: string;
    email: string;
    overdueAmount: string | number; // Alterado para aceitar string ou number
    daysOverdue: number;
  }[];
}

/**
 * Componente de card para exibir lista de clientes em risco
 * @param title Título do card
 * @param customers Lista de clientes
 */
export const CustomersAtRiskCard: React.FC<CustomersAtRiskCardProps> = ({ title, customers }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{customer.name}</p>
                <p className="text-xs text-muted-foreground">{customer.email}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-rose-500">R$ {customer.overdueAmount}</p>
                <p className="text-xs text-muted-foreground">{customer.daysOverdue} dias em atraso</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <button className="text-xs text-blue-500 hover:underline">
          Ver todos os clientes em risco →
        </button>
      </CardFooter>
    </Card>
  );
};
