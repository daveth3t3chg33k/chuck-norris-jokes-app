import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const JokeDisplay = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.chucknorris.io/jokes/random");
      setJoke(response.data.value);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <motion.div 
      className="joke-container"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? <p>Loading...</p> : <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{joke}</motion.p>}
      <motion.button 
        whileHover={{ scale: 1.1, backgroundColor: "#ff7800" }} 
        whileTap={{ scale: 0.9 }} 
        onClick={fetchJoke}
      >
        Get Random Joke
      </motion.button>
    </motion.div>
  );
};

export default JokeDisplay;
