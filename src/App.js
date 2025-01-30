import React from "react";
import JokeDisplay from "./components/JokesDisplay";
import CategorySelector from "./components/CategorySelector";
import SearchJokes from "./components/SearchJokes";
import { motion } from "framer-motion";
import "./styles.css";

const App = () => {
  return (
    <motion.div 
      className="app-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
    >
      <h1>Chuck Norris Jokes</h1>
      <JokeDisplay />
      <CategorySelector />
      <SearchJokes />
    </motion.div>
  );
};

export default App;
