
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { categories, distanceOptions } from '@/data/events';

interface FilterBarProps {
  selectedCategory: string;
  selectedDistance: number;
  onCategoryChange: (category: string) => void;
  onDistanceChange: (distance: number) => void;
}

export default function FilterBar({
  selectedCategory,
  selectedDistance,
  onCategoryChange,
  onDistanceChange,
}: FilterBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {categories.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.selectedChip
              ]}
              onPress={() => onCategoryChange(category)}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === category && styles.selectedChipText
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distance</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {distanceOptions.map((option) => (
            <Pressable
              key={option.value}
              style={[
                styles.filterChip,
                selectedDistance === option.value && styles.selectedChip
              ]}
              onPress={() => onDistanceChange(option.value)}
            >
              <IconSymbol 
                name="location" 
                size={14} 
                color={selectedDistance === option.value ? colors.primary : colors.textSecondary} 
              />
              <Text
                style={[
                  styles.chipText,
                  selectedDistance === option.value && styles.selectedChipText
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.highlight,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.highlight,
    gap: 4,
  },
  selectedChip: {
    backgroundColor: colors.highlight,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  selectedChipText: {
    color: colors.primary,
    fontWeight: '600',
  },
});
