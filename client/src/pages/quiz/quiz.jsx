import "./Desktop_Quiz.css";
import "./Quiz_Mobile copy.css";
import { useUserAuth } from "../../context/AuthContext";

export const Quiz = (props) => {
  var { user, x, setX } = useUserAuth();

  return (
    <>
      Hello world
    </>
  );
};


