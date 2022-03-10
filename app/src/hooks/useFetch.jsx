import React from 'react';
import { useWeb3ExecuteFunction } from 'react-moralis';
import { kickstart_abi } from '../abi';

export default function useFetch(options) {
  const { data, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    contractAddress: process.env.REACT_APP_KICKSTART_ADD,
    abi: kickstart_abi,
    ...options,
  });

  return {
    data,
    fetch,
    isFetching,
    isLoading,
  };
}
