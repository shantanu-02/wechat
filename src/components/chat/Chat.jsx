import "./chat.scss"
import cam from "../../../public/img/cam.png"
import add from "../../../public/img/add.png"
import more from "../../../public/img/more.png"
import Messages from "../messages/Messages"
import Input from "../input/Input"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <img src={cam}/>
        <img src={add}/>
        <img src={more}/>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat