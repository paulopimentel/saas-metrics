# Documentação do SaaS Metrics Dashboard

## Guia de Uso e Manutenção

Este documento fornece instruções detalhadas sobre como utilizar, configurar e manter o SaaS Metrics Dashboard integrado com a API da Asaas.

## Índice

1. [Introdução](#introdução)
2. [Configuração da Integração com Asaas](#configuração-da-integração-com-asaas)
3. [Dashboard Principal](#dashboard-principal)
4. [Métricas Detalhadas](#métricas-detalhadas)
5. [Configurações Avançadas](#configurações-avançadas)
6. [Solução de Problemas](#solução-de-problemas)
7. [Segurança e Boas Práticas](#segurança-e-boas-práticas)
8. [Manutenção e Atualizações](#manutenção-e-atualizações)

## Introdução

O SaaS Metrics Dashboard é uma ferramenta desenvolvida para empreendedores de Micro-SaaS que desejam acompanhar o desempenho de seus negócios com métricas em tempo real. Através da integração com a API da Asaas, o dashboard fornece insights valiosos sobre MRR (Monthly Recurring Revenue), churn, retenção, inadimplência e outras métricas essenciais.

### Principais Funcionalidades

- **Integração com Asaas**: Conexão direta com sua conta Asaas para obtenção de dados em tempo real
- **Dashboard Consolidado**: Visão geral das principais métricas de desempenho
- **Análises Detalhadas**: Páginas específicas para cada métrica importante
- **Detecção de Churn**: Identificação proativa de clientes com risco de cancelamento
- **Filtros Personalizáveis**: Análise de dados por diferentes períodos e segmentos
- **Exportação de Dados**: Possibilidade de exportar relatórios para análises externas

## Configuração da Integração com Asaas

### Obtenção do Token de API

1. Acesse sua conta Asaas em [https://www.asaas.com/](https://www.asaas.com/)
2. Navegue até "Configurações" > "API"
3. Gere um novo token de API ou copie o existente
4. Escolha o ambiente adequado (Sandbox para testes ou Produção)

### Configuração no Dashboard

1. No SaaS Metrics Dashboard, clique em "Configurar Integração" na página inicial
2. Na página de configurações, insira o token de API no campo correspondente
3. Selecione o ambiente (Sandbox ou Produção)
4. Clique em "Testar Conexão" para verificar se a integração está funcionando
5. Após confirmação de sucesso, todas as métricas serão atualizadas automaticamente

### Ambientes Disponíveis

- **Sandbox**: Ambiente de testes que não afeta dados reais. Ideal para familiarização com o sistema.
- **Produção**: Ambiente real com dados de produção. Use apenas quando estiver pronto para monitorar dados reais.

> **Importante**: O token de sandbox fornecido (`$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmUzY2ZhN2NiLTc0Y2UtNDFlYS04MDk5LTkwNDJmMTdmYTc5Zjo6JGFhY2hfMzRiZjY1NTgtYjk3Zi00OGFjLTg5ZTMtN2VlM2ZiYzQ0NDUy`) é apenas para fins de demonstração. Para uso real, substitua pelo seu próprio token.

## Dashboard Principal

O dashboard principal oferece uma visão consolidada das métricas mais importantes do seu negócio.

### Métricas Exibidas

- **MRR (Monthly Recurring Revenue)**: Receita recorrente mensal total
- **Churn Rate**: Taxa de cancelamento de assinaturas
- **Clientes Ativos**: Número total de clientes com assinaturas ativas
- **Inadimplência**: Taxa e valor total de pagamentos em atraso
- **Crescimento**: Comparativo de crescimento em relação ao período anterior

### Filtros Disponíveis

No topo do dashboard, você encontrará opções de filtro por período:

- Últimos 7 dias
- Últimos 30 dias
- Últimos 90 dias
- Últimos 12 meses
- Ano atual
- Todo período

Para aplicar um filtro, selecione a opção desejada no menu suspenso. Todas as métricas serão atualizadas automaticamente para refletir o período selecionado.

### Gráficos Interativos

Os gráficos no dashboard são interativos. Você pode:

- Passar o mouse sobre os pontos para ver valores específicos
- Clicar em legendas para mostrar/ocultar séries de dados
- Clicar em barras ou pontos para ver detalhes adicionais

## Métricas Detalhadas

O sistema oferece páginas dedicadas para análises mais profundas de cada métrica principal.

### MRR (Monthly Recurring Revenue)

A página de MRR fornece:

- Evolução do MRR ao longo do tempo
- Decomposição do MRR (novo, expansão, contração, churn)
- MRR por plano de assinatura
- Previsão de crescimento baseada em tendências atuais

Para acessar, clique em "MRR" no menu lateral.

### Churn e Retenção

A página de Churn e Retenção oferece:

- Taxa de churn atual e histórico
- Análise de cohort para retenção de clientes
- Motivos de cancelamento
- Lista de clientes com risco de churn

Para acessar, clique em "Churn" no menu lateral.

### Inadimplência

A página de Inadimplência mostra:

- Taxa de inadimplência atual
- Valor total em atraso
- Distribuição por tempo de atraso (30, 60, 90+ dias)
- Lista de clientes inadimplentes com detalhes

Para acessar, clique em "Inadimplentes" no menu lateral.

### Assinaturas

A página de Assinaturas apresenta:

- Total de assinaturas ativas e em trial
- Distribuição por plano
- Movimentações recentes (novas, upgrades, downgrades, cancelamentos)
- Lista detalhada de todas as assinaturas

Para acessar, clique em "Assinaturas" no menu lateral.

## Configurações Avançadas

### Notificações

Você pode configurar alertas e relatórios automáticos:

1. Acesse a página "Configurações"
2. Na seção "Notificações", ative ou desative as opções:
   - Relatório diário de MRR
   - Alerta de churn
   - Alerta de inadimplência
3. Informe o e-mail para recebimento das notificações
4. Clique em "Salvar Configurações"

### Detecção de Churn

Personalize os parâmetros para identificação de clientes com risco de churn:

1. Acesse a página "Configurações"
2. Na seção "Detecção de Churn", ajuste:
   - Limite de inatividade (dias)
   - Limite de uso (%)
   - Falhas de pagamento
3. Clique em "Salvar Configurações"

## Solução de Problemas

### Problemas de Conexão com a API

Se encontrar problemas na conexão com a API da Asaas:

1. Verifique se o token foi inserido corretamente
2. Confirme se o ambiente selecionado (Sandbox/Produção) está correto
3. Verifique se sua conta Asaas está ativa e sem restrições
4. Teste a conexão novamente após alguns minutos (pode haver limitações temporárias de API)

### Dados Não Atualizados

Se os dados não estiverem atualizando:

1. Verifique a conexão com a API (botão "Testar Conexão")
2. Atualize a página do navegador (F5)
3. Verifique se há transações recentes na sua conta Asaas
4. Limpe o cache do navegador e tente novamente

### Erros nos Gráficos

Se os gráficos não estiverem sendo exibidos corretamente:

1. Verifique se há dados suficientes para o período selecionado
2. Tente um período diferente no filtro
3. Atualize a página do navegador
4. Verifique se seu navegador está atualizado

## Segurança e Boas Práticas

### Proteção do Token de API

O token de API da Asaas concede acesso aos seus dados financeiros. Para protegê-lo:

1. Nunca compartilhe seu token com terceiros
2. Não inclua o token em códigos públicos ou repositórios
3. Troque seu token periodicamente
4. Use tokens com permissões limitadas quando possível

### Ambiente Sandbox vs. Produção

- **Sandbox**: Use para testes, desenvolvimento e familiarização com o sistema
- **Produção**: Use apenas quando estiver pronto para trabalhar com dados reais

### Backup de Dados

Embora o dashboard não armazene dados permanentemente (consulta diretamente a API da Asaas), é recomendável:

1. Exportar relatórios importantes periodicamente
2. Manter backups de configurações personalizadas
3. Documentar alterações significativas nas configurações

## Manutenção e Atualizações

### Atualizações do Sistema

O SaaS Metrics Dashboard recebe atualizações periódicas para melhorar funcionalidades e corrigir problemas. Para garantir o melhor desempenho:

1. Verifique regularmente se há novas versões disponíveis
2. Siga as instruções de atualização fornecidas com cada nova versão
3. Teste novas versões no ambiente Sandbox antes de aplicar em Produção

### Limites da API Asaas

A API da Asaas possui limites de requisições:

- Ambiente Sandbox: 60 requisições por minuto
- Ambiente Produção: 120 requisições por minuto

O dashboard foi projetado para respeitar esses limites, mas em caso de uso intensivo, pode ser necessário ajustar a frequência de atualização dos dados.

### Suporte Técnico

Para obter suporte técnico:

1. Consulte esta documentação para soluções comuns
2. Verifique a documentação oficial da API Asaas para questões relacionadas à integração
3. Entre em contato com o desenvolvedor para problemas específicos do dashboard

---

## Conclusão

O SaaS Metrics Dashboard com integração Asaas oferece uma solução completa para monitoramento e análise do desempenho do seu Micro-SaaS. Seguindo as orientações deste guia, você poderá aproveitar ao máximo todas as funcionalidades disponíveis e tomar decisões baseadas em dados concretos.

Para qualquer dúvida adicional ou sugestão de melhoria, entre em contato com a equipe de desenvolvimento.

---

*Última atualização: Maio de 2025*
