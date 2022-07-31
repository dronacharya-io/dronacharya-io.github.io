import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserAuth } from "../../context/AuthContext";
import UserQuizCard from "./userQuizCard";


export const Classroom = () => {
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    quizzesCreated: [{ quiz: { quizName: "null", startDate: 0, runTime: 0 } }],
  });

  useEffect(() => {
    async function Fetch() {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8800/api/users/getUser/" + user.userData._id
        );
        console.log(res);
        setData(res.data);
      } catch (err) {
        setData(err);
      }
      setLoading(false);
    }

    return () => {
      Fetch();
    };
  }, []);

  return (
    <div className="cards">
        {data.quizzesCreated?.map((quiz, i) => {
          return (
            <div>
              <UserQuizCard
                key={i}
                loading={loading}
                quizName={quiz.name}
                runTime={quiz.runTime}
                startDate={quiz.startDate}
                />
            </div>
          );
        })
      }
    </div>
  );
};

// import React from "react";
// import {
//   MDBCard,
//   MDBCardBody,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCardImage,
//   MDBBtn,
//   MDBRipple,
// } from "mdb-react-ui-kit";

// export default function App() {
//   return (
//     <MDBCard style={{ maxWidth: "22rem" }}>
//       <MDBRipple
//         rippleColor="light"
//         rippleTag="div"
//         className="bg-image hover-overlay"
//       >
//         <MDBCardImage
//           src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
//           fluid
//           alt="..."
//         />
//         <a>
//           <div
//             className="mask"
//             style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
//           ></div>
//         </a>
//       </MDBRipple>
//       <MDBCardBody>
//         <MDBCardTitle>Card title</MDBCardTitle>
//         <MDBCardText>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </MDBCardText>
//         <MDBBtn href="#">Button</MDBBtn>
//       </MDBCardBody>
//     </MDBCard>
//   );
// }
