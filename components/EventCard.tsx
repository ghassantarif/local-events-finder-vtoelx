
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { colors } from '@/styles/commonStyles';
import { Event } from '@/data/events';
import { useLanguage } from '@/contexts/LanguageContext';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const { t, language, isRTL } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = language === 'he' ? 'he-IL' : 'en-US';
    return date.toLocaleDateString(locale, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTranslatedCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Music': t('music'),
      'Sports': t('sports'),
      'Arts': t('arts'),
      'Food': t('food'),
      'Technology': t('technology'),
      'Business': t('business'),
      'Health': t('health'),
      'Education': t('education'),
      'Entertainment': t('entertainment'),
    };
    return categoryMap[category] || category;
  };

  return (
    <Pressable style={[styles.card, isRTL && styles.rtlCard]} onPress={onPress}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={[styles.header, isRTL && styles.rtlHeader]}>
          <Text style={[styles.title, isRTL && styles.rtlText]} numberOfLines={2}>{event.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{getTranslatedCategory(event.category)}</Text>
          </View>
        </View>
        
        <Text style={[styles.description, isRTL && styles.rtlText]} numberOfLines={2}>
          {event.description}
        </Text>
        
        <View style={styles.details}>
          <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
            <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, isRTL && styles.rtlText]}>
              {formatDate(event.date)} {t('at')} {event.time}
            </Text>
          </View>
          
          <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
            <IconSymbol name="location" size={16} color={colors.textSecondary} />
            <Text style={[styles.detailText, isRTL && styles.rtlText]} numberOfLines={1}>
              {event.location.name} • {event.distance}{t('kmAway')}
            </Text>
          </View>
          
          <View style={[styles.detailRow, isRTL && styles.rtlDetailRow]}>
            <IconSymbol name="tag" size={16} color={colors.textSecondary} />
            <Text style={styles.priceText}>{event.price === 'Free' ? t('free') : event.price}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: colors.highlight,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.primary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  rtlCard: {
    direction: 'rtl',
  },
  rtlHeader: {
    flexDirection: 'row-reverse',
  },
  rtlDetailRow: {
    flexDirection: 'row-reverse',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
