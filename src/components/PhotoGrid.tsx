// src/components/PhotoGrid.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Photo } from '../types/types';

interface Props {
    selectedCustomerId: number; // Accept selectedCustomerId as a prop
}

const PhotoGrid: React.FC<Props> = ({ selectedCustomerId }) => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [visiblePhotos, setVisiblePhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const cachedPhotos = localStorage.getItem('cachedPhotos');

                if (cachedPhotos) {
                    const parsedPhotos = JSON.parse(cachedPhotos);
                    setPhotos(parsedPhotos);
                    setVisiblePhotos(parsedPhotos.slice(0, 9)); // Initially show the first 9 photos
                } else {
                    const response = await axios.get(
                        `https://api.unsplash.com/photos/random?count=30&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
                    );
                    const newPhotos = response.data.map((photo: any) => ({
                        id: photo.id,
                        url: photo.urls.small,
                    }));
                    setPhotos(newPhotos);
                    setVisiblePhotos(newPhotos.slice(0, 9)); // Initially show the first 9 photos

                    localStorage.setItem('cachedPhotos', JSON.stringify(newPhotos));
                }
            } catch (error) {
                console.error('Error fetching photos:', error);
                setPhotos([]); // Handle errors appropriately
            }
        };

        fetchPhotos();
    }, []); // Empty dependency array ensures this runs only on mount

    useEffect(() => {
        if (photos.length > 0) {
            // Shuffle photos whenever selectedCustomerId changes
            const shuffled = [...photos].sort(() => 0.5 - Math.random());
            setVisiblePhotos(shuffled.slice(0, 9));
        }
    }, [selectedCustomerId, photos]); // Depend on selectedCustomerId and photos

    useEffect(() => {
        const interval = setInterval(() => {
            if (photos.length > 0) {
                // Shuffle the photos periodically
                const shuffled = [...photos].sort(() => 0.5 - Math.random());
                setVisiblePhotos(shuffled.slice(0, 9));
            }
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, [photos]); // This effect depends on 'photos'

    return (
        <div className="photo-grid">
            {visiblePhotos.map(photo => (
                <div key={photo.id} className="photo-item">
                    <img src={photo.url} alt="Random" />
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;
