import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import "./todo.css";
const Todo = () => {
  // STATE to show data in the list
  const [list, setList] = useState([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  //to store edit data or items index
  const [editItem, setEditItem] = useState();
  const onSubmit = (data) => {
    let currentList = [...list, data];
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
    console.log(list);
    setEditItem(index);
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
  
  return (
    <div className="formData">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="inputField"
          type="text"
          placeholder="Enter Item"
          required
          {...register("text")}
        />
        <input type="submit" className="button" value={"Add"} />
      </form>
      <br />
      {/* diplay area for input data */}
      <div className="inputData">
        {list.map((data, index) => {
          return (
            <div key={index}>
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
