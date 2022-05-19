import { useEffect, useState } from "react";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [DUMMY_MEALS, setDummyMeals] = useState([]);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  useEffect(() => {
    const transformData = (data) => {
      const loadedMeals = [];
      for (const mealKey in data) {
        loadedMeals.push({
          id: mealKey,
          name: data[mealKey].name,
          description: data[mealKey].description,
          price: data[mealKey].price,
        });
      }
      setDummyMeals(loadedMeals);
    };
    fetchMeals(
      { url: "https://react-app-54403-default-rtdb.firebaseio.com/meals.json" },
      transformData
    );
  }, [fetchMeals]);
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {isLoading && <p>Loading....</p>}
        {error ? <p>{error}</p> : ""}
      </Card>
    </section>
  );
};

export default AvailableMeals;
