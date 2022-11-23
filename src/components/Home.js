import React from 'react'
import { useEffect,useState } from 'react';

import { Outlet, Link } from "react-router-dom";

import {Button} from '@mui/material'
function Home() {
    const [cocktail, setCocktail] = useState(null);
    const [query, setQuery] = useState("")

    async function getData() {
        const response = await fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const data = await response.json();

        setCocktail(data.drinks);
    }
    async function getSearch(query){
        const res=await fetch(
            "www.thecocktaildb.com/api/json/v1/1/filter.php?i="+query
        )
        const data_res=await res.json()
        setCocktail(data_res.drinks)
    }

    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};

    useEffect(() => {
      getData();  
      getSearch(query)
    }, []);
    const onclickHandler=()=>{
        getData()
    }
    
  //  console.log(cocktail)
  
    return (
      <div className="App">
          <div>
          <form onSubmit={getSearch(query)}>
          <label>
              <h2>Enter the Ingradient</h2>
              <br/>
              <br/>
            <input style={BarStyling}  placeholder="Enter Ingradient"  onChange={event => setQuery(event.target.value)}/>
           
          </label>
        </form>
              </div>
        {cocktail && (
          <div className="cocktail">
            {cocktail.map((cocktail, index) => (
              <div key={index}>
                <h2>{cocktail.strDrink}</h2>
                <div >
                <img style={{ width: "250px", height: "350px" }} src={cocktail.strDrinkThumb} alt="cocktail logo"/>
                 </div>
                 <h4>Ingradients</h4>
                 <h5>
                    1.{cocktail.strIngredient1} {" "}
                    2.{cocktail.strIngredient2} {" "}
                    3.{cocktail.strIngredient3} {" "}
                    4.{cocktail.strIngredient4}
                 </h5>

              </div>
            ))}
            <Button onClick={onclickHandler} variant="contained">Next</Button>
          </div>
        )}
      </div>
    );
}

export default Home