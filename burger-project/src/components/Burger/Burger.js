import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Data from "../../Helper/Data";

const burger = (props) => {

    let transformedIngredients = Data.transformedIngredients(props.ingredients);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add some ingredients</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;