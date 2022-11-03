import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  let user = false;

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/articles").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  useEffect(() => {
    if (!user) navigate("/auth");
  });

  return <p>Home is here!</p>;
}
