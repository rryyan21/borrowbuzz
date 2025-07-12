import React from "react";

const listings = [
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    title: "Trek Mountain Bike",
    price: "$12/day",
    category: "Transportation",
    available: "Available Now",
    location: "North Campus",
    owner: "Sarah M."
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    title: "Mini Fridge (Perfect for Dorms)",
    price: "$8/day",
    category: "Dorm Essentials",
    available: "Available Now",
    location: "Central Campus",
    owner: "Jake L."
  },
  {
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
    title: "TI-84 Graphing Calculator",
    price: "$4/day",
    category: "Textbooks & Supplies",
    available: "Available Now",
    location: "Engineering Quad",
    owner: "Maria C."
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Portable Fan (Dorm Life Saver)",
    price: "$3/day",
    category: "Dorm Essentials",
    available: "Available Now",
    location: "South Quad",
    owner: "Alex R."
  },
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    title: "Complete Tool Kit",
    price: "$6/day",
    category: "Tools & Equipment",
    available: "Available Now",
    location: "West Campus",
    owner: "David K."
  },
  {
    image: "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
    title: "JBL Bluetooth Speaker",
    price: "$5/day",
    category: "Electronics",
    available: "Available Now",
    location: "The Hill",
    owner: "Emma T."
  },
];

const SampleListings: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {listings.map((item, i) => (
      <div key={i} className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-campusYellow/30">
        <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-campusBlue bg-campusYellow/20 px-3 py-1 rounded-full">
              {item.category}
            </span>
            <span className="text-xs text-gray-500">by {item.owner}</span>
          </div>
          
          <h3 className="font-semibold text-gray-800 text-lg mb-2 leading-tight">{item.title}</h3>
          
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <span>📍</span>
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-campusBlue">{item.price}</span>
            <span className="text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
              ✅ {item.available}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default SampleListings; 