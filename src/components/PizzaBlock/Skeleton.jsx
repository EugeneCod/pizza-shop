import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={450}
    viewBox="0 0 280 450"
    backgroundColor="#cfcece"
    foregroundColor="#a39f9f"
    {...props}
  >
    <circle cx="137" cy="132" r="120" />
    <rect x="0" y="276" rx="10" ry="10" width="280" height="18" /> 
    <rect x="0" y="305" rx="11" ry="11" width="280" height="88" /> 
    <rect x="3" y="410" rx="10" ry="10" width="90" height="27" /> 
    <rect x="128" y="406" rx="30" ry="30" width="152" height="44" />
  </ContentLoader>
)

export default Skeleton
// https://skeletonreact.com/