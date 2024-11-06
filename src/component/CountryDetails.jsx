import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CountryDetails = () => {
    const { countryCode } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                setCountry(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching country details:", error);
                setLoading(false);
            }
        };
        fetchCountryDetails();
    }, [countryCode]);

    if (loading) return <div className='text-2xl font-normal'>Loading...</div>;

    return country ? (
        <div className="p-6 mx-auto mt-10 max-w-72 flex justify-center items-center flex-col bg-white shadow-lg rounded-md">
            <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
            <img src={country.flags.png} alt={`${country.name.common} flag`} className="w-48 h-40  mb-4 rounded-md" />
            <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>Subregion:</strong> {country.subregion}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
            <p><strong>Currency:</strong> {country.currencies ? Object.keys(country.currencies)[0] : 'N/A'}</p>
            <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
        </div>
    ) : (
        <div>Country not found</div>
    );
};

export default CountryDetails;
