import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import "./todo.css";
const Todo = () => {
  // STATE to show data in the list
  const [list, setList] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  //to store edit data or items index
  const [editItem, setEditItem] = useState(0);
  //For edit data to store and for saveHandler
  //data edit hudaixa hai vanna lai garya ho
  const [isEditing, setIsEditing] = useState(false)
  const onSubmit = (data) => {
      let finalData = {...data, isCompleted:false}
    let currentList = [...list, finalData];
    setList(currentList);
    reset();
  };
  //delete Function
  const deleteHandle = (index) => {
    let currentInput = [...list];
    currentInput.splice(index, 1);
    setList(currentInput);
  };
  //edit button function
  const editHandler = (index, e) => {
    e.preventDefault();
    let currentList = [...list];
    let toEdit = currentList[index];
    setValue("text", toEdit.text);
    // console.log(list);
    setEditItem(index);
    setIsEditing(true)
  };
  //Reading the localstorage data using getItem
useEffect(()=>{
let currentData = [...list]
//every time when we refresh/reload the page the empty array popup to avoid that we use condition
if(currentData!==null){
    currentData = localStorage.getItem("list")
    currentData = JSON.parse(currentData)
     setList(currentData)
}
},[])
//Saving the form data using SETITEM method to localstorage
useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
},[list])

//Save or update button handler
const updateHandler=(data)=>{
let currentEditData = [...list]
let indItem = currentEditData[editItem]
let finalData = {...indItem, text : data.text}
// let finalData = {...data,isCompleted : currentEditData[editItem].isCompleted}
currentEditData[editItem]= finalData
setList(currentEditData)
setIsEditing(false)
reset()
}
const completeHandler=(index)=>{
let currentData = [...list]
console.log(currentData[index])
currentData[index].isCompleted =  !currentData[index].isCompleted
setList(currentData)

}
  
  return (
    <div className="formData">
      <form onSubmit={isEditing?handleSubmit(updateHandler):handleSubmit(onSubmit)}>
        <input
          className="inputField"
          type="text"
          placeholder="Enter Item"
          required
          {...register("text")}
        />
        <input type="submit" className="button" value={isEditing?"Update":"Add"} />
      </form>
      <br />
      {/* diplay area for input data */}
      <div className="inputData">
            
            
        {list.map((data, index) => {
          return (
            <div key={index}>
            <input type="checkbox" checked={data.isCompleted}  onClick={()=>completeHandler(index)}/>
              {data.text}
              <button className="delete" onClick={() => deleteHandle(index)}>
                {" "}
                <FaRegTrashAlt />{" "}
              </button>
              <button onClick={(e) => editHandler(index, e)} className="edit">
                {" "}
                <FaEdit />{" "}
              </button>
            </div>
          );
        })}
       
    
      </div>
    </div>
  );
};
export default Todo;
