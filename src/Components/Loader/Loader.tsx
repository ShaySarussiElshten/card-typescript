import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader() {
    return (
        <div className="bg-white">
           <div className="p-72">
             <ClipLoader color={"green"} loading={true} css={override} size={300} /> 
           </div> 
        </div>
    )
}

export default Loader
