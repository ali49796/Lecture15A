import React, { useEffect, useState } from 'react'
import {useRouter}  from 'next/router'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { database } from '../firebase';

function Home() {

  const router = useRouter();
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    if(!sessionStorage.getItem("username")){
      router.push('/auth/login')
      // setUsername(sessionStorage.getItem("username"))
    }
    
  }, [])
  

  useEffect(() => {
    getData();
  }, [])
  

  const getData = async () => {
    await getDocs(collection(database, 'students'))
    .then((response) => {
      setStudentsData(response.docs);
    })
  }

  console.log(studentsData);

  const updateStudent = () => {
    alert('update');
  }

  const deleteStudent = async (id) => {
    let fieldToDelete = doc(database, 'students', id);
    await deleteDoc(fieldToDelete)
    .then(() => {
      alert('Data Deleted')
    })
    .catch((err) => {
      console.log(err);
    })

  }
  
  const logout = () => {
    sessionStorage.removeItem('username');
    router.push('/auth/login')
  }

  return (
    <div className='w-8/12 m-auto pt-10'>
      <button
        className='bg-blue-400 text-white py-2 px-7 rounded-md'
        onClick={ logout }
      >Signout</button>
      <button
        className='bg-blue-400 text-white py-2 px-7 rounded-md'
        onClick={() => router.push("/student/insert")}
      >Insert</button>

      <div className=''>
        <table className='w-full text-center mt-5 border border-gray-400'>
          <thead className='border-b border-gray-400 bg-slate-300 h-10'>
            <tr>
              <th>Name</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
              { studentsData.map((item) => (
                <tr key={item.id} className='bg-white h-12 border-b border-gray-400'>
                  <td>{item.data().name}</td>
                  <td>{item.data().marks}</td>
                  <td>
                    <button
                      className='bg-green-400 py-2 px-5 rounded-md mr-2'
                      onClick={ () => router.push('/student/update/' + item.id) }
                    >Update</button>
                    <button
                      className='bg-red-400 py-2 px-5 rounded-md'
                      onClick={() => deleteStudent(item.id)}
                    >Delete</button>
                  </td>
                </tr>
            
              )  ) }
            
          </tbody>          
        </table>
      </div>
    </div>
  )
}

export default Home