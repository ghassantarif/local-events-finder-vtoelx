
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { mockEvents } from '@/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  
  console.log('Event details screen for ID:', id);
  
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <View style={[commonStyles.container, styles.errorContainer]}>
        <Stack.Screen options={{ title: 'Event Not Found' }} />
        <IconSymbol name="exclamationmark.triangle" size={48} color={colors.textSecondary} />
        <Text style={styles.errorTitle}>Event Not Found</Text>
        <Text style={styles.errorText}>
          The event you're looking for doesn't exist or has been removed.
        </Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: event.name,
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      <ScrollView 
        style={[commonStyles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <Image source={{ uri: event.image }} style={styles.heroImage} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{event.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{event.category}</Text>
            </View>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Event Details</Text>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <IconSymbol name="calendar" size={20} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>
                  {formatDate(event.date)}
                </Text>
                <Text style={styles.detailValue}>
                  {formatTime(event.time)}
                </Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <IconSymbol name="location" size={20} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{event.location.name}</Text>
                <Text style={styles.detailSubValue}>{event.location.address}</Text>
                <Text style={styles.detailSubValue}>{event.distance}km away</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <IconSymbol name="tag" size={20} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Price</Text>
                <Text style={styles.priceValue}>{event.price}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <IconSymbol name="person" size={20} color={colors.primary} />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Organizer</Text>
                <Text style={styles.detailValue}>{event.organizer}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.mapNote}>
            📍 Maps are not supported in Natively right now, but you can copy the address above to your preferred maps app.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.actionButton}>
          <IconSymbol name="heart" size={20} color={colors.card} />
          <Text style={styles.actionButtonText}>Save Event</Text>
        </Pressable>
        <Pressable style={[styles.actionButton, styles.primaryButton]}>
          <IconSymbol name="calendar.badge.plus" size={20} color={colors.card} />
          <Text style={[styles.actionButtonText, styles.primaryButtonText]}>
            Add to Calendar
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100, // Space for bottom bar
  },
  heroImage: {
    width: '100%',
    height: 250,
    backgroundColor: colors.highlight,
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: 12,
  },
  categoryBadge: {
    backgroundColor: colors.highlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.highlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  detailSubValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  mapNote: {
    fontSize: 14,
    color: colors.textSecondary,
    backgroundColor: colors.highlight,
    padding: 12,
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.highlight,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  primaryButtonText: {
    color: colors.card,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
