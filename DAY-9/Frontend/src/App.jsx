import React, { useState , useEffect } from 'react'
import axios  from 'axios'


const App = () => {

  const [notes, setNotes] = useState([])


 function fetchNotes () {axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setNotes(res.data.note)
  })}


  useEffect(()=>{
    fetchNotes() 

  },[])

 function handleSubmit(e){
   e.preventDefault()

   const {title , description} = e.target.elements
   
   console.log(title.value, description.value)


   axios.post('http://localhost:3000/api/notes' , {
    title:title.value,
    description:description.value
   })
   .then((res)=>{
    console.log(res.data)
    
     fetchNotes()
  
   })

 }

  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder='Enter title' />
      <input name="description" type="text" placeholder='Enter description' />
      <button>CreateNotes</button>
    </form>
    
     <div className="notes">
      {
        notes.map((note,idx)=>{

          return <div key={idx} className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
      </div>

        })
      }
      
     </div>
    </>
  )
}

export default App