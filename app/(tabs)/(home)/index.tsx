
import React, { useState, useMemo } from "react";
import { Stack, useRouter } from "expo-router";
import { FlatList, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { mockEvents, Event } from "@/data/events";
import EventCard from "@/components/EventCard";
import FilterBar from "@/components/FilterBar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeScreen() {
  const router = useRouter();
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistance, setSelectedDistance] = useState(1000); // Any distance

  console.log('HomeScreen rendered with filters:', { selectedCategory, selectedDistance });

  const filteredEvents = useMemo(() => {
    let filtered = mockEvents;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Filter by distance
    filtered = filtered.filter(event => event.distance <= selectedDistance);

    // Sort by distance (closest first)
    filtered.sort((a, b) => a.distance - b.distance);

    console.log('Filtered events count:', filtered.length);
    return filtered;
  }, [selectedCategory, selectedDistance]);

  const handleEventPress = (event: Event) => {
    console.log('Event pressed:', event.name);
    router.push(`/event/${event.id}`);
  };

  const renderEvent = ({ item }: { item: Event }) => (
    <EventCard 
      event={item} 
      onPress={() => handleEventPress(item)} 
    />
  );

  const renderHeader = () => (
    <FilterBar
      selectedCategory={selectedCategory}
      selectedDistance={selectedDistance}
      onCategoryChange={setSelectedCategory}
      onDistanceChange={setSelectedDistance}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol name="calendar" size={48} color={colors.textSecondary} />
      <Text style={[styles.emptyTitle, isRTL && styles.rtlText]}>{t('noEventsFound')}</Text>
      <Text style={[styles.emptyText, isRTL && styles.rtlText]}>
        {t('noEventsText')}
      </Text>
    </View>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: t('localEvents'),
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
      <View style={[commonStyles.container, { backgroundColor: colors.background }, isRTL && styles.rtlContainer]}>
        <FlatList
          data={filteredEvents}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={[
            styles.listContainer,
            Platform.OS !== 'ios' && styles.listContainerWithTabBar,
            filteredEvents.length === 0 && styles.emptyListContainer
          ]}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
  listContainerWithTabBar: {
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  rtlContainer: {
    direction: 'rtl',
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
