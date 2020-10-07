import React from 'react';
import ReactLoading from "react-loading";

export default function Spinner() {
  const [loading, setLoading] = React.useState(false);
  
  const handleButtonClick = () => {
    if (!loading) {      
      setLoading(true);    
    }
  };

  return (
      <div>
            {loading &&
            <div style={{position:'absolute',marginLeft: '63px', marginTop: '23px'}} id='spinner'>
            <ReactLoading type='spinningBubbles' color="#ffffffa8" />
             </div>}
    </div>
  );
}
