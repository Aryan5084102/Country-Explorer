import React, { useState } from 'react';
import Card from './Card';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  return (
    <div className="max-w-full">
      <div className="bg-[#19ea8c] max-w-full flex justify-center">
        <div className="text-2xl sm:text-3xl p-3 max-w-7xl font-extrabold text-[#3D0301]">Country Explorer</div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between my-6 sm:my-10">
          <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Enter Your Country Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-auto border border-black px-2 py-1 mr-0 sm:mr-3 mb-2 sm:mb-0 rounded-md"
            />
          </div>
          <div>
            <select
              value={region}
              onChange={handleRegionChange}
              className="w-full sm:w-auto px-4 py-2 rounded-md border"
            >
              <option value="">Filter by Region</option>
              <option value="Asia">Asia</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <Card searchTerm={searchTerm} region={region} />
        </div>
      </div>
    </div>
  );
};

export default Home;

