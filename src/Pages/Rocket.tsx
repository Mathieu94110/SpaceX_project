import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
const Rocket: React.FC = () => {
  const [rocket, setRocket] = useState<any>(null);
  let { id }: any = useParams();

  const request = async () => {
    const url: string = "https://api.spacexdata.com/v4/rockets/" + id;
    const response = await fetch(url);

    try {
      const json = await response.json();
      console.log("Reponse data ", json);
      setRocket(json);
    } catch (e) {
      console.log("Error! " + e);
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div>
      {rocket && (
        <div style={{ textAlign: "center" }}>
          <Link to="/details">
            <Button variant="contained" color="primary">
              Page de détails
            </Button>
          </Link>
          <h2>
            Nom de la roquette:{" "}
            <span style={{ color: "blue" }}>{rocket.name}</span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Rocket;
