# SaaS Metrics Dashboard - Documentação

## Visão Geral

O SaaS Metrics Dashboard é uma aplicação Next.js desenvolvida para fornecer uma visão completa e intuitiva das métricas de negócios para micro-SaaS, com integração nativa com a plataforma Asaas. A aplicação permite o acompanhamento de MRR (Monthly Recurring Revenue), churn, inadimplência, assinaturas e identificação proativa de clientes com potencial de cancelamento.

## Estrutura do Projeto

```
saas-metrics-nextjs/
├── public/                  # Arquivos estáticos
├── src/
│   ├── app/                 # Páginas da aplicação (Next.js App Router)
│   │   ├── dashboard/       # Dashboard principal
│   │   ├── metrics/         # Páginas de métricas específicas
│   │   │   ├── churn/       # Análise de churn e retenção
│   │   │   ├── defaulters/  # Análise de inadimplência
│   │   │   ├── mrr/         # Análise de MRR e receita
│   │   │   └── subscriptions/ # Análise de assinaturas
│   │   ├── settings/        # Configurações e integrações
│   │   └── auth/            # Autenticação (a ser implementado)
│   ├── components/          # Componentes reutilizáveis
│   │   ├── dashboard/       # Componentes específicos do dashboard
│   │   └── ui/              # Componentes de UI genéricos
│   └── lib/                 # Utilitários e serviços
│       └── asaas-service.js # Serviço de integração com Asaas
├── package.json             # Dependências do projeto
└── README.md                # Documentação principal
```

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **TypeScript**: Tipagem estática para melhor manutenção do código
- **Tailwind CSS**: Framework CSS para estilização
- **Recharts**: Biblioteca para visualização de dados
- **Tremor**: Componentes de dashboard e visualização
- **Lucide React**: Ícones modernos e consistentes
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas

## Funcionalidades Principais

### Dashboard Principal
- Visão consolidada das principais métricas (MRR, churn, clientes ativos, inadimplência)
- Gráficos de evolução do MRR e comparativo entre churn e expansão
- Lista de clientes em risco de cancelamento

### Análise de Churn
- Métricas detalhadas de churn e retenção
- Análise de cohort para visualização da retenção ao longo do tempo
- Identificação de motivos de cancelamento
- Lista de clientes com potencial de churn

### Análise de Inadimplência
- Visão geral de valores em atraso
- Distribuição por tempo de atraso
- Lista detalhada de clientes inadimplentes com ações possíveis

### Análise de Assinaturas
- Métricas de assinaturas ativas e em trial
- Distribuição por plano
- Histórico de movimentações (novas assinaturas, upgrades, downgrades, cancelamentos)
- Lista completa de assinaturas com filtros

### Análise de MRR e Receita
- Detalhamento do MRR (novo, expansão, contração, churn)
- Métricas avançadas (NDR, ARPU, LTV)
- Distribuição do MRR por plano
- Previsões e projeções de crescimento

### Configurações
- Integração com a API da Asaas (token e ambiente)
- Configuração de notificações e alertas
- Parâmetros para detecção de clientes com potencial de churn
- Gerenciamento de conta

## Integração com Asaas

A integração com a plataforma Asaas é feita através do serviço `asaas-service.js`, que encapsula todas as chamadas à API e fornece métodos para:

- Obter clientes, assinaturas e pagamentos
- Calcular MRR e métricas relacionadas
- Identificar clientes inadimplentes
- Detectar clientes com potencial de churn

### Configuração da Integração

Para configurar a integração com a Asaas:

1. Acesse a página de Configurações
2. Insira seu token de API da Asaas
3. Selecione o ambiente (Sandbox ou Produção)
4. Clique em "Testar Conexão" para validar

## Personalização e Expansão

O código foi desenvolvido de forma modular e bem documentada para facilitar personalizações e expansões futuras:

### Adicionando Novas Métricas

Para adicionar uma nova métrica ao dashboard:

1. Crie um novo componente em `src/components/dashboard/`
2. Adicione a lógica de cálculo no serviço apropriado em `src/lib/`
3. Integre o componente na página desejada

### Integrando com Outras Plataformas

Para integrar com outras plataformas além do Asaas:

1. Crie um novo serviço em `src/lib/` seguindo o padrão do `asaas-service.js`
2. Implemente os métodos necessários para obter e transformar os dados
3. Adicione as opções de configuração na página de Configurações

## Hospedagem na Vercel

Para hospedar o projeto na Vercel:

1. Crie uma conta na Vercel (https://vercel.com)
2. Conecte seu repositório Git
3. Configure as variáveis de ambiente necessárias
4. Deploy!

## Próximos Passos e Melhorias Futuras

- Implementação de autenticação de usuários
- Integração com mais plataformas de pagamento
- Análise preditiva avançada para detecção de churn
- Exportação de relatórios em diversos formatos
- Dashboards personalizáveis pelo usuário
- Integração com ferramentas de CRM

## Suporte e Contribuições

Para suporte ou contribuições, entre em contato através do repositório do projeto ou pelo e-mail de suporte.

---

Desenvolvido com ❤️ para ajudar micro-SaaS a crescerem com decisões baseadas em dados.
