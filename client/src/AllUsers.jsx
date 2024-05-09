import React, { useEffect, useState } from 'react'
import axios from 'axios'


const AllUsers = () => {

    const [users,setUsers] = useState([]);
    const [byuser, setByuser] = useState({});
    const [filterText, setFilterText] = useState("");


    const filteredData = users.filter((item) => {
      return (
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.description.toLowerCase().includes(filterText.toLowerCase()) ||
        item.date.toLowerCase().includes(filterText.toLowerCase())
      );
    });
    
    const tableData = filterText ? filteredData : users;

    

  const handleInputChange = (e) => {
    setFilterText(e.target.value);
  };

    useEffect(()=>{
      getFetch();
    },[])

    const updateUser=(async(user)=>{
     await axios.put('http://localhost:3001/update', { id: user._id, ...user })
      .then(response => {
      getFetch();
      console.log(response.data); 
    })
    .catch(error => {
    console.error(error); 
    });
    })

    const getFetch = (async()=>{
      await axios.get('http://localhost:3001')
      .then(result=> setUsers(result.data))
      .catch(err => console.log(err))
    })

    const getFetchByid = (async(id)=>{
      await axios.get(`http://localhost:3001/${id}`)
      .then(result=> setByuser(result.data))
    })

    const[name,setName]= useState()
    const[description,setDescription]= useState()
    const[date,setDate]= useState()

    const Submit = (e) =>{

      const name_val = document.getElementById("exampleFormControlInput1").value;
      const description_val = document.getElementById("exampleFormControlInput2").value;
      const date_val = document.getElementById("exampleFormControlInput3").value;
      if (name_val === "") {
        alert("Name must be filled out");
        return;
      }
      if (description_val === "") {
        alert("Description must be filled out");
        return;
      }
      if (date_val === "") {
        alert("Date must be filled out");
        return;
      }
      axios.post('http://localhost:3001/create',{name,description,date})
      .then(result => {
        console.log(result)
      })
      .catch(err => console.log(err))
    }

    // const handleDelete = async(id) =>{
    //   const data = await axios.delete(`http://localhost:3001/delete/${id}`)
    //   console.log(id)
    //   console.log(data);
    //   getFetch();
    // }

    const handleDelete = async (id) => {
      // Kullanıcıya onay mesajı göstermek için bir onay almak üzere bir confirm dialog kullanabiliriz.
      const isConfirmed = window.confirm("Silmek isteyirsiniz?");
    
      if (isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:3001/delete/${id}`);
          console.log(response);
          // Silme başarılı olduğunda yeniden getirme işlemini gerçekleştirir.
          getFetch();
        } catch (error) {
          console.error("Silme emeliyyati başarısız oldu:", error);
        }
      } else {
        console.log("Silme emeliyyati legv edildi.");
      }
    };

  return (
    <>
    
    <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
        <div className='w-50 bg-white shadow-sm border border-3 rounded p-3'>
          <div className='d-flex justify-content-between'>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create +</button>
        <input 
        className='rounded p-2' 
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleInputChange}
      />
          </div>  
        

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Task</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

    
    <form onSubmit={Submit}>
    <div class="form-group p-2">
    <label for="exampleFormControlInput1">Name</label>
    <input type="name" onChange={(e)=>setName(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder="Write name..."/>
    </div>
    <div class="form-group p-2">
    <label for="exampleFormControlInput2">Description</label>
    <input type="text" onChange={(e)=>setDescription(e.target.value)} class="form-control" id="exampleFormControlInput2" placeholder="Write description..."/>
    </div>
    <div class="form-group p-2">
    <label for="exampleFormControlInput3">Expire-date</label>
    <input type="date" onChange={(e)=>setDate(e.target.value)} class="form-control" id="exampleFormControlInput3" placeholder="Write description..."/>
    </div> 
      <div class="modal-footer">
        <button  class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  class="btn btn-primary" data-bs-dismiss="modal">Save</button>
      </div>
    </form>
    
      </div>
     
    </div>
  </div>
</div>
    <div>
    </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Expire Date</th>
                        <th>Action</th>
                    </tr>
                </thead>  
                <tbody >
                    {
                    tableData.map((user)=>{
                    return  <tr>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td>{user.date}</td>
                                <td>
                                <button type="button" onClick={()=>getFetchByid(user?._id)} class="btn btn-dark mx-2  " data-bs-toggle="modal" data-bs-target="#exampleModal2">Update</button>
                                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                  <div class="modal-dialog ">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel2">Update Task</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                    <form>
                                    <div class="form-group p-2">
                                    <label for="exampleFormControlInput4">Name</label>
                                    <input type="name" class="form-control" onChange={(e)=>setByuser({...byuser,name:e.target.value})} value={byuser?.name} id="exampleFormControlInput4" placeholder="Write name..."/>
                                    </div>
                                    <div class="form-group p-2">
                                    <label for="exampleFormControlInput5">Description</label>
                                    <input type="text" class="form-control" onChange={(e)=>setByuser({...byuser,description:e.target.value})} value={byuser?.description} id="exampleFormControlInput5" placeholder="Write description..."/>
                                    </div>
                                    <div class="form-group p-2">
                                    <label for="exampleFormControlInput6">Expire-date</label>
                                    <input type="date" class="form-control" onChange={(e)=>setByuser({...byuser,date:e.target.value})} value={byuser?.date} id="exampleFormControlInput6" placeholder="name@example.com"/>
                                    </div>
                                    </form>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" onClick={()=>updateUser(byuser)} data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <button  type="button" onClick={()=>handleDelete(user?._id)} class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal3" >Delete</button>
                                  {/* <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                                    <div class="modal-dialog ">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel3">Delete Task</h5>
                                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                          <p>Are you sure you want to delete?</p>
                                        </div>
                                        <div class="modal-footer">
                                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                          <button type="button" data-bs-dismiss="modal" class="btn btn-danger">Delete</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div> */}
                                </td>
                            </tr>           
                        })
                    }
                </tbody>
            </table>
        </div>

    </div>
    </> 
  )
}

export default AllUsers