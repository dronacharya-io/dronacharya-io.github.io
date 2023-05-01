
import React, {useState,useEffect} from 'react';
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import "./pdf_visualiser.css";
import {motion} from "framer-motion"; 
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { getDownloadURL,ref } from 'firebase/storage';
import { storage } from '../../firebase';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import Skeleton from '@mui/material/Skeleton';

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
          <div className="Example__container__document react-pdf__Page" >
            <Skeleton
              sx={{ bgcolor: '#d9d9d9' }}
              variant="rectangular"
              width={330}
              height={400}
            />
          </div>
      )
    }
    
    
    const pageLoading = () =>{
      return(
          <div >
            <Skeleton
              sx={{ bgcolor:  ' #d9d9d9' }}
              variant="rectangular"
              width={330}
              height={400}
            />
          </div>
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
        <div>
          <h1 className='pdf-visualiser-title' >{props.title}</h1>
        </div>
        <div className="Example__container">
          <div className="Example__container__document">
            <motion.div
              style={{width:"100%",height:"100%"}}
              className="Example">
                <Document 
                  style={{display:"inline"}}
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



