
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  console.log('ProfileScreen rendered');

  const profileSections = [
    {
      title: 'My Events',
      items: [
        { label: 'Saved Events', icon: 'heart', value: '12' },
        { label: 'Attended Events', icon: 'checkmark.circle', value: '8' },
        { label: 'My Reviews', icon: 'star', value: '5' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Notification Settings', icon: 'bell', action: true },
        { label: 'Location Settings', icon: 'location', action: true },
        { label: 'Category Preferences', icon: 'tag', action: true },
      ]
    },
    {
      title: 'Account',
      items: [
        { label: 'Edit Profile', icon: 'person.circle', action: true },
        { label: 'Privacy Settings', icon: 'lock', action: true },
        { label: 'Help & Support', icon: 'questionmark.circle', action: true },
      ]
    }
  ];

  const renderSection = (section: typeof profileSections[0]) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map((item, index) => (
          <Pressable key={item.label} style={styles.listItem}>
            <View style={styles.itemLeft}>
              <View style={styles.iconContainer}>
                <IconSymbol name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
            <View style={styles.itemRight}>
              {item.value && (
                <Text style={styles.itemValue}>{item.value}</Text>
              )}
              {item.action && (
                <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Profile",
            headerStyle: {
              backgroundColor: colors.card,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
      )}
      <ScrollView 
        style={[commonStyles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.userLocation}>📍 New York, NY</Text>
        </View>

        {profileSections.map(renderSection)}

        <View style={styles.footer}>
          <Pressable style={styles.logoutButton}>
            <IconSymbol name="arrow.right.square" size={20} color={colors.secondary} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </Pressable>
          
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.card,
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  userLocation: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: colors.card,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.highlight,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    gap: 8,
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  versionText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
