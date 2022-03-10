import React from 'react';
import { useMoralis } from 'react-moralis';

export default function auth() {
  const { authenticate, isAuthenticated, logout, isAuthenticating, user } =
    useMoralis();
  return <div>auth</div>;
}
