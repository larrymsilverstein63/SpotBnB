import { useState } from 'react';
import { Heart, Star } from 'lucide-react';

const CATEGORIES = [
  { emoji: '🔥', label: 'Trending' },
  { emoji: '🏠', label: 'Cabins' },
  { emoji: '🏊', label: 'Amazing pools' },
  { emoji: '🏖️', label: 'Beachfront' },
  { emoji: '🌲', label: 'Treehouses' },
  { emoji: '🌾', label: 'Countryside' },
  { emoji: '❄️', label: 'Arctic' },
  { emoji: '⛰️', label: 'Amazing views' },
  { emoji: '🏰', label: 'Castles' },
  { emoji: '🏕️', label: 'Camping' },
  { emoji: '🎿', label: 'Skiing' },
  { emoji: '🏝️', label: 'Islands' },
];

const PROPERTIES = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/malibu1/800/600',
    location: 'Malibu, California',
    host: 'Hosted by Sarah',
    dates: 'Dec 1–6',
    price: 450,
    rating: 4.97,
    superhost: true,
    tag: 'Beachfront',
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/tuscany7/800/600',
    location: 'Tuscany, Italy',
    host: 'Hosted by Marco',
    dates: 'Nov 28 – Dec 4',
    price: 220,
    rating: 4.95,
    superhost: true,
    tag: 'Countryside',
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/banff3/800/600',
    location: 'Banff, Alberta',
    host: 'Hosted by Chloe',
    dates: 'Dec 10–15',
    price: 185,
    rating: 4.92,
    superhost: false,
    tag: 'Cabins',
  },
  {
    id: 4,
    image: 'https://picsum.photos/seed/santorini5/800/600',
    location: 'Santorini, Greece',
    host: 'Hosted by Nikos',
    dates: 'Jan 2–8',
    price: 380,
    rating: 4.98,
    superhost: true,
    tag: 'Amazing views',
  },
  {
    id: 5,
    image: 'https://picsum.photos/seed/bali9/800/600',
    location: 'Ubud, Bali',
    host: 'Hosted by Wayan',
    dates: 'Dec 18–24',
    price: 155,
    rating: 4.89,
    superhost: false,
    tag: 'Treehouses',
  },
  {
    id: 6,
    image: 'https://picsum.photos/seed/capetown4/800/600',
    location: 'Cape Town, South Africa',
    host: 'Hosted by Amara',
    dates: 'Jan 5–11',
    price: 290,
    rating: 4.94,
    superhost: true,
    tag: 'Amazing pools',
  },
  {
    id: 7,
    image: 'https://picsum.photos/seed/aspen2/800/600',
    location: 'Aspen, Colorado',
    host: 'Hosted by James',
    dates: 'Dec 22–27',
    price: 525,
    rating: 4.96,
    superhost: true,
    tag: 'Skiing',
  },
  {
    id: 8,
    image: 'https://picsum.photos/seed/costarica6/800/600',
    location: 'Manuel Antonio, Costa Rica',
    host: 'Hosted by Lucia',
    dates: 'Jan 8–14',
    price: 195,
    rating: 4.91,
    superhost: false,
    tag: 'Treehouses',
  },
  {
    id: 9,
    image: 'https://picsum.photos/seed/kyoto8/800/600',
    location: 'Kyoto, Japan',
    host: 'Hosted by Yuki',
    dates: 'Mar 15–21',
    price: 265,
    rating: 4.99,
    superhost: true,
    tag: 'Trending',
  },
  {
    id: 10,
    image: 'https://picsum.photos/seed/iceland11/800/600',
    location: 'Reykjavik, Iceland',
    host: 'Hosted by Sigrid',
    dates: 'Feb 1–7',
    price: 310,
    rating: 4.93,
    superhost: true,
    tag: 'Arctic',
  },
  {
    id: 11,
    image: 'https://picsum.photos/seed/scotland13/800/600',
    location: 'Scottish Highlands',
    host: 'Hosted by Ewan',
    dates: 'Apr 4–10',
    price: 175,
    rating: 4.88,
    superhost: false,
    tag: 'Castles',
  },
  {
    id: 12,
    image: 'https://picsum.photos/seed/maldives15/800/600',
    location: 'Maldives',
    host: 'Hosted by Ali',
    dates: 'Feb 20–26',
    price: 680,
    rating: 4.99,
    superhost: true,
    tag: 'Islands',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Trending');
  const [saved, setSaved] = useState<Set<number>>(new Set());

  function toggleSave(id: number) {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const displayed =
    activeCategory === 'Trending'
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.tag === activeCategory);

  const shown = displayed.length > 0 ? displayed : PROPERTIES;

  return (
    <div className="home-page">
      {/* Category filter */}
      <div className="category-bar">
        <div className="category-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              className={`category-item${activeCategory === cat.label ? ' category-item--active' : ''}`}
              onClick={() => setActiveCategory(cat.label)}
            >
              <span className="category-emoji">{cat.emoji}</span>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Property grid */}
      <div className="property-grid">
        {shown.map((property) => (
          <div key={property.id} className="property-card">
            <div className="property-image-wrap">
              <img
                src={property.image}
                alt={property.location}
                className="property-image"
                loading="lazy"
              />
              <button
                className={`save-btn${saved.has(property.id) ? ' save-btn--saved' : ''}`}
                onClick={() => toggleSave(property.id)}
                aria-label="Save to wishlist"
              >
                <Heart
                  size={18}
                  fill={saved.has(property.id) ? '#FF385C' : 'none'}
                  stroke={saved.has(property.id) ? '#FF385C' : 'white'}
                  strokeWidth={2}
                />
              </button>
              {property.superhost && (
                <span className="superhost-badge">Guest favourite</span>
              )}
            </div>

            <div className="property-info">
              <div className="property-header">
                <span className="property-location">{property.location}</span>
                <span className="property-rating">
                  <Star size={12} fill="#222" stroke="none" />
                  {property.rating}
                </span>
              </div>
              <p className="property-host">{property.host}</p>
              <p className="property-dates">{property.dates}</p>
              <p className="property-price">
                <strong>${property.price}</strong>{' '}
                <span className="price-suffix">night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
