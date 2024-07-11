import api from '../../services/api';
import {QueryFunctionContext, useQuery} from '@tanstack/react-query';

async function getRepos(ctx) {
  const [, userId] = ctx.queryKey;
  const {data} = await api.get(`/users/${userId}/repos`);
  // const { data } = await api.get(`/users/CarlosLevir/repos`);
  return data;
}

// Adiciona o cach dentro da função getRepos
export default function useFetchRepos(userId) {
  return useQuery(['repos', userId], getRepos);
}
