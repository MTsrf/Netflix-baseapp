import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import {API_KEY,imageUrl} from '../../constants/constants'
import "./Banner.css"
import YouTube from 'react-youtube'


function Banner() {
  const [movie, setMovie] = useState()
  const [urlid,setUrlid]= useState('')
  const [list,setList] = useState([])
  
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((Response)=>{
      console.log(Response.data);
      const movi = Response.data.results
      const random = Math.floor(Math.random() * movi.length );
      setMovie(movi[random])
    })
  }, [])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (id)=>{
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response=>{
      if(Response.data.results.length!==0){
        setUrlid(Response.data.results[0])
      }else{
        console.log('Not Found');
      }
    })

  }
  const listClick = () =>{
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then(Response=>{
      setList(Response.data.results)
    })
  } 


  return (
    <div>
    <div className='banner' style={{backgroundImage:`url(${ movie && imageUrl+movie.backdrop_path})`}}>
        <div className="content">
            <h1 className="title">{ movie && movie.title }</h1>
            <div className="banner_buttons">
                <button onClick={()=>handleClick(movie.id)} className="button">Play</button>
                <button onClick={()=>listClick()} className="button">My List</button>
            </div>
            <h1 className="description">{ movie && movie.overview }</h1>
        </div>
        <div className="fade"></div>
    </div>
    { urlid && <YouTube videoId={urlid.key} opts={opts}/>}
        <div className="posters">
          {list.map((obj)=>

            <img onClick={()=>handleClick(obj.id)} className='smallposter' src={`${imageUrl+obj.backdrop_path}`} alt="poster" />

          )}
            
        </div>
    </div>
  )
}

export default Banner