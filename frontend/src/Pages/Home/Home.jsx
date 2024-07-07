import React from "react";
import "./Home.css";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/Exploremenu/Exploremenu";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <ExploreMenu />
    </div>
  );
};

export default Home;
