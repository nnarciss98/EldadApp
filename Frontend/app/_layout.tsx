import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="acasa"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          title: 'Acasa',
        }}
      />
      <Tabs.Screen
        name="muzica"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" color={color} size={size} />
          ),
          title: 'Muzica',
        }}
      />
      <Tabs.Screen
        name="kids"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy" color={color} size={size} />
          ),
          title: 'Kids',
        }}
      />
      <Tabs.Screen
        name="podcast"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mic" color={color} size={size} />
          ),
          title: 'Podcast',
        }}
      />
    </Tabs>
  );
}
