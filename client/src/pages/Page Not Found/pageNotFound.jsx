import React from 'react'
import "./pageNoteFound.css"
import Lottie from "react-lottie"
import NotFoundAnimation from "../../lotties/notfound2.json"

export const PageNotFound = () => {
  
    const animation = {
        loop: true,
        autoplay: true,
        animationData: NotFoundAnimation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

    return (
    <div className='pagenotfound_parent_div' >
        <div className='pagenotfound_lottie_container' >
            <Lottie
                isClickToPauseDisabled={true}
                options={animation}
            />
        </div>
        <div className='pagenotfound_paragraph_conatainer' >
            <p className='pagenotfound_pragraph' > "hmm, looks like the page you are looking for doesn't exist"</p>
        </div>
    </div>
  )
}