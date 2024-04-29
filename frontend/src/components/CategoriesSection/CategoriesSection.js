import React from "react";
import "./CategoriesSection.css";
import { DEFAULT_CATEGORIES } from "../../constants/categoriesConstants";
const Categories = ({ handleCategoryClick, selectedCategory }) => {
  return (
    <div className="categoriescontainer">
      <div className="categories">
        {DEFAULT_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="category"
            onClick={() => handleCategoryClick(category.value)}
            style={{
              border: category.value === selectedCategory ? "0.3rem solid #00ACD2" : "none",
            }}
          >
            <p>{category.label}</p>
            <div>{category.image}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
