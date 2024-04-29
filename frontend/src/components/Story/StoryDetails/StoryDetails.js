import "./StoryDetails.css";
import React, { Fragment, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiSend } from "react-icons/fi";
import { FaBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStory,
  bookmarkStory,
  likeStory,
} from "../../../actions/storyAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Loader/Loader";
import { loadUser } from "../../../actions/userAction";
import LoginSignup from "../../RegisterLogin/LoginSignup";

const StoryDetails = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoginFormOpen, setLoginFormOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { story, totalLikes, newLike, bookmarked, liked } = useSelector(
    (state) => state.story
  );
  const { isAuthenticated, userId, loading, user } = useSelector(
    (state) => state.user
  );

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 200000);
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      setLoginFormOpen(true);
      return;
    }
    dispatch(bookmarkStory(id));
  };
  const handleLike = () => {
    if (!isAuthenticated) {
      setLoginFormOpen(true);
      return;
    }
    dispatch(likeStory(id));
  };

  useEffect(() => {
    dispatch(getStory(id));
    dispatch(loadUser(userId));
  }, [id, dispatch, userId]);

  // Slider settings
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => <ul style={{ margin: "0px" }}> {dots} </ul>,
    customPaging: (i) => <div className="custom-dot">{/* {i + 1} */}</div>,
    prevArrow: <button type="button" className="slick-prev"></button>,
    nextArrow: <button type="button" className="slick-next"></button>,
  };

  // Render the StoryDetails component
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!isLoginFormOpen ? (
            <div className="modal">
              <div className="viewStory">
                <div className="viewStoryBtn">
                  <button
                    className="viewStoryCloseBtn"
                    onClick={() => navigate("/")}
                  >
                    X
                  </button>
                  <button className="shareBtn" onClick={handleCopyLink}>
                    <FiSend />
                  </button>
                </div>
                <div className="slider-container">
                  <Slider {...settings} className="image-slider">
                    {story?.slides?.map((slide, index) => (
                      <div key={index}>
                        <img
                          className="slideImage"
                          src={slide?.imageUrl}
                          alt=""
                        />
                        <div className="viewStoryDetails">
                          <h2>
                            {slide?.heading.substring(0, 25)}
                            {slide?.heading.length > 25 && "..."}
                          </h2>
                          <p>{slide?.description}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                {copySuccess && (
                  <p className="linkCopied">Link copied to clipboard</p>
                )}
                <div className="viewStoryBtn">
                  <button
                    className="viewStoryBookmarkBtn"
                    onClick={handleBookmark}
                  >
                    <FaBookmark
                      style={{
                        fill:
                          bookmarked || user?.bookmarks?.includes(story?._id)
                            ? "blue"
                            : "white",
                      }}
                    />
                  </button>
                  <button className="likeBtn" onClick={handleLike}>
                    <FaHeart
                      style={{
                        fill:
                          liked || user?.likes?.includes(story?._id)
                            ? "red"
                            : "white",
                      }}
                    />
                    <p>{totalLikes + (newLike ? 1 : 0)}</p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <LoginSignup
              isLoginFormOpen={isLoginFormOpen}
              onClose={() => setLoginFormOpen(false)}
            />
          )}
        </>
      )}
    </Fragment>
  );
};

export default StoryDetails;
