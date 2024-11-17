// components/MapComponent.tsx
'use client'
import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface MapComponentProps {
    latitude: number;
    longitude: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        });
    const mapContainerStyle = {
        height: '400px',
        width: '100%'
    };

    const center = {
        lat: latitude,
        lng: longitude
    };
    
    if (!isLoaded) {
        return <div>Loading map...</div>;
      }

    return (
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={20}
            >
                <Marker position={center} />
            </GoogleMap>
    );
};

export default MapComponent;
