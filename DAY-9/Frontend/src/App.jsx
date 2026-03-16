import React, { useState , useEffect } from 'react'
import axios  from 'axios'


const App = () => {

  const [notes, setNotes] = useState([])


 function fetchNotes () {
  axios.get('https://cohort-backend-7.onrender.com/api/notes')
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


   axios.post('https://cohort-backend-7.onrender.com/api/notes' , {
    title:title.value,
    description:description.value
   })
   .then((res)=>{
    console.log(res.data)

    
     fetchNotes()
  
   })

  }

  function handleDeleteNote(noteId){
    axios.delete('https://cohort-backend-7.onrender.com/api/notes/'+ noteId)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
   }
 function handleUpdateNote(noteId){
  axios.patch('https://cohort-backend-7.onrender.com/api/notes/' + noteId, {
    description: "comp student-3"
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
            <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
           <button onClick={()=>{handleUpdateNote(note._id)}}>Update</button>

      </div>

        })
      }
      
     </div>
    </>
  )
}

export default App