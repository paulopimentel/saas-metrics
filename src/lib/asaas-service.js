/**
 * Arquivo de serviço para integração com a API da Asaas
 * 
 * Este serviço gerencia todas as chamadas para a API da Asaas,
 * incluindo autenticação, tratamento de erros e transformação de dados.
 * 
 * @module services/asaas
 */

/**
 * Configuração base para a API da Asaas
 * @typedef {Object} AsaasConfig
 * @property {string} token - Token de API da Asaas
 * @property {string} environment - Ambiente (sandbox ou production)
 */

/**
 * Classe para gerenciar a integração com a API da Asaas
 */
export class AsaasService {
  /**
   * Cria uma nova instância do serviço Asaas
   * @param {string} token - Token de API da Asaas
   * @param {string} environment - Ambiente (sandbox ou production)
   */
  constructor(token, environment = 'sandbox') {
    this.token = token;
    this.baseUrl = environment === 'sandbox' 
      ? 'https://sandbox.asaas.com/api/v3'
      : 'https://www.asaas.com/api/v3';
    this.headers = {
      'Content-Type': 'application/json',
      'access_token': token
    };
  }

  /**
   * Método auxiliar para fazer requisições à API
   * @param {string} endpoint - Endpoint da API
   * @param {Object} options - Opções da requisição
   * @returns {Promise<Object>} - Resposta da API
   * @private
   */
  async _request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      ...options,
      headers: this.headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.description || 'Erro na requisição para a API da Asaas');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na requisição para a API da Asaas:', error);
      throw error;
    }
  }

  /**
   * Testa a conexão com a API da Asaas
   * @returns {Promise<boolean>} - True se a conexão for bem-sucedida
   */
  async testConnection() {
    try {
      await this._request('/customers?limit=1');
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtém todos os clientes
   * @param {Object} params - Parâmetros de consulta
   * @returns {Promise<Array>} - Lista de clientes
   */
  async getCustomers(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/customers?${queryParams}`;
    const response = await this._request(endpoint);
    return response.data;
  }

  /**
   * Obtém todas as assinaturas
   * @param {Object} params - Parâmetros de consulta
   * @returns {Promise<Array>} - Lista de assinaturas
   */
  async getSubscriptions(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/subscriptions?${queryParams}`;
    const response = await this._request(endpoint);
    return response.data;
  }

  /**
   * Obtém todos os pagamentos
   * @param {Object} params - Parâmetros de consulta
   * @returns {Promise<Array>} - Lista de pagamentos
   */
  async getPayments(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/payments?${queryParams}`;
    const response = await this._request(endpoint);
    return response.data;
  }

  /**
   * Calcula o MRR (Monthly Recurring Revenue) com base nas assinaturas ativas
   * @returns {Promise<Object>} - Dados de MRR
   */
  async calculateMRR() {
    const subscriptions = await this.getSubscriptions({ status: 'ACTIVE' });
    
    let totalMRR = 0;
    let subscriptionsByPlan = {};
    
    subscriptions.forEach(subscription => {
      const value = subscription.value;
      totalMRR += value;
      
      // Agrupando por plano
      const planName = subscription.billingType || 'Outros';
      if (!subscriptionsByPlan[planName]) {
        subscriptionsByPlan[planName] = {
          count: 0,
          value: 0
        };
      }
      
      subscriptionsByPlan[planName].count += 1;
      subscriptionsByPlan[planName].value += value;
    });
    
    return {
      totalMRR,
      subscriptionCount: subscriptions.length,
      subscriptionsByPlan
    };
  }

  /**
   * Obtém dados de inadimplência
   * @returns {Promise<Object>} - Dados de inadimplência
   */
  async getDefaultersData() {
    const payments = await this.getPayments({ status: 'OVERDUE' });
    
    let totalOverdue = 0;
    let customerCount = new Set();
    let paymentsByDaysOverdue = {
      '1-7': { count: 0, value: 0 },
      '8-15': { count: 0, value: 0 },
      '16-30': { count: 0, value: 0 },
      '31-60': { count: 0, value: 0 },
      '60+': { count: 0, value: 0 }
    };
    
    payments.forEach(payment => {
      const value = payment.value;
      totalOverdue += value;
      customerCount.add(payment.customer);
      
      // Calculando dias em atraso
      const dueDate = new Date(payment.dueDate);
      const today = new Date();
      const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
      
      // Agrupando por dias em atraso
      let category;
      if (daysOverdue <= 7) category = '1-7';
      else if (daysOverdue <= 15) category = '8-15';
      else if (daysOverdue <= 30) category = '16-30';
      else if (daysOverdue <= 60) category = '31-60';
      else category = '60+';
      
      paymentsByDaysOverdue[category].count += 1;
      paymentsByDaysOverdue[category].value += value;
    });
    
    return {
      totalOverdue,
      customerCount: customerCount.size,
      paymentsByDaysOverdue,
      payments
    };
  }

  /**
   * Identifica clientes com potencial de churn com base em critérios configuráveis
   * @param {Object} criteria - Critérios para identificação de churn
   * @returns {Promise<Array>} - Lista de clientes com risco de churn
   */
  async identifyPotentialChurn(criteria = {}) {
    const { 
      inactivityThreshold = 14, // dias
      paymentFailures = 2,      // quantidade
      usageThreshold = 30       // percentual
    } = criteria;
    
    // Esta é uma implementação simulada
    // Em um ambiente real, seria necessário integrar com dados de uso do produto
    
    // Obtendo clientes com pagamentos em atraso
    const overduePayments = await this.getPayments({ status: 'OVERDUE' });
    
    // Agrupando por cliente
    const customerPaymentFailures = {};
    overduePayments.forEach(payment => {
      const customerId = payment.customer;
      if (!customerPaymentFailures[customerId]) {
        customerPaymentFailures[customerId] = 0;
      }
      customerPaymentFailures[customerId] += 1;
    });
    
    // Filtrando clientes com número de falhas acima do limite
    const customersAtRisk = [];
    for (const [customerId, failures] of Object.entries(customerPaymentFailures)) {
      if (failures >= paymentFailures) {
        const customerDetails = await this._request(`/customers/${customerId}`);
        customersAtRisk.push({
          ...customerDetails,
          riskFactor: 'payment_failures',
          riskLevel: failures >= paymentFailures * 1.5 ? 'high' : 'medium',
          failures
        });
      }
    }
    
    return customersAtRisk;
  }
}

/**
 * Cria uma instância do serviço Asaas com base na configuração
 * @param {AsaasConfig} config - Configuração da API
 * @returns {AsaasService} - Instância do serviço
 */
export function createAsaasService(config) {
  return new AsaasService(config.token, config.environment);
}

/**
 * Transforma dados brutos da API em formato adequado para os gráficos
 * @param {Array} data - Dados brutos
 * @param {string} type - Tipo de transformação
 * @returns {Array} - Dados transformados
 */
export function transformDataForCharts(data, type) {
  switch (type) {
    case 'mrr':
      // Transformação para gráfico de MRR
      return data.map(item => ({
        month: new Date(item.date).toLocaleDateString('pt-BR', { month: 'short' }),
        value: item.value
      }));
      
    case 'churn':
      // Transformação para gráfico de churn
      return data.map(item => ({
        month: new Date(item.date).toLocaleDateString('pt-BR', { month: 'short' }),
        churn: item.churnRate,
        retenção: 100 - item.churnRate
      }));
      
    case 'defaulters':
      // Transformação para gráfico de inadimplência
      return Object.entries(data).map(([category, value]) => ({
        dias: category,
        valor: value
      }));
      
    default:
      return data;
  }
}

export default {
  createAsaasService,
  transformDataForCharts
};
