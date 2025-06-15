import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('kalartz-wishlist');
    if (storedWishlist) {
      setWishlistItems(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kalartz-wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addItemToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find(item => item.id === product.id)) {
        toast({
          title: "Already in Wishlist",
          description: `${product.name} is already in your wishlist.`,
          variant: "default",
        });
        return prevItems;
      }
      toast({
        title: "Added to Wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      });
      return [...prevItems, product];
    });
  };

  const removeItemFromWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast({
          title: "Removed from Wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist.`,
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const isItemInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addItemToWishlist, removeItemFromWishlist, isItemInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};