import React,{useEffect, useState} from 'react'
import "./RowPost.css";
import axios from '../../axios';
import {imageUrl,API_KEY} from '../../constants/constants'
import YouTube from 'react-youtube';

function RowPost(props) {
    const [movies,setMovies]= useState([])
    const [urlid,setUrlid] = useState('')
    useEffect(() => {
      axios.get(props.url).then((Response)=>{
        setMovies(Response.data.results)
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

    const handleMovieTrailer = (id)=>{
      axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(Response=>{
        if(Response.data.results.length!==0){
          setUrlid(Response.data.results[0])
        }else{
          console.log('Not Found Trailer');
        }
      })

    }

  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className="posters">
          {movies.map((obj)=>

            <img onClick={()=>handleMovieTrailer(obj.id)} className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />

          )}
            
        </div>
        { urlid && <YouTube videoId={urlid.key} opts={opts}/>}
        
    </div>
  )
}

export default RowPost