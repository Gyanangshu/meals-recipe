import React from "react";
import "./App.css";
import { useGlobalContext } from "./Context";
import {BsHandThumbsUp} from 'react-icons/bs';


export default function Meals(){

const {meals, loading, selectMeal, addToFavorites} = useGlobalContext()
    
    if (loading) {
        return (
            <section className="section">
                <h2>Loading...</h2>
            </section>
        )
    }

    if (meals.length < 1){
        return(
            <section className="section">
                <h2>No meals matched your search term. Please try again. </h2>
            </section>
        )
    }

    return (
        <section className="section-center">
            {meals.map((singleMeal) =>{

            const {idMeal, strMeal:title, strMealThumb:image} = singleMeal
 
                return <article key={idMeal} className="single-meal">
                    <img src={image} className="img" onClick={() => selectMeal(idMeal)}/>
                        <footer>
                            <h5>{title}</h5>
                                <button className="like-btn" onClick={() => addToFavorites(idMeal)}><BsHandThumbsUp/></button>
                        </footer>
                </article>
            })}
        </section>
        
    )
}