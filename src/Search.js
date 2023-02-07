import React from "react";
import "./App.css";
import { useGlobalContext } from "./Context";


export default function Search() {

    const [text, setText] = React.useState('')
    const {setSearchTerm, fetchRandomMeal} = useGlobalContext()

    const handleChange = (e) =>{
        setText(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (text) {
            setSearchTerm(text)
            // setText('')
        }
    }

    // to handle a bug, as once the user type something the state doesn't change if the user type the same thing again 
    const handleRandomMeal = () =>{
        setSearchTerm('')
        setText('')
        fetchRandomMeal()
    }

    return (
        <header className="search-container">

            <div className="nav-home">
            <a href="/">Home</a>
 
            </div>
            
            <form onSubmit={handleSubmit}>

                <input type="text" value={text} onChange={handleChange} placeholder="type favorite meal" className="form-input" />

                <button type="submit" className="btn">Search</button>

                <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>Surprise me!</button>

            </form>
        </header>
    )
}