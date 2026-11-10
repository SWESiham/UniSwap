
import { Link } from "react-router-dom";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Laptop,
  PenLine,
  FileText,
  Package,
  ArrowRight,
  ShieldCheck,
  Users,
  Sparkles,
  Gift,
  Star,
  Plus,
  ChevronDown,
} from "lucide-react";

import Hero from "../../components/marketplace/Hero";
import ProductCard from "../../components/marketplace/ProductCard";
import "./Home.css";

// Automatically load images from src/uploads
const uploadedImages = Object.values(
  import.meta.glob("../../uploads/*.{png,jpg,jpeg,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  })
) as string[];

const categories = [
  { name: "Books", count: 3, icon: <BookOpen /> },
  { name: "Calculators", count: 1, icon: <Calculator /> },
  { name: "Lab Tools", count: 1, icon: <FlaskConical /> },
  { name: "Electronics", count: 2, icon: <Laptop /> },
  { name: "Stationery", count: 2, icon: <PenLine /> },
  { name: "Notes", count: 2, icon: <FileText /> },
  { name: "Other", count: 0, icon: <Package /> },
];

const products = [
  {
    name: "Casio fx-991ES PLUS Scientific Calculator",
    condition: "Like New",
    type: "Sale or exchange",
    price: "450 EGP",
    faculty: "Engineering",
    time: "3 hours ago",
    match: true,
    image: uploadedImages[0],
  },
  {
    name: "Data Structures & Algorithms Textbook",
    condition: "Used",
    type: "",
    price: "200 EGP",
    faculty: "Computer & Information Sciences",
    time: "20 hours ago",
    match: true,
    image: uploadedImages[1],
  },
  {
    name: "Lab Coat + Safety Goggles",
    condition: "Like New",
    type: "Sale or exchange",
    price: "180 EGP",
    faculty: "Science",
    time: "2 days ago",
    match: false,
    image: uploadedImages[2],
  },
  {
    name: "HP ProBook 450 G6",
    condition: "Used",
    type: "",
    price: "11,500 EGP",
    faculty: "Engineering",
    time: "3 days ago",
    match: false,
    image: uploadedImages[3],
  },
  {
    name: "Machine Learning Lecture Notes",
    condition: "Like New",
    type: "Sale or exchange",
    price: "120 EGP",
    faculty: "Computer & Information Sciences",
    time: "4 days ago",
    match: false,
    image: uploadedImages[4],
  },
  {
    name: "Geometry Set + Stabilo Highlighters",
    condition: "Like New",
    type: "",
    price: "90 EGP",
    faculty: "Pharmacy",
    time: "5 days ago",
    match: false,
    image: uploadedImages[5],
  },
  {
    name: "Thermodynamics - Cengel 8th Edition",
    condition: "Used",
    type: "",
    price: "260 EGP",
    faculty: "Engineering",
    time: "6 days ago",
    match: false,
    image: uploadedImages[6],
  },
  {
    name: "Pharmacology Reference Book",
    condition: "Like New",
    type: "Sale or exchange",
    price: "540 EGP",
    faculty: "Pharmacy",
    time: "Last week",
    match: false,
    image: uploadedImages[7],
  },
];

const studentRequests = [
  {
    category: "Calculators",
    title: "Need a scientific calculator before the midterm",
    budget: "Up to 400 EGP",
    user: "Mariam Hassan",
    time: "5 hours ago",
  },
  {
    category: "Books",
    title: "Looking for Data Structures book (any edition)",
    budget: "Up to 250 EGP",
    user: "Mariam Hassan",
    time: "2 days ago",
  },
  {
    category: "Lab Tools",
    title: "Lab coat size M needed urgently",
    budget: "Up to 200 EGP",
    user: "Kareem Mahmoud",
    time: "3 days ago",
  },
];

const benefits = [
  {
    icon: <ShieldCheck />,
    title: "Safe by design",
    description:
      "Verified students only, on-campus meetups, and no online payments.",
  },
  {
    icon: <Users />,
    title: "Students only",
    description:
      "Every listing comes from someone in your university community.",
  },
  {
    icon: <Sparkles />,
    title: "AI-powered listings",
    description:
      "A photo is enough. AI helps write your product details.",
  },
  {
    icon: <Gift />,
    title: "Completely free",
    description: "No commission, no hidden fees, ever.",
  },
];

const testimonials = [
  {
    quote:
      "I sold my old calculator in 20 minutes and bought last year's notes from the same guy.",
    name: "Nourhan M.",
    faculty: "Engineering",
  },
  {
    quote:
      "Found a lab coat the same day I needed it — from someone in my own faculty.",
    name: "Omar K.",
    faculty: "Science",
  },
  {
    quote:
      "The AI wrote my whole listing. I just tweaked the price and hit publish.",
    name: "Habiba S.",
    faculty: "Pharmacy",
  },
];

const faqs = [
  {
    question: "Is UniSwap free?",
    answer:
      "Yes! UniSwap is completely free. There are no commissions or listing fees.",
  },
  {
    question: "How do I pay?",
    answer:
      "You arrange payment directly with the other student. Meet on campus and choose a payment method that works for both of you.",
  },
  {
    question: "Who can join?",
    answer:
      "UniSwap is designed for university students. Listings and exchanges are intended for your campus community.",
  },
  {
    question: "How does the AI listing work?",
    answer:
      "Upload a product photo and AI can help generate a title and description for your listing.",
  },
  {
    question: "What if someone misbehaves?",
    answer:
      "You should report suspicious behavior and avoid sharing sensitive personal information. Keep exchanges in safe campus locations.",
  },
];

const Home = () => {
  const facultyProducts = [products[1], products[4]];

  const trendingProducts = [
    products[3],
    products[4],
    products[0],
    products[7],
  ];

  return (
    <main className="home-page">
      {/* Hero */}
      <Hero />

      {/* Featured Categories */}
      <section className="home-section home-categories-section">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">EXPLORE</span>
            <h2>Featured Categories</h2>
            <p>Find exactly what you need for your university life.</p>
          </div>

          <Link to="/browse" className="home-text-link">
            View all <ArrowRight size={17} />
          </Link>
        </div>

        <div className="home-categories-grid">
          {categories.map((category) => (
            <Link
              to={`/browse?category=${encodeURIComponent(category.name)}`}
              className="home-category-card"
              key={category.name}
            >
              <div className="home-category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              <span>
                {category.count} {category.count === 1 ? "item" : "items"}
              </span>
              <ArrowRight className="home-category-arrow" size={17} />
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Items */}
      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">JUST LISTED</span>
            <h2>Latest Items</h2>
            <p>Fresh finds from students around your campus.</p>
          </div>

          <Link to="/browse" className="home-text-link">
            Browse all <ArrowRight size={17} />
          </Link>
        </div>

        <div className="home-products-grid">
          {products.map((product, index) => (
            <ProductCard
              product={product}
              key={`${product.name}-${index}`}
            />
          ))}
        </div>

        <div className="home-centered-action">
          <Link to="/browse" className="home-outline-button">
            Explore all items <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* In Your Faculty */}
      <section className="home-section home-soft-section">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">YOUR COMMUNITY</span>
            <h2>In Your Faculty</h2>
            <p>Discover useful items from students in your faculty.</p>
          </div>

          <Link to="/browse" className="home-text-link">
            View more <ArrowRight size={17} />
          </Link>
        </div>

        <div className="home-products-grid home-three-grid">
          {facultyProducts.map((product) => (
            <ProductCard product={product} key={product.name} />
          ))}

          <article className="home-faculty-promo">
            <div className="home-promo-icon">
              <Users size={28} />
            </div>
            <h3>Your faculty. Your people.</h3>
            <p>
              Find books, notes, and useful study tools from students around
              you.
            </p>
            <Link to="/browse">
              Explore your faculty <ArrowRight size={16} />
            </Link>
          </article>
        </div>
      </section>

      {/* Trending */}
      <section className="home-section">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">POPULAR RIGHT NOW</span>
            <h2>Trending Now</h2>
            <p>Items students are checking out this week.</p>
          </div>
        </div>

        <div className="home-products-grid home-four-grid">
          {trendingProducts.map((product, index) => (
            <ProductCard
              product={product}
              key={`${product.name}-trending-${index}`}
            />
          ))}
        </div>
      </section>

      {/* Student Requests */}
      <section className="home-section home-requests-section">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">HELP EACH OTHER</span>
            <h2>Recent Student Requests</h2>
            <p>Have something someone is looking for? Help them find it.</p>
          </div>

          <Link to="/browse" className="home-text-link">
            View requests <ArrowRight size={17} />
          </Link>
        </div>

        <div className="home-requests-grid">
          {studentRequests.map((request) => (
            <article className="home-request-card" key={request.title}>
              <div className="home-request-top">
                <span className="home-request-category">
                  {request.category}
                </span>
                <span className="home-request-budget">{request.budget}</span>
              </div>

              <h3>{request.title}</h3>

              <div className="home-request-user">
                <div className="home-user-avatar">
                  {request.user.charAt(0)}
                </div>
                <div>
                  <strong>{request.user}</strong>
                  <span>{request.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why UniSwap */}
      <section className="home-section home-why-section">
        <div className="home-section-heading home-center-heading">
          <div>
            <span className="home-eyebrow">WHY UNISWAP?</span>
            <h2>A better way to exchange on campus</h2>
            <p>Made to make student life easier, safer, and more affordable.</p>
          </div>
        </div>

        <div className="home-benefits-grid">
          {benefits.map((benefit) => (
            <article className="home-benefit-card" key={benefit.title}>
              <div className="home-benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="home-section">
        <div className="home-section-heading home-center-heading">
          <div>
            <span className="home-eyebrow">STUDENT STORIES</span>
            <h2>Students love UniSwap</h2>
            <p>Real campus moments, one exchange at a time.</p>
          </div>
        </div>

        <div className="home-testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className="home-testimonial-card" key={testimonial.name}>
              <div className="home-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <p>"{testimonial.quote}"</p>
              <div className="home-testimonial-user">
                <div className="home-user-avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.faculty}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="home-section home-faq-section">
        <div className="home-section-heading home-center-heading">
          <div>
            <span className="home-eyebrow">GOT QUESTIONS?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know before getting started.</p>
          </div>
        </div>

        <div className="home-faq-list">
          {faqs.map((faq) => (
            <details className="home-faq-item" key={faq.question}>
              <summary>
                {faq.question}
                <ChevronDown size={19} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="home-final-cta">
        <div className="home-cta-decoration home-cta-decoration-one" />
        <div className="home-cta-decoration home-cta-decoration-two" />

        <div className="home-cta-content">
          <span className="home-cta-label">
            YOUR NEXT GREAT FIND STARTS HERE
          </span>
          <h2>Got something you no longer use?</h2>
          <p>
            List it in under a minute and find it a new home on campus.
          </p>

          <div className="home-cta-buttons">
            <Link to="/add-item" className="home-cta-primary">
              <Plus size={18} /> Add Item
            </Link>
            <Link to="/login" className="home-cta-secondary">
              Log in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
