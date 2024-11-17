'use client'

import { addFavorite, isFavorite, removeFavorite } from '@/utils/favorites';
import { createClient } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import { IoStar } from 'react-icons/io5';

interface FavoriteButtonProps {
    listingId: string;
    className?: string;
    iconSize?: string;
    onFavoriteChange?: (isFavorited: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    listingId,
    className,
    iconSize = "24",
    onFavoriteChange
}) => {
    const [isFavoriteState, setIsFavoriteState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const supabase = createClient();

    useEffect(() => {
        const checkIfFavorite = async () => {
            const { data: userResponse } = await supabase.auth.getUser();
            const userId = userResponse?.user?.id;

            if (userId) {
                const favoriteStatus = await isFavorite(userId, listingId);
                setIsFavoriteState(favoriteStatus);
            }
            setLoading(false);
        };

        checkIfFavorite();
    }, [listingId, supabase]);

    const toggleFavorite = async () => {
        setLoading(true);
        const { data: userResponse } = await supabase.auth.getUser();
        const userId = userResponse?.user?.id;

        if (userId) {
            if (isFavoriteState) {
                await removeFavorite(userId, listingId);
                setIsFavoriteState(false);
                onFavoriteChange?.(false);
            } else {
                await addFavorite(userId, listingId);
                setIsFavoriteState(true);
                onFavoriteChange?.(true);
            }
        }
        setLoading(false);
    };

    return (
        <button
            onClick={toggleFavorite}
            disabled={loading}
            className={className}
            aria-label={isFavoriteState ? "Unfavorite" : "Favorite"}
        >
            <IoStar
                size={iconSize}
                className={
                    loading
                        ? "opacity-25"
                        : isFavoriteState
                        ? "text-[#FABF35]"
                        : "text-gray-400 opacity-70"
                }
            />
        </button>
    );
};

export default FavoriteButton;


 // <div className="relative">
    //     <button
    //     onClick={toggleFavorite}
    //     disabled={loading}
    //     className="absolute top-0 right-0 px-4 py-2 text-white bg-red-500 rounded"
    //     >
    //     {loading ? 'Loading...' : isFavoriteState ? 'Unfavorite' : 'Favorite'}
    //     </button>
    // </div>