
export const ChatList = ({ chats }) => {
    const defaultImg = "https://media.istockphoto.com/id/1290658756/es/foto/hermosa-mujer-afro.jpg?s=1024x1024&w=is&k=20&c=C4zCeVaGEFlrSOf4NyQNCoxMsMQiyLhmzDvifPGUKQE=";
    return (
        <ul className="list-unstyled">
            {chats.map(chat => (
                <li key={chat.id} className="d-flex align-items-center mb-2 p-2 rounded" style={{ backgroundColor: "#f0f0f0" }}>
                    <img
                        src={chat.profileImage ? chat.profileImage : defaultImg}
                        alt={chat.userName}
                        className="rounded-circle"
                        style={{ width: "50px", height: "50px", marginRight: "1rem" }}
                    />
                    <span>{chat.userName}</span>
                </li>
            ))}
        </ul>
    )
}