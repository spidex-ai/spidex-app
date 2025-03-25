import apiClient from '../api/apiClient';

export enum DeploymentType {
  TEE = "TEE",
  NVM = "NVM"
}

export interface CreateAgentInfo {
  deploymentType?: DeploymentType;
  bio?: string;
  goal?: string;
  avatar?: string;
  mission?: string;
  primaryFunction?: string;
  description?: string;
  category?: string[];
  topics?: string;
  generalStyle?: string;
  chatStyle?: string;
  postStyle?: string;
  postExamples?: string;
  messageExamples?: string;
  adjective?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  prompt?: string;
  agentName?: string;
}

export interface AgentInfo extends CreateAgentInfo {
  id: number;
  name: string;
  updatedAt: string;
}

export interface CreateAgentRequest {
  aiAgentDto: CreateAgentInfo;
}

export interface ListAgentsParams {
  orderBy?: string;
  direction?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
  categories?: string[];
  search?: string;
}

interface SendMessageRequest {
  text: string;
  threadId: string;
  assistantId: string;
  aiAgentId: number;
}

export const agentService = {
  createAgent: async (agentData: CreateAgentRequest) => {
    try {
      const response = await apiClient.post('/agent', agentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAgent: async (agentId: string) => {
    try {
      const response = await apiClient.get(`/agent/${agentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAgentConversationThread: async (tokenId: number) => {
    try {
      const response = await apiClient.get(`/agent/conversation-thread/${tokenId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendChatMessage: async (messageData: SendMessageRequest) => {
    try {
      const response = await apiClient.post('/agent/chat/message', messageData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateAgent: async (assistantId: number, agentData: CreateAgentRequest) => {
    try {
      const response = await apiClient.put(`/agent/${assistantId}`, agentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  listAgents: async (params: ListAgentsParams = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add optional parameters if they exist
      if (params.orderBy) queryParams.set('orderBy', params.orderBy);
      if (params.direction) queryParams.set('direction', params.direction);
      if (params.page) queryParams.set('page', params.page.toString());
      if (params.limit) queryParams.set('limit', params.limit.toString());
      if (params.search) queryParams.set('search', params.search);
      if (params.categories?.length) {
        params.categories.forEach(category => 
          queryParams.append('categories', category)
        );
      }

      const response = await apiClient.get(`/agent?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
