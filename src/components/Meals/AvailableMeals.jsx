import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const BASE_URL = 'http://localhost:3000/meals';

const AvailableMeals = () => {
  const { data: meals, isLoading, error, getData: getMeals } = useFetch();

  useEffect(() => {
    getMeals(BASE_URL);
  }, [getMeals]);

  if (isLoading)
    return (
      <section className={classes['meals-loading']}>
        <h2>Loading...</h2>
      </section>
    );

  if (error)
    return (
      <section className={classes['error-text']}>
        <h2>{error}</h2>
      </section>
    );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
