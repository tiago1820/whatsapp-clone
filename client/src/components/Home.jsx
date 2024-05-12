
import { useEffect, useState } from "react"
import { Navbar } from "./Navbar"
import { useNavigate } from "react-router-dom";
import { ChatList } from "./ChatList";
import axios from "axios";

export const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);

  console.log("chats: ", chats);

  const getAllChats = async (user) => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/chat/all", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setChats(data.users);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }
    setUser(user);
    getAllChats(user);

  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid bg-secondary">
        <div className="d-flex align-items-center">
          <img
            src="https://media.istockphoto.com/id/1290658756/es/foto/hermosa-mujer-afro.jpg?s=1024x1024&w=is&k=20&c=C4zCeVaGEFlrSOf4NyQNCoxMsMQiyLhmzDvifPGUKQE="
            alt=""
            style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
          />
          <h4 className="text-light">My Chats</h4>
        </div>
      </div>
      <ChatList chats={chats} />


    </div>
  )
}
