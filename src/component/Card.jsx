import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ searchTerm, region }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const ShimmerCard = () => (
    <div className="p-2 inline-block border rounded-lg border-black cursor-pointer animate-pulse">
        <div className="pb-3 flex justify-center">
            <div className="w-40 h-32 sm:w-52 sm:h-40 bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="h-6 w-24 sm:w-32 bg-gray-300 rounded-md mb-2"></div>
            <div className="h-4 w-20 sm:w-24 bg-gray-300 rounded-md mb-1"></div>
            <div className="h-4 w-20 sm:w-24 bg-gray-300 rounded-md mb-1"></div>
        </div>
        <div className="flex justify-center pt-4">
            <div className="w-20 h-8 bg-gray-300 rounded-md"></div>
        </div>
    </div>
);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error, "Error");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = data.filter(country => {
        const matchesSearchTerm = country.name?.common.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRegion = region ? country.region === region : true;
        return matchesSearchTerm && matchesRegion;
    });

    const handleClick = (countryCode) => {
        navigate(`/country/${countryCode}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loading
                ? Array.from({ length: 10 }, (_, index) => <ShimmerCard key={index} />) 
                : filteredData.map((obj, index) => (
                    <div
                        key={index}
                        className="p-2 inline-block border rounded-lg cursor-pointer hover:bg-[#19ea8c] hover:scale-105"
                        onClick={() => handleClick(obj.cca3)}
                    >
                        <div className="pb-3 flex justify-center">
                            <img
                                src={obj.flags?.png}
                                className="w-40 h-32 sm:w-52 sm:h-40 rounded-md object-cover"
                                alt={`${obj.name?.common} flag`}
                            />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <h2 className="text-lg sm:text-xl font-bold pb-2">{obj.name?.common}</h2>
                            <p className="text-xs sm:text-sm font-normal">Capital - {obj.capital ? obj.capital[0] : 'N/A'}</p>
                            <p className="text-xs sm:text-sm font-normal">Currency - {obj.currencies ? Object.keys(obj.currencies)[0] : 'N/A'}</p>
                        </div>
                        <div className="flex justify-center pt-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick(obj.cca3);
                                }}
                                className="bg-[#3D0301] rounded-md px-2.5 py-1.5 text-white text-xs sm:text-sm"
                            >
                                Show More
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Card;


