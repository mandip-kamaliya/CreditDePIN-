export const mockDevices = [
  {
    id: '1',
    name: 'Weather Station Alpha',
    type: 'Weather',
    location: 'New York, USA',
    status: 'active',
    dataPoints: 15420,
    earnings: 245.5
  },
  {
    id: '2',
    name: 'Energy Monitor Beta',
    type: 'Energy',
    location: 'London, UK',
    status: 'active',
    dataPoints: 8930,
    earnings: 178.6
  }
]

export const mockDataFeeds = [
  {
    id: '1',
    name: 'NYC Weather Data',
    provider: 'Weather Station Alpha',
    price: 0.001,
    frequency: '5min',
    accuracy: 99.8,
    subscribers: 45
  },
  {
    id: '2',
    name: 'London Energy Usage',
    provider: 'Energy Monitor Beta',
    price: 0.002,
    frequency: '1min',
    accuracy: 99.5,
    subscribers: 32
  }
]

export const mockLeaderboard = [
  {
    rank: 1,
    address: '0x1234...5678',
    devices: 12,
    dataPoints: 125430,
    earnings: 2156.8
  },
  {
    rank: 2,
    address: '0x8765...4321',
    devices: 8,
    dataPoints: 89230,
    earnings: 1543.2
  }
]
