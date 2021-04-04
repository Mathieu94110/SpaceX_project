import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <Link to="/details">
      <button>Voir les détails</button>
    </Link>
  );
};

export default Navigation;
