/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import axios from "axios";
import ConfirmationPopup from "../Modals/ConfirmationPopup";
import EditTaskPopup from "../Modals/EditTaskPopup";
import "./Taskbar.css";
import EditIcon from "../Assets/Svgs/edit.svg";
import DeleteIcon from "../Assets/Svgs/delete.svg";

const Taskbar = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [deleteAlertData, setdeleteAlertData] = useState({
    isOpen: false,
    id: null,
  });
  const [editModalData, seteditModalData] = useState({
    isOpen: false,
    id: null,
    task: "",
  });
  useEffect(() => {
    togettask();
  }, []);

  async function postTask() {
    if (!task?.trim()) {
      alert("Enter valid task");
      return;
    }
    try {
      await axios.post("http://localhost:3001/task", { task });
      togettask();
      setTask("");
    } catch (error) {
      console.log(error);
    }
  }

  async function togettask() {
    try {
      let result = await axios.get("http://localhost:3001/gettask");

      setTasks(result.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("finally");
    }
  }
  console.log(tasks);

  const deleteTask = async () => {
    const id = deleteAlertData.id;
    closeDeleteAlert();
    try {
      await axios.delete("http://localhost:3001/taskdelete/" + id);
      setTasks((preList) => [...preList].filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const closeEditModal = () => {
    seteditModalData({
      isOpen: false,
      id: null,
      task: "",
    });
  };

  const updateTask = async (editedTask) => {
    if (!editedTask?.trim()) {
      alert("Enter valid task");
      return;
    }
    const { id } = editModalData;
    closeEditModal();
    await axios.post("http://localhost:3001/taskupdate", {
      task: editedTask,
      _id: id,
    });
    setTasks((preList) => {
      let editedItemInd = [...preList].findIndex((item) => item._id === id);
      if (editedItemInd !== -1) {
        preList[editedItemInd] = {
          ...preList[editedItemInd],
          task: editedTask,
        };
      }
      return [...preList];
    });
  };

  const closeDeleteAlert = () => {
    setdeleteAlertData({
      isOpen: false,
      id: null,
    });
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">TODOs</h1>
        <div className="d-flex flex-column align-items-center">
          <textarea
            placeholder="Enter your task here"
            onChange={(e) => setTask(e.target.value)}
            className="form-control col-md-4 mb-3 text-box"
            rows="4"
            style={{ resize: "none" }}
          />
          <button className="btn btn-primary" type="button" onClick={postTask}>
            Enter Task
          </button>
        </div>
        <div className="mt-5 table-container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((e, i) => (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.task}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => {
                        seteditModalData({
                          isOpen: true,
                          id: e._id,
                          task: e.task,
                        });
                      }}
                    >
                      <img src={EditIcon} alt="Edit" />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => {
                        setdeleteAlertData({
                          isOpen: true,
                          id: e._id,
                        });
                      }}
                    >
                      <img src={DeleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deleteAlertData.isOpen && (
        <ConfirmationPopup
          show={deleteAlertData.isOpen}
          title={"Delete ToDo!"}
          content={"Are you sure to delete this todo?"}
          onClose={closeDeleteAlert}
          onSubmit={deleteTask}
        />
      )}
      {editModalData.isOpen && (
        <EditTaskPopup
          show={editModalData.isOpen}
          value={editModalData.task}
          title={"Edit Todo"}
          onSubmit={updateTask}
          onClose={closeEditModal}
        />
      )}
    </>
  );
};

export default Taskbar;
