import './App.css';
import Auth from './components/Auth';
import {db,auth,storage} from './config/firebase'
import {getDocs, collection, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setmovieList] = useState([])

  //New movie state
  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newReleaseDate, setNewReleaseDate] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)
  

  //Update State
  const [updatedTitle, setUpdatedTitle] = useState("")

  //fileupload state
  const [fileUpload, setFileUpload] = useState(null)


  const movieCollectionRef = collection(db,"movies")

  const getMovieList =async()=>{
    try{

      const data = await getDocs(movieCollectionRef)
      let filteredData = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      console.log(filteredData)
      setmovieList(filteredData)
      // console.log(data)
      getUser()
    }
    catch(err){
      console.error(err)
    }
  }

  const getUser =async()=>{
    let id =  auth?.currentUser?.uid
    console.log(id)
  }

  useEffect(() => {

      getMovieList()
      
    
    
    // eslint-disable-next-line
  },[])

  const onSubmitMovie=async()=>{
    try{
      await addDoc(movieCollectionRef,{
        title: newMovieTitle,
        released: newReleaseDate,
        receivedAnOscar : isNewMovieOscar,
        userId: auth?.currentUser?.uid
      })
      getMovieList()
    }
    catch(err){
      console.error(err)
    }
    
  }

  const deleteMovie=async(id)=>{
    try{
      const docRef = doc(db, 'movies',id)
    await deleteDoc(docRef)
    getMovieList()
    }
    catch(err){
      console.error(err)
    }
    
  }
  const updateMovieTitle=async(id)=>{
    const docRef = doc(db, 'movies',id)
    await updateDoc(docRef,{title: updatedTitle})
    getMovieList()
  }

  const uploadFile=async()=>{
    if(!fileUpload) return;
    try{

      const filesfolderRef = ref(storage,`projectfiles/${fileUpload.name}`)
      await uploadBytes(filesfolderRef,fileUpload)
    }
    catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className="App">
      <Auth/>
      <div>
        <input type="text" placeholder='Title' onChange={(e)=>{setNewMovieTitle(e.target.value)}} />
        <input type="number" placeholder='Release Year' onChange={(e)=>{setNewReleaseDate(Number(e.target.value))}} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e)=>{setIsNewMovieOscar(e.target.checked)}} />
        <label >Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit movie</button>
      </div>
      {movieList.map((movie)=>(
        <div key={movie.id}>
          <h1 style={{color: movie.receivedAnOscar ? 'green' : 'red'}}>{movie.title}</h1>
          <p>Date:{movie.released}</p>
          <button onClick={()=>{deleteMovie(movie.id)}}>Delete Movie</button>
          <input type="text" placeholder='Update Title' onChange={(e)=>{setUpdatedTitle(e.target.value)}} />
          <button onClick={()=>{updateMovieTitle(movie.id)}}>Update</button>
        </div>
      ))}

      <div>
        <input type="file"  onChange={(e)=>{setFileUpload(e.target.files[0])}}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
