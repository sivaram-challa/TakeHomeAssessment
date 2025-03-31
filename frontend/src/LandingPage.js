import React, { useEffect, useState } from 'react';

function LandingPage() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Adjust the fetch URL if your backend runs on a different port/URL.
    // Using /api/items/ because in backend, it's 'api/' + 'items/'
    fetch(`/api/items/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching items:', error));
  }, [searchTerm]);

  // Bucket the items by category
  const categories = {};
  items.forEach((item) => {
    if (!categories[item.category]) {
      categories[item.category] = [];
    }
    categories[item.category].push(item);
  });

  return (
    <div>
      <h2>Landing Page</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {Object.keys(categories).map((category) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {categories[category].map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - {item.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default LandingPage;

