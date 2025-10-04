
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, Alert } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', nativeName: 'English' },
    { code: 'he' as const, name: 'Hebrew', nativeName: 'עברית' },
  ];

  const handleLanguageSelect = async (langCode: 'en' | 'he') => {
    try {
      await setLanguage(langCode);
      setModalVisible(false);
      
      // Show success message
      Alert.alert(
        t('languageChanged'),
        '',
        [{ text: t('done'), style: 'default' }]
      );
    } catch (error) {
      console.log('Error changing language:', error);
    }
  };

  const getCurrentLanguageName = () => {
    const currentLang = languages.find(lang => lang.code === language);
    return currentLang?.nativeName || 'English';
  };

  return (
    <>
      <Pressable style={styles.selector} onPress={() => setModalVisible(true)}>
        <View style={styles.selectorContent}>
          <View style={styles.iconContainer}>
            <IconSymbol name="globe" size={20} color={colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>{t('languageSettings')}</Text>
            <Text style={styles.value}>{getCurrentLanguageName()}</Text>
          </View>
        </View>
        <IconSymbol name="chevron.right" size={16} color={colors.textSecondary} />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, isRTL && styles.modalContentRTL]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('selectLanguage')}</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <IconSymbol name="xmark" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>

            <View style={styles.languageList}>
              {languages.map((lang) => (
                <Pressable
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.code && styles.selectedLanguageOption
                  ]}
                  onPress={() => handleLanguageSelect(lang.code)}
                >
                  <View style={styles.languageInfo}>
                    <Text style={[
                      styles.languageName,
                      language === lang.code && styles.selectedLanguageName
                    ]}>
                      {lang.nativeName}
                    </Text>
                    <Text style={styles.languageSubtext}>
                      {lang.name}
                    </Text>
                  </View>
                  {language === lang.code && (
                    <IconSymbol name="checkmark" size={20} color={colors.primary} />
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.highlight,
  },
  selectorContent: {
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
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    maxHeight: '50%',
  },
  modalContentRTL: {
    // RTL specific styles if needed
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.highlight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    paddingTop: 8,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  selectedLanguageOption: {
    backgroundColor: colors.highlight,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  selectedLanguageName: {
    color: colors.primary,
    fontWeight: '600',
  },
  languageSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
