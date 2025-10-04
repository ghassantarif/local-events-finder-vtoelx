
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from './IconSymbol';
import { useLanguage } from '@/contexts/LanguageContext';

interface EditableProfileFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'url';
  isEditing: boolean;
  onEditToggle: () => void;
  options?: { label: string; value: string }[];
}

export default function EditableProfileField({
  label,
  value,
  onSave,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  isEditing,
  onEditToggle,
  options
}: EditableProfileFieldProps) {
  const { t, isRTL } = useLanguage();
  const [tempValue, setTempValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);

  console.log('EditableProfileField rendered:', { label, isEditing });

  const handleSave = () => {
    console.log('Saving field:', label, 'with value:', tempValue);
    onSave(tempValue);
    onEditToggle();
  };

  const handleCancel = () => {
    console.log('Canceling edit for field:', label);
    setTempValue(value);
    onEditToggle();
  };

  const handleOptionSelect = (optionValue: string) => {
    console.log('Option selected:', optionValue);
    setTempValue(optionValue);
    setShowOptions(false);
  };

  if (isEditing) {
    return (
      <View style={[styles.container, isRTL && styles.rtlContainer]}>
        <Text style={[styles.label, isRTL && styles.rtlText]}>{label}</Text>
        
        {options ? (
          <Pressable 
            style={[styles.selectButton, isRTL && styles.rtlSelectButton]}
            onPress={() => setShowOptions(true)}
          >
            <Text style={[styles.selectButtonText, isRTL && styles.rtlText]}>
              {tempValue || placeholder}
            </Text>
            <IconSymbol 
              name={isRTL ? "chevron.left" : "chevron.right"} 
              size={16} 
              color={colors.textSecondary} 
            />
          </Pressable>
        ) : (
          <TextInput
            style={[
              styles.input,
              multiline && styles.multilineInput,
              isRTL && styles.rtlInput
            ]}
            value={tempValue}
            onChangeText={setTempValue}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            multiline={multiline}
            numberOfLines={multiline ? 3 : 1}
            keyboardType={keyboardType}
            textAlign={isRTL ? 'right' : 'left'}
          />
        )}
        
        <View style={[styles.buttonContainer, isRTL && styles.rtlButtonContainer]}>
          <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>{t('cancel')}</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t('save')}</Text>
          </Pressable>
        </View>

        {options && (
          <Modal
            visible={showOptions}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowOptions(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, isRTL && styles.rtlModalContent]}>
                <Text style={[styles.modalTitle, isRTL && styles.rtlText]}>{label}</Text>
                <ScrollView style={styles.optionsContainer}>
                  {options.map((option) => (
                    <Pressable
                      key={option.value}
                      style={[
                        styles.optionItem,
                        tempValue === option.value && styles.selectedOption,
                        isRTL && styles.rtlOptionItem
                      ]}
                      onPress={() => handleOptionSelect(option.value)}
                    >
                      <Text style={[
                        styles.optionText,
                        tempValue === option.value && styles.selectedOptionText,
                        isRTL && styles.rtlText
                      ]}>
                        {option.label}
                      </Text>
                      {tempValue === option.value && (
                        <IconSymbol name="checkmark" size={20} color={colors.primary} />
                      )}
                    </Pressable>
                  ))}
                </ScrollView>
                <Pressable 
                  style={styles.modalCloseButton} 
                  onPress={() => setShowOptions(false)}
                >
                  <Text style={styles.modalCloseButtonText}>{t('cancel')}</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, isRTL && styles.rtlContainer]}>
      <View style={[styles.fieldRow, isRTL && styles.rtlFieldRow]}>
        <View style={styles.fieldContent}>
          <Text style={[styles.label, isRTL && styles.rtlText]}>{label}</Text>
          <Text style={[styles.value, isRTL && styles.rtlText]}>
            {value || placeholder}
          </Text>
        </View>
        <Pressable style={styles.editButton} onPress={onEditToggle}>
          <IconSymbol name="pencil" size={16} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
  },
  fieldContent: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: colors.text,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: colors.highlight,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.highlight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
    marginBottom: 12,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.highlight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: colors.card,
    marginBottom: 12,
  },
  selectButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.textSecondary,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    maxHeight: 300,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  selectedOption: {
    backgroundColor: colors.highlight,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
  },
  selectedOptionText: {
    fontWeight: '600',
    color: colors.primary,
  },
  modalCloseButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.textSecondary,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  // RTL Styles
  rtlContainer: {
    direction: 'rtl',
  },
  rtlFieldRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlInput: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rtlSelectButton: {
    flexDirection: 'row-reverse',
  },
  rtlButtonContainer: {
    flexDirection: 'row-reverse',
  },
  rtlModalContent: {
    direction: 'rtl',
  },
  rtlOptionItem: {
    flexDirection: 'row-reverse',
  },
});
