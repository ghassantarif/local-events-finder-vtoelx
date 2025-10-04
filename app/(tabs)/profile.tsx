
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function ProfileScreen() {
  console.log('ProfileScreen rendered');
  const { t, isRTL } = useLanguage();

  const profileSections = [
    {
      title: t('myEvents'),
      items: [
        { label: t('savedEvents'), icon: 'heart', value: '12' },
        { label: t('attendedEvents'), icon: 'checkmark.circle', value: '8' },
        { label: t('myReviews'), icon: 'star', value: '5' },
      ]
    },
    {
      title: t('preferences'),
      items: [
        { label: t('notificationSettings'), icon: 'bell', action: true },
        { label: t('locationSettings'), icon: 'location', action: true },
        { label: t('categoryPreferences'), icon: 'tag', action: true },
      ]
    },
    {
      title: t('account'),
      items: [
        { label: t('editProfile'), icon: 'person.circle', action: true },
        { label: t('privacySettings'), icon: 'lock', action: true },
        { label: t('helpSupport'), icon: 'questionmark.circle', action: true },
      ]
    }
  ];

  const renderSection = (section: typeof profileSections[0]) => (
    <View key={section.title} style={styles.section}>
      <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map((item, index) => (
          <Pressable key={item.label} style={[styles.listItem, isRTL && styles.rtlListItem]}>
            <View style={[styles.itemLeft, isRTL && styles.rtlItemLeft]}>
              <View style={styles.iconContainer}>
                <IconSymbol name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[styles.itemLabel, isRTL && styles.rtlText]}>{item.label}</Text>
            </View>
            <View style={[styles.itemRight, isRTL && styles.rtlItemRight]}>
              {item.value && (
                <Text style={styles.itemValue}>{item.value}</Text>
              )}
              {item.action && (
                <IconSymbol name={isRTL ? "chevron.left" : "chevron.right"} size={16} color={colors.textSecondary} />
              )}
            </View>
          </Pressable>
        ))}
        {/* Add language selector to preferences section */}
        {section.title === t('preferences') && <LanguageSelector />}
      </View>
    </View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: t('profile'),
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
        style={[commonStyles.container, { backgroundColor: colors.background }, isRTL && styles.rtlContainer]}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={[styles.userName, isRTL && styles.rtlText]}>John Doe</Text>
          <Text style={[styles.userEmail, isRTL && styles.rtlText]}>john.doe@example.com</Text>
          <Text style={[styles.userLocation, isRTL && styles.rtlText]}>📍 New York, NY</Text>
        </View>

        {profileSections.map(renderSection)}

        <View style={styles.footer}>
          <Pressable style={[styles.logoutButton, isRTL && styles.rtlLogoutButton]}>
            <IconSymbol name="arrow.right.square" size={20} color={colors.secondary} />
            <Text style={styles.logoutText}>{t('signOut')}</Text>
          </Pressable>
          
          <Text style={[styles.versionText, isRTL && styles.rtlText]}>{t('version')} 1.0.0</Text>
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
  rtlContainer: {
    direction: 'rtl',
  },
  rtlListItem: {
    flexDirection: 'row-reverse',
  },
  rtlItemLeft: {
    flexDirection: 'row-reverse',
  },
  rtlItemRight: {
    flexDirection: 'row-reverse',
  },
  rtlLogoutButton: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
