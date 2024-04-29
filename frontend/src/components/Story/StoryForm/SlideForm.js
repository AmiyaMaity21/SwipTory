import React from "react";
import "./StoryForm.css";
import { DEFAULT_CATEGORIES } from "../../../constants/categoriesConstants";
const SlideForm = ({ slide, slideIndex, handleChange }) => {
  return (
    <div className="slideForm">
      <div className="slideFormContainer">
        <div className="slideFormInputContainer">
          <label className="slideFormLabel">Heading : </label>
          <input
            className="slideFormInputField"
            type="text"
            name={`heading`}
            value={slide.heading}
            placeholder="Your heading"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className="slideFormInputContainer">
          <label className="slideFormLabel">Description : </label>
          <textarea
            className="slideFormInputField"
            type="text"
            name={`description`}
            value={slide.description}
            placeholder="Story Description"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className="slideFormInputContainer">
          <label className="slideFormLabel">Image : </label>
          <input
            className="slideFormInputField"
            type="text"
            name={`imageUrl`}
            value={slide.imageUrl}
            placeholder="Add Image url"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className="slideFormInputContainer">
          <label className="slideFormLabel">Category :</label>
          <select
            className="slideFormInputField"
            name="category"
            onChange={(e) => handleChange(e, slideIndex)}
            value={slide.category}
          >
            <option value="" style={{ color: "#847c7c" }}>
              Select category
            </option>
            {DEFAULT_CATEGORIES.map((category) => {
              if (category.value !== "all") {
                return (
                  <option value={category.value} key={category.id}>
                    {category.value}
                  </option>
                );
              }
              return null;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SlideForm;
