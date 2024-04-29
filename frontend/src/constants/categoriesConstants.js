import all from "../assets/ALL.png";
import food from "../assets/food.jpg";
import fitness from "../assets/health & fitness.png"
import travel from "../assets/travel.png";
import movies from "../assets/movie.jpg";
import education from "../assets/education.jpg";

export const DEFAULT_CATEGORIES = [
  {
    id: "1",
    label: "ALL",
    value: "all",
    image: <img src={all} alt="Food" />,
  },
  {
    id: "2",
    label: "Food",
    value: "food",
    image: <img src={food} alt="Food" />,
  },
  {
    id: "3",
    label: "Health and Fitness",
    value: "health and fitness",
    image: <img src={fitness} alt="Health and Fitness" />,
  },
  {
    id: "4",
    label: "Travel",
    value: "travel",
    image: <img src={travel} alt="Travel" />,
  },
  {
    id: "5",
    label: "Movie",
    value: "movies",
    image: <img src={movies} alt="Movies" />,
  },
  {
    id: "6",
    label: "Education",
    value: "education",
    image: <img src={education} alt="Education" />,
  },
];
