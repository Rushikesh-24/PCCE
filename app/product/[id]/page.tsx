'use client'
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import {key} from '../../../Google';

interface StoreMapProps {
  origin: string;
  destination: string;
}

const StoreMap = ({ origin, destination }: StoreMapProps) => {
  return (
    <iframe
      src={`https://www.google.com/maps/embed/v1/directions?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${key}`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

const ProductPage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [userLocation, setUserLocation] = useState("Your Location");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const locations = [
    { name: "GoaMart", address: "MG Road, Panaji, Goa 403001, India" },
    { name: "D-Mart", address: "Panjim, Goa 403001, India" },
    { name: "Big Bazaar", address: "Margao, Goa 403601, India" },
    { name: "Reliance Fresh", address: "Vasco da Gama, Goa 403802, India" },
    { name: "Spencer's", address: "Mapusa, Goa 403507, India" },
    { name: "More Supermarket", address: "Ponda, Goa 403401, India" }
  ];

  const products = [
    { name: "Orange Lays", price: 10.0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9EE23AmyF9fr1rTZCmec4JghIJMm7GPJ1dQ&s", availableAt: ["GoaMart", "D-Mart", "Big Bazaar"] },
    { name: "Doritos", price: 12.0, image: "https://m.media-amazon.com/images/I/81AQOqZUbsL.jpg", availableAt: ["GoaMart", "Reliance Fresh", "Spencer's"] },
    { name: "Pringles", price: 15.0, image: "https://m.media-amazon.com/images/I/71rL+eOjc+L._AC_UF1000,1000_QL80_.jpg", availableAt: ["D-Mart", "Big Bazaar", "Spencer's"] },
    { name: "Cheetos", price: 11.0, image: "https://m.media-amazon.com/images/I/81vJyb43URL._AC_UF1000,1000_QL80_.jpg", availableAt: ["GoaMart", "D-Mart", "Reliance Fresh"] },
    { name: "Ruffles", price: 13.0, image: "https://m.media-amazon.com/images/I/81vJyb43URL._AC_UF1000,1000_QL80_.jpg", availableAt: ["Big Bazaar", "Spencer's", "More Supermarket"] },
  ];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(`${position.coords.latitude},${position.coords.longitude}`);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
    console.log(process.env.GOOGLE_API);
  }, []);

  interface Location {
    name: string;
    address: string;
  }

  interface Product {
    name: string;
    price: number;
    image: string;
    availableAt: string[];
  }

  const handleLocationClick = (location: Location): void => {
    setSelectedLocation(`${location.name} ${location.address}`);
  };

  const handleSearch = () => {
    const foundProduct = products.find(product => 
      product.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setSelectedProduct(foundProduct || null);
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setSearchTerm(value);
    
    if (value.length > 0) {
      const filteredSuggestions: string[] = products
        .filter(product => product.name.toLowerCase().includes(value.toLowerCase()))
        .map(product => product.name);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    const foundProduct = products.find(product => product.name === suggestion);
    setSelectedProduct(foundProduct || null);
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        {selectedLocation && (
          <StoreMap origin={userLocation} destination={selectedLocation} />
        )}
      </div>

      <div className="absolute md:top-5 right-5 bottom-5 bg-white p-4 shadow-lg rounded-xl lg:w-60 sm:w-48 w-40 text-black overflow-y-auto">
        <div className="mb-3 relative mt-40">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full sm:p-2 p-1 border border-gray-300 rounded-3xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleSearch}>
            <IoSearch className="size-6 text-blue-500" />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index} 
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedProduct && (
          <>
            <h1 className="text-2xl mb-2 font-semibold">{selectedProduct.name}</h1>
            <h2 className="mb-3">Price: Rs.{selectedProduct.price.toFixed(2)}</h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full rounded mb-3"
            />
            <h3 className="font-semibold mb-2">Available at:</h3>
            <ul className="space-y-2">
              {selectedProduct.availableAt.map((store, index) => {
                const storeLocation = locations.find(loc => loc.name === store);
                return (
                  storeLocation && (
                    <li 
                      key={index} 
                      className="bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200"
                      onClick={() => handleLocationClick(storeLocation)}
                    >
                      <p>{store}</p>
                      <p className="text-sm text-gray-600">{storeLocation.address}</p>
                    </li>
                  )
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div className="absolute top-2 left-2 bg-white p-4 shadow-lg rounded-xl lg:w-80 w-60 text-black">
        <h2 className="sm:text-2xl text-base mb-3">All Locations:</h2>
        <div className="sm:space-y-4 space-y-1">
          {locations.map((location, index) => (
            <div 
              key={index}
              className="p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => handleLocationClick(location)}
            >
              <h3 className="text-lg font-semibold">{location.name}</h3>
              <p>{location.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;