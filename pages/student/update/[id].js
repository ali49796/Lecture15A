import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { database, db } from '../../../firebase';
import {useRouter} from 'next/router'

function UpdateStudent() {
  
  const [student, setStudent] = useState([]);
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  
  const router = useRouter();
  
  const studentId = router.query.id;
  
  
  useEffect(() => {
    getData();
  }, [])
  
  const getData = async () => {
    await getDoc(doc(database, "students", studentId))
    .then((response) => {
      setName(response.data().name)
      setMarks(response.data().marks)
    })
  }

  const updateData = async (e) => {
    e.preventDefault();
    
    let fieldToEdit = doc(database, 'students', studentId);
    await updateDoc(fieldToEdit, {
      name: name,
      marks: marks
    })
    .then(() => {
      alert('Data Updated')
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
      <div className='flex items-center justify-center h-screen flex-col'>
        <form className='bg-gray-400 w-4/12 flex items-center justify-center flex-col gap-4 py-5 px-10'>
          <h2 className='font-bold text-xl '>Edit Details</h2>
          <input 
            type="text" 
            placeholder='Enter Name' 
            className='w-full py-1 px-4 border-none outline-none' 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input 
            type="number" 
            placeholder='Enter Marks' 
            className='w-full py-1 px-4 border-none outline-none' 
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
          />

          <button 
            type='submit'
            className='bg-blue-500 text-white w-full p-2 rounded-full'
            onClick={updateData}
          >Update</button>
        </form>

        <button
          className='underline text-blue-400'
          onClick={() => router.push('/')}
        >Back</button>
      </div>
  )
}

export default UpdateStudent