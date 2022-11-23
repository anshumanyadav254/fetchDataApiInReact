import React from 'react'
import { useEffect,useState } from 'react';
function Search() {
    const [cocktail, setCocktail] = useState(null);
    const [query, setQuery] = useState("")
    async function getData(searchData) {
        const response = await fetch(
            "www.thecocktaildb.com/api/json/v1/1/filter.php?i="+searchData
        );
        const data = await response.json();

        setCocktail(data.drinks);
    }


    useEffect(() => {
      getData(query);  
    }, []);
    const onclickHandler=()=>{
        getData(query)
    }
   
  //  console.log(cocktail)
  
    return (
      <div className="App">
     <input placeholder="Enter Post Title" onClick={onclickHandler} onChange={event => setQuery(event.target.value)} />
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
            {/* <Button onClick={onclickHandler} variant="contained">Next</Button> */}
          </div>
        )}
      </div>
    );
}

export default Search;
