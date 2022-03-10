import { useWeb3ExecuteFunction } from 'react-moralis';
import { campaign_abi } from '../abi';

export default function useFetch (options) {
  const { data, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: campaign_abi,
    ...options,
  });
  return {
    data,
    fetch,
    isFetching,
    isLoading,
  };
};
