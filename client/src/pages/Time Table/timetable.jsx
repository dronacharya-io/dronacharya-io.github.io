import React from 'react'
import Pdf_visualiser from '../../components/pdf visualiser/pdf_visualiser'
import TimeTable from "../../components/pdf visualiser/pdfs/Time Table/timtable.pdf"

export const Timetable = () => {
    const pdf = TimeTable;
  return (
    <>
        <Pdf_visualiser title={"Time Table"} file={pdf} />
    </>
  )
}

