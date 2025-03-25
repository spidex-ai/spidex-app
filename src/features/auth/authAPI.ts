import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import apiClient from '../../api/apiClient';
import { Auth, signIn } from './authSlice';

export interface SignMessageData {
  signature: string;
  address: string;
  publicKey: string;
  role: string;
}

export const getNouce = async () => {
  const response = await apiClient.get('/auth/connect-wallet/sign-message');
  return response.data;
}

export const connectGoogle = async (idToken: string) => {
  const response = await apiClient.post('/auth/connect/google', { idToken });
  return response.data;
}

export const connectX = async (code: string, redirectUri: string) => {
  const response = await apiClient.post('/auth/connect/x', { code, redirectUri });
  return response.data;
}

export const useSignMessage = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation<Auth, Error, SignMessageData>({
    mutationFn: async (data) => {
      const response = await apiClient.post<Auth>('/auth/connect-wallet', data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      dispatch(signIn(data));
    },
  });
};
