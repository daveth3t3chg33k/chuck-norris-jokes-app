import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CategorySelector = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);


  // fetch a category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.chucknorris.io/jokes/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const fetchJokeByCategory = async () => {
    if (!selectedCategory) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`);
      setJoke(response.data.value);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="category-container"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <motion.select 
        onChange={(e) => setSelectedCategory(e.target.value)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </motion.select>
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={fetchJokeByCategory}
      >
        Get Joke
      </motion.button>
      {loading ? <p>Loading...</p> : <motion.p initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 100 }}>{joke}</motion.p>}
    </motion.div>
  );
};

export default CategorySelector;
