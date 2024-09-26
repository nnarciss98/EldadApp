import React from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the 'Acasa' tab
  return <Redirect href='/acasa' />;
}
