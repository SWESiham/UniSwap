import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import "./Hero.css";
import img1 from "../../assets/img1.jpg";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">

        <span className="hero-tag">
          🎓 Your Campus Marketplace
        </span>

        <h1>
          Buy, Sell & Swap
          <span> on Campus</span>
        </h1>

        <p>
          Connect with students, discover amazing deals,
          and give your unused items a new life.
        </p>

        <div className="hero-buttons">
          <Link to="/browse" className="hero-primary-btn">
            Explore Marketplace <ArrowRight size={18} />
          </Link>

          <Link to="/add-item" className="hero-secondary-btn">
            <ShoppingBag size={18} /> Sell an Item
          </Link>
        </div>

      </div>
      <div className="hero-image">
  <img src={img1} alt="Students exchanging items on campus" />
</div>
    </section>
  );
};

export default Hero;