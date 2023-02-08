import React, {useState,useEffect} from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import sample from './sample.pdf';
import "./pdf_visualiser.css";
import {motion} from "framer-motion"; 
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { getDownloadURL,ref } from 'firebase/storage';
import { storage } from '../../firebase';

export default function Pdf_visualiser() {
    const [file, setFile] = useState();
    const [numPages, setNumPages] = useState(null);
   
    const [animateCard, setAnimateCard] = useState({y:0, opacity:1})
    function onFileChange(event) {
      setFile(event.target.files[0]);
    }

    useEffect(()=>{
      getDownloadURL(ref(storage, "sample.pdf")).then((url)=>{
        setFile(url);
      });
    })
  
    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
      setNumPages(nextNumPages);
    }

    const [pageNumber, setPageNumber] = useState(1);

 

    const ChangePage = (offset) =>{
        setPageNumber((prevPage)=> prevPage + offset);
    }

    const ChangePageBack =() =>{
        ChangePage(-1);
    }

    const ChangePageNext = () =>{
        ChangePage(+1);
    }
  
    return (
      <div
        className="pdf-visualiser-main-div">
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__document">
            <motion.div
                animate={animateCard}
                initial={{ y: 40, opacity: 0 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="Example">
                <Document file={file} onLoadSuccess={onDocumentLoadSuccess} >
                    <Page  pageNumber={pageNumber} />
                </Document>
            </motion.div>
           <motion.div
            className='pdf-visualiser-pages-navigation-div'
           >
                { (<button className='pdf-visualiser-pages-navigation-btn' disabled={pageNumber > 1 ? false : true } onClick={ChangePageBack} ><ChevronLeftIcon /></button>)}
                <p className='pdf-visualiser-pages-navigation-p-tag' >{pageNumber} of {numPages}</p>
                {(<button className='pdf-visualiser-pages-navigation-btn' disabled={ pageNumber < numPages ? false : true} onClick={ChangePageNext} ><NavigateNextIcon/></button>) }
           </motion.div>
            
          </div>
        </div>
      </div>
    );
  }




// const Pdf_visualiser = () => {

    // const [numPage, setNumPage] = useState(null);
    // const [pageNumber, setPageNumber] = useState(1);

    // const onDocumentLoadSuccess = ({numPages}) =>{
    //     setNumPage(numPages);
    //     setPageNumber(1);
    // }

    // const ChangePage = (offset) =>{
    //     setPageNumber((prevPage)=> prevPage + offset);
    // }

    // const ChangePageBack =() =>{
    //     ChangePage(-1);
    // }

    // const ChangePageNext = () =>{
    //     ChangePage(+1);
    // }

//   return (
//     <div>
        // <Document file={sample} onLoadSuccess={onDocumentLoadSuccess} >
        //     <Page  pageNumber={pageNumber} />
        // </Document>
        // <p>Page {pageNumber} of {numPage}</p>
        // { pageNumber > 1 && (<button onClick={ChangePageBack} >Previous Page</button>)}
        // { pageNumber < numPage && (<button onClick={ChangePageNext} >Next Page</button>) }
//     </div>
//   )
// }