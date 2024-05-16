import React, { useEffect, useState } from "react";
import "./StoryForm.css";
import SlideForm from "./SlideForm";
import { useDispatch } from "react-redux";
import { createStory, updateStory } from "../../../actions/storyAction";
const StoryAdd = ({ isStoryFormOpen, onClose, editStory }) => {
  const dispatch = useDispatch();
  const initialSlide = {
    heading: "",
    description: "",
    imageUrl: "",
    category: "",
  };
  const [slides, setSlides] = useState([
    initialSlide,
    initialSlide,
    initialSlide,
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentSlide(currentSlide);
    console.log("currentSlide", currentSlide);
  }, [currentSlide]);

  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides((prevSlides) => [...prevSlides, {}]);
      setCurrentSlide(slides.length);
    }
  };

  const handleRemoveSlide = (index) => {
    setSlides((prevSlides) => prevSlides.filter((element, i) => i !== index));
    handlePrevClick();
  };

  const handlePrevClick = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
  };

  const handleNextClick = () => {
    const currentSlideFields = slides[currentSlide];
    const isFilled =
      currentSlideFields.heading?.trim() !== "" &&
      currentSlideFields.description?.trim() !== "" &&
      currentSlideFields.imageUrl?.trim() !== "" &&
      currentSlideFields.category?.trim() !== "";
    if (!isFilled) {
      setError("Please fill out all fields before proceeding");
    } else {
      setCurrentSlide(
        currentSlide < slides.length - 1 ? currentSlide + 1 : slides.length - 1
      );
    }
  };

  const handleValidate = (name, value) => {
    if (name === "category" && value === "") {
      setError("Please select a category");
    } else if (name === "imageUrl" && value === "") {
      setError("Please add an image url");
    } else if (name === "description" && value === "") {
      setError("Please add a description");
    } else if (name === "heading" && value === "") {
      setError("Please add a heading");
    } else {
      setError("");
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setError("");
    handleValidate(name, value);
    setSlides((prevSlides) =>
      prevSlides.map((slide, i) =>
        i === index ? { ...slide, [name]: value } : slide
      )
    );
  };

  useEffect(() => {
    if (editStory) {
      setSlides(editStory.slides);
    }
  }, [editStory]);

  const handleStorySubmit = () => {
    const isValid = slides.every(
      (slide) =>
        slide.heading?.trim() !== "" &&
        slide.description?.trim() !== "" &&
        slide.imageUrl?.trim() !== "" &&
        slide.category?.trim() !== ""
    );

    if (!isValid) {
      setError("Please fill out all fields of each slides");
      return;
    }

    if (slides.length < 3) {
      setError("Please fill out at least 3 slides");
      return;
    }

    if (editStory && editStory._id) {
      const storyId = editStory._id;
      const updatedStory = {
        storyId,
        slides,
      };
      dispatch(updateStory(updatedStory));
      onClose();
    } else {
      dispatch(createStory(slides));
      setSlides([initialSlide, initialSlide, initialSlide]);
      setCurrentSlide(0);
      dispatch(onClose);
    }
  };

  return (
    <>
      {isStoryFormOpen && (
        <>
          <div className="modal-backdrop" onClick={onClose}></div>
            <div className="storyForm">
              <div className="storySlideMenu">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="slideBox"
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      border:
                        currentSlide === index ? "2px solid #73ABFF" : "none",
                    }}
                  >
                    slide {index + 1}
                    {index >= 3 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlide(currentSlide);
                        }}
                        className="slideCloseBtn"
                      >
                        X
                      </span>
                    )}
                  </div>
                ))}
                <div
                  className="slideBox"
                  onClick={handleAddSlide}
                  style={{ cursor: "pointer" }}
                >
                  Add +
                </div>
              </div>
              <div>
                <button className="addStoryFormCloseBtn" onClick={onClose}>
                  X
                </button>
              </div>
              <div className="slideFormContainer">
                <h2>Add story to feed</h2>
                {slides.map((slide, slideIndex) => (
                  <>
                    {slideIndex === currentSlide && (
                      <SlideForm
                        key={slideIndex}
                        slide={slide}
                        slideIndex={slideIndex}
                        handleChange={(e) => handleChange(e, slideIndex)}
                      />
                    )}
                  </>
                ))}
              </div>
              {error && <span className="formError">{error}</span>}
              <div className="storyBtn">
                <div>
                  <button className="prevBtn" onClick={handlePrevClick}>
                    Previous
                  </button>
                  <button className="nextBtn" onClick={handleNextClick}>
                    Next
                  </button>
                </div>
                <button className="postBtn" onClick={handleStorySubmit}>
                  Post
                </button>
              </div>
            </div>
        </>
      )}
    </>
  );
};

export default StoryAdd;
