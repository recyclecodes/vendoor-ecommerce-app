import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import men from "../../assets/homepage/category-men.png";
import women from "../../assets/homepage/category-women.png";

export default function CategorySection() {
  return (
    <div className="bg-blue-100 rounded-lg flex flex-col gap-4 justify-center items-center px-6 py-10 mx-10 lg:mx-20">
      <h2>Browse by Category</h2>
      <div className="flex flex-wrap flex-col justify-center gap-4 sm:flex-row ">
        <Link to="/men" label="Men">
          <CategoryCard category="Mens" imgSrc={men} />
        </Link>
        <Link to="/women" label="Women">
          <CategoryCard category="Womens" imgSrc={women} />
        </Link>
        <Link to="/kids" label="Kids">
          <CategoryCard
            category="Kids"
            imgSrc="https://i.ibb.co/5rQMSS0/1.png"
          />
        </Link>
        <Link to="/casual" label="Casual">
          <CategoryCard
            category="Casual"
            imgSrc="https://i.ibb.co/5rQMSS0/1.png"
          />
        </Link>
      </div>
    </div>
  );
}
