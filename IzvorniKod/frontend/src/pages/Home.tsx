import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  let user = false;

  useEffect(() => {
    if (!user) navigate("/signIn");
  });

  return <p>Home is here!</p>;
}
