
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Alert } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import EditableProfileField from "@/components/EditableProfileField";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  interests: string;
  website: string;
}

const PROFILE_STORAGE_KEY = '@user_profile';

export default function ProfileScreen() {
  console.log('ProfileScreen rendered');
  const { t, isRTL } = useLanguage();
  const [editingField, setEditingField] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Event enthusiast and tech lover. Always looking for new experiences and connections.',
    city: 'New York',
    country: 'United States',
    dateOfBirth: '1990-01-15',
    gender: 'male',
    interests: 'Technology, Music, Sports, Food',
    website: 'https://johndoe.com',
  });

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile);
        console.log('Loaded profile data:', parsedProfile);
        setProfileData(parsedProfile);
      }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  const saveProfileData = async (newData: ProfileData) => {
    try {
      await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(newData));
      console.log('Profile data saved successfully');
      Alert.alert(t('profileUpdated'));
    } catch (error) {
      console.log('Error saving profile data:', error);
    }
  };

  const handleFieldSave = (field: keyof ProfileData, value: string) => {
    console.log('Updating field:', field, 'with value:', value);
    const newProfileData = { ...profileData, [field]: value };
    setProfileData(newProfileData);
    saveProfileData(newProfileData);
  };

  const handleEditToggle = (field: string) => {
    console.log('Toggling edit for field:', field);
    setEditingField(editingField === field ? null : field);
  };

  const genderOptions = [
    { label: t('male'), value: 'male' },
    { label: t('female'), value: 'female' },
    { label: t('other'), value: 'other' },
    { label: t('preferNotToSay'), value: 'prefer_not_to_say' },
  ];

  const getGenderLabel = (value: string) => {
    const option = genderOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };

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
          <Text style={[styles.userName, isRTL && styles.rtlText]}>{profileData.fullName}</Text>
          <Text style={[styles.userEmail, isRTL && styles.rtlText]}>{profileData.email}</Text>
          <Text style={[styles.userLocation, isRTL && styles.rtlText]}>
            📍 {profileData.city}, {profileData.country}
          </Text>
        </View>

        {/* Editable Profile Fields Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isRTL && styles.rtlText]}>{t('editProfile')}</Text>
          <View style={styles.editableFieldsContainer}>
            <EditableProfileField
              label={t('fullName')}
              value={profileData.fullName}
              onSave={(value) => handleFieldSave('fullName', value)}
              placeholder={t('enterFullName')}
              isEditing={editingField === 'fullName'}
              onEditToggle={() => handleEditToggle('fullName')}
            />
            
            <EditableProfileField
              label={t('email')}
              value={profileData.email}
              onSave={(value) => handleFieldSave('email', value)}
              placeholder={t('enterEmail')}
              keyboardType="email-address"
              isEditing={editingField === 'email'}
              onEditToggle={() => handleEditToggle('email')}
            />
            
            <EditableProfileField
              label={t('phone')}
              value={profileData.phone}
              onSave={(value) => handleFieldSave('phone', value)}
              placeholder={t('enterPhone')}
              keyboardType="phone-pad"
              isEditing={editingField === 'phone'}
              onEditToggle={() => handleEditToggle('phone')}
            />
            
            <EditableProfileField
              label={t('bio')}
              value={profileData.bio}
              onSave={(value) => handleFieldSave('bio', value)}
              placeholder={t('enterBio')}
              multiline={true}
              isEditing={editingField === 'bio'}
              onEditToggle={() => handleEditToggle('bio')}
            />
            
            <EditableProfileField
              label={t('city')}
              value={profileData.city}
              onSave={(value) => handleFieldSave('city', value)}
              placeholder={t('enterCity')}
              isEditing={editingField === 'city'}
              onEditToggle={() => handleEditToggle('city')}
            />
            
            <EditableProfileField
              label={t('country')}
              value={profileData.country}
              onSave={(value) => handleFieldSave('country', value)}
              placeholder={t('enterCountry')}
              isEditing={editingField === 'country'}
              onEditToggle={() => handleEditToggle('country')}
            />
            
            <EditableProfileField
              label={t('gender')}
              value={getGenderLabel(profileData.gender)}
              onSave={(value) => handleFieldSave('gender', value)}
              placeholder={t('selectGender')}
              isEditing={editingField === 'gender'}
              onEditToggle={() => handleEditToggle('gender')}
              options={genderOptions}
            />
            
            <EditableProfileField
              label={t('interests')}
              value={profileData.interests}
              onSave={(value) => handleFieldSave('interests', value)}
              placeholder={t('interests')}
              multiline={true}
              isEditing={editingField === 'interests'}
              onEditToggle={() => handleEditToggle('interests')}
            />
            
            <EditableProfileField
              label={t('website')}
              value={profileData.website}
              onSave={(value) => handleFieldSave('website', value)}
              placeholder={t('enterWebsite')}
              keyboardType="url"
              isEditing={editingField === 'website'}
              onEditToggle={() => handleEditToggle('website')}
            />
          </View>
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
  editableFieldsContainer: {
    backgroundColor: colors.background,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
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
