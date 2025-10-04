
export interface Event {
  id: string;
  name: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  distance: number; // in kilometers
  image: string;
  price?: string;
  organizer: string;
}

export const categories = [
  'All',
  'Music',
  'Sports',
  'Arts',
  'Food',
  'Technology',
  'Business',
  'Health',
  'Education',
  'Entertainment'
];

export const distanceOptions = [
  { label: '5 km', value: 5 },
  { label: '10 km', value: 10 },
  { label: '20 km', value: 20 },
  { label: '50 km', value: 50 },
  { label: 'Any distance', value: 1000 }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Summer Music Festival',
    category: 'Music',
    description: 'Join us for an amazing outdoor music festival featuring local and international artists. Experience great music, food, and atmosphere.',
    date: '2024-07-15',
    time: '18:00',
    location: {
      name: 'Central Park',
      address: '123 Park Avenue, Downtown',
      latitude: 40.7829,
      longitude: -73.9654
    },
    distance: 2.5,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
    price: '$25',
    organizer: 'Music Events Co.'
  },
  {
    id: '2',
    name: 'Tech Startup Meetup',
    category: 'Technology',
    description: 'Network with fellow entrepreneurs and learn about the latest trends in technology and startups.',
    date: '2024-07-18',
    time: '19:00',
    location: {
      name: 'Innovation Hub',
      address: '456 Tech Street, Business District',
      latitude: 40.7589,
      longitude: -73.9851
    },
    distance: 5.2,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    price: 'Free',
    organizer: 'Tech Community'
  },
  {
    id: '3',
    name: 'Art Gallery Opening',
    category: 'Arts',
    description: 'Discover contemporary art from emerging local artists. Wine and refreshments will be served.',
    date: '2024-07-20',
    time: '17:30',
    location: {
      name: 'Modern Art Gallery',
      address: '789 Art Lane, Cultural Quarter',
      latitude: 40.7505,
      longitude: -73.9934
    },
    distance: 3.8,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    price: 'Free',
    organizer: 'City Arts Council'
  },
  {
    id: '4',
    name: 'Marathon Training Run',
    category: 'Sports',
    description: 'Join our weekly group run to prepare for the upcoming city marathon. All fitness levels welcome.',
    date: '2024-07-16',
    time: '07:00',
    location: {
      name: 'Riverside Park',
      address: '321 River Road, Westside',
      latitude: 40.7648,
      longitude: -73.9808
    },
    distance: 4.1,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    price: 'Free',
    organizer: 'Running Club'
  },
  {
    id: '5',
    name: 'Food Truck Festival',
    category: 'Food',
    description: 'Taste delicious food from over 20 local food trucks. Live music and family-friendly activities.',
    date: '2024-07-22',
    time: '12:00',
    location: {
      name: 'City Square',
      address: '555 Main Street, City Center',
      latitude: 40.7614,
      longitude: -73.9776
    },
    distance: 1.8,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    price: '$10',
    organizer: 'Food Festival Org'
  },
  {
    id: '6',
    name: 'Business Networking Dinner',
    category: 'Business',
    description: 'Connect with local business leaders and entrepreneurs over a three-course dinner.',
    date: '2024-07-25',
    time: '18:30',
    location: {
      name: 'Grand Hotel',
      address: '888 Business Blvd, Financial District',
      latitude: 40.7505,
      longitude: -74.0134
    },
    distance: 8.7,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    price: '$75',
    organizer: 'Business Network'
  },
  {
    id: '7',
    name: 'Yoga in the Park',
    category: 'Health',
    description: 'Start your weekend with a relaxing outdoor yoga session. Bring your own mat.',
    date: '2024-07-17',
    time: '08:00',
    location: {
      name: 'Wellness Park',
      address: '222 Zen Avenue, Peaceful District',
      latitude: 40.7282,
      longitude: -73.9942
    },
    distance: 6.3,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400&h=300&fit=crop',
    price: '$15',
    organizer: 'Wellness Center'
  },
  {
    id: '8',
    name: 'Comedy Night',
    category: 'Entertainment',
    description: 'Laugh the night away with stand-up comedy from local and touring comedians.',
    date: '2024-07-19',
    time: '20:00',
    location: {
      name: 'Comedy Club',
      address: '111 Laugh Street, Entertainment District',
      latitude: 40.7390,
      longitude: -73.9889
    },
    distance: 7.2,
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop',
    price: '$20',
    organizer: 'Comedy Productions'
  }
];
