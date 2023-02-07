import React, { useContext } from "react";
import axios from 'axios';

const AppContext = React.createContext()


const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealsUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites');

    if (favorites) {
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
        favorites = []
    }

    return favorites
}

const AppProvider = ({ children }) => {
    const [loading, setLoading] = React.useState(false)
    const [meals, setMeals] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

    const [showModal, setShowModal] = React.useState(false)
    const [selectedMeal, setSelectedMeal] = React.useState(null)

    const [favorites, setFavorites] = React.useState(getFavoritesFromLocalStorage());


    // Fetching Data using Axios 
    const fetchMeals = async (url) => {
        setLoading(true)
        try {

            const { data } = await axios(url)

            if (data.meals) {
                setMeals(data.meals)
            }
            else {
                setMeals([])
            }

        } catch (error) {
            console.log(error.response)
        }
        setLoading(false)
    }


    const fetchRandomMeal = () => {
        fetchMeals(randomMealsUrl)
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;
        if (favoriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal)
        }
        else {
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavorites = (idMeal) => {
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
        if (alreadyFavorite) return
        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    React.useEffect(() => {
        fetchMeals(allMealsUrl)
    }, []);


    React.useEffect(() => {
        if (!searchTerm)
            return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm]);


    return <AppContext.Provider value={{ loading, meals, setSearchTerm, fetchRandomMeal, showModal, selectedMeal, selectMeal, closeModal, addToFavorites, removeFromFavorites, favorites }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return (
        useContext(AppContext)
    )
}

export { AppContext, AppProvider }