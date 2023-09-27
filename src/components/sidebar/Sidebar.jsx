import Navbar from "../navbar/Navbar"
import Search from "../../components/search/Search"
import Chats from "../chats/Chats"
import "./sidebar.scss"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default Sidebar