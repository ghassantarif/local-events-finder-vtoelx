
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import React from 'react';
import { Platform } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TabLayout() {
  const { t } = useLanguage();
  
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      title: t('events'),
      icon: 'calendar',
      route: '/(tabs)/(home)',
    },
    {
      name: 'profile',
      title: t('profile'),
      icon: 'person',
      route: '/(tabs)/profile',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Screen
          name="(home)"
          options={{
            title: t('events'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" color={color} size={size} />
            ),
          }}
        />
        <NativeTabs.Screen
          name="profile"
          options={{
            title: t('profile'),
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={size} />
            ),
          }}
        />
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(home)" />
        <Stack.Screen name="profile" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
