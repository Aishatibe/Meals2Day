import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const[meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
   const fetchMeals = async() => {
    const res = await fetch("https://food-order-app-2c95c-default-rtdb.firebaseio.com/meals.json")
   if(!res.ok){
    throw new Error('Something went wrong')
   }
    const resData = await res.json()
    //returns object. 
    //needs an array to map
    const loadedMeals = [];
    for (const key in resData){
      loadedMeals.push({
        id:key,
        name:resData[key].name,
        description:resData[key].description,
        price:resData[key].price
        
      })
    }
    setMeals(loadedMeals)
    setLoading(false)
    setError(false)
   }
   fetchMeals().catch((error)=>{
    setError(error.message)
    setLoading(false)
   });
  
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      name={meal.name}
      description={meal.description}
      key={meal.id}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {loading && <p>Loading ...</p>}
      {error && <p>{error} </p>}
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
