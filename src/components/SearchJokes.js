import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const SearchJokes = () => {
  const [query, setQuery] = useState("");
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchJokes = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
      setJokes(response.data.result);
    } catch (error) {
      console.error("Error searching jokes:", error);
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="search-container"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <input type="text" placeholder="Search jokes..." onChange={(e) => setQuery(e.target.value)} />
      <motion.button 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        onClick={searchJokes}
      >
        Search
      </motion.button>
      {loading ? <p>Loading...</p> : (
        <motion.ul initial="hidden" animate="visible" variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}>
          {jokes.map((joke) => (
            <motion.li key={joke.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              {joke.value}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default SearchJokes;
