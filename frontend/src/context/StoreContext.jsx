import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState(null);

    const food_list = [
        { _id: "1", name: "Greek Salad", image: "https://images.pexels.com/photos/406152/pexels-photo-406152.jpeg", price: 12, description: "Fresh and healthy greens with olives", category: "Salad" },
        { _id: "2", name: "Veggie Roll", image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg", price: 15, description: "Crispy rolls with fresh vegetables", category: "Rolls" },
        { _id: "3", name: "Chocolate Cake", image: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg", price: 25, description: "Rich chocolate cake for your sweet tooth", category: "Cake" },
        { _id: "4", name: "Pasta Alfredo", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", price: 18, description: "Creamy pasta with parmesan cheese", category: "Pasta" },
        { _id: "5", name: "Fruit Desert", image: "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg", price: 10, description: "Sweet deserts with fresh fruits", category: "Deserts" }
    ];

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCount = (prev[itemId] || 0) - 1;
            if (newCount <= 0) {
                const { [itemId]: removed, ...rest } = prev;
                return rest;
            }
            return { ...prev, [itemId]: newCount };
        });
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === String(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;