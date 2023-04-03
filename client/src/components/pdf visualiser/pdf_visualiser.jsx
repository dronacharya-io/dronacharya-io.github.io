
import React, {useState,useEffect} from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import "./pdf_visualiser.css";
import {motion} from "framer-motion"; 
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { getDownloadURL,ref } from 'firebase/storage';
import { storage } from '../../firebase';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Pdf_visualiser(props) {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
   
    const [animateCard, setAnimateCard] = useState({y:0, opacity:1})
    function onFileChange(event) {
      setFile(event.target.files[0]);
    }

    useEffect(()=>{
      getDownloadURL(ref(storage, "na2.pdf")).then((url)=>{
        setFile(url);
      });
    },[])
  
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

    const noData = () =>{
      return(
        <h1>no file of such type</h1>
      )
    }

    const onLoadError = () =>{
      return(
        <h1>Refresh and Try again</h1>
      )
    }

    const loading = () =>{
      return  (
        <>
          <motion.div
            animate={animateCard}
            initial={{ y: 40, opacity: 0 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{width:"200px",height:"400px"}}
            className="Example">
            <h3 style={{color:"black"}} >fetching document please wait..</h3>
          </motion.div>
        </>
      )
    }
    
    const pageLoading = () =>{
      return(
        <>
          <h2>loading next page..</h2>
        </>
      )
    }

    const removeTextLayerOffset = () => {
      const textLayer = document.querySelectorAll(".react-pdf__Page__textContent");

      textLayer.forEach((layer)=>{
        const { style } = layer;
        style.top = "1";
        style.left = "2";
        style.transform = '';
      })
    }
    
  
    return (
      <div
        className="pdf-visualiser-main-div">
        <header>
          <h1 className='pdf-visualiser-title' >{props.title}</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__document">
            <motion.div
              animate={animateCard}
              initial={{ y: 40, opacity: 0 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{width:"100%",height:"100%"}}
              className="Example">
                <Document 
                  options={{
                    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                    cMapPacked: true,
                    standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
                  }}
                 file={props.file ? props.file : file}   onLoadError={onLoadError} onLoadSuccess={onDocumentLoadSuccess} width={200} height={400} loading={loading}>
                    <Page renderTextLayer={false} pageNumber={pageNumber} onLoadSuccess={removeTextLayerOffset} loading={pageLoading} width={330} height={400} />
                </Document>
              </motion.div>
              <motion.div
                className='pdf-visualiser-pages-navigation-div'
              >
              <div className='pdf-visualiser-pages-navigation-btn-div' >
                { (<button className='pdf-visualiser-pages-navigation-btn p-v-first-btn' disabled={pageNumber > 1 ? false : true } onClick={ChangePageBack} ><ChevronLeftIcon /></button>)}
                <p className='pdf-visualiser-pages-navigation-p-tag' >{pageNumber} of {numPages}</p>
                {(<button className='pdf-visualiser-pages-navigation-btn p-v-second-btn' disabled={ pageNumber < numPages ? false : true} onClick={ChangePageNext} ><NavigateNextIcon/></button>) }
              </div>
              </motion.div>
          </div>
        </div>
      </div>
    );
  }



