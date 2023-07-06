import React from 'react'

const useMedia = (media) => {
  const [metch, setMetch] = React.useState(null)

  React.useEffect(()=>{
    function changeMetch(){
      const {matches} = window.matchMedia(media)
      setMetch(matches)
    }
    changeMetch()
    window.addEventListener('resize',changeMetch,)
    return () =>{
      window.removeEventListener('resize',changeMetch)
    } 
  },[media])
  
 return metch
}

export default useMedia