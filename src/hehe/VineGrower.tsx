import React, { useState, useEffect } from 'react';

const VINE_CHUNK = `       ###%%+++**%%%%%**   ##***+++++  
  *****###%%***       ##   ##%%%**+++  
  *****###%%***       ##   ##%%%**+++  
+++++**%%%##            +++**%%%%%     
++***##%%%            +++++**###%%     
     ##%%%            %%%%%##***##     
     ##%%%            %%%%%##***##     
  ***#####%%     #####%%     ***##%%%%%
%%*****###*****%%###**     **###%%     
##     ###**+++++  ***  ***##+++++     
##     #####***++  ***  ***##***++     
          %%***++          ##***++     
          ##%%%         ***##%%%*****  
          **%%%         ###%%          
     %%***##%%%**     +++++%%          
     %%***##%%%**     +++++%%          
%%*****###%%*****     ++***##%%%  ###%%
  +++**%%%%%   **     **   ##%%%%%%%%**
  ***##%%%%%            %%%#####     ##
  ***##%%%%%            %%%#####     ##
     ##%%%##***##  ###%%   %%*****     `;

const VineGrower = () => {
  const [chunksCount, setChunksCount] = useState(2); 

  useEffect(() => {
    const interval = setInterval(() => {
      setChunksCount((prevCount) => {
        if (prevCount >= 10) {
          clearInterval(interval); 
          return prevCount;
        }
        return prevCount + 1;
      });
    }, 30000); // 30 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vine" style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: chunksCount }).map((_, index) => (
        <pre 
          key={index} 
          className="vine-asc"
          style={{
            fontFamily: 'monospace',
            whiteSpace: 'pre',
            margin: 0,
            lineHeight: '1.0'
          }}
        >
          {VINE_CHUNK}
        </pre>
      ))}
    </div>
  );
};

export default VineGrower;
