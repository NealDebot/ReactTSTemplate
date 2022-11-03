import React from "react"
import "@sass/Loader.sass"

const Loader = ({ size="big" }: { size?: "small" | "big" }) => {
  return (
    <div className={`preloader-wrapper ${size || ""} active`}>
      <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
