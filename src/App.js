const initialFriends = [
  {
    id: 118836,
    name: "Groot",
    image: "https://th.bing.com/th/id/OIP.l6ExHkrN4SE-v2Ap8PSMUQHaHa?rs=1&pid=ImgDetMain",
    balance: -7,
  },
  {
    id: 933372,
    name: "Gamora",
    image: "https://th.bing.com/th/id/OIP.4fZR_ioMxGXVmr1bNYVg0QHaGc?rs=1&pid=ImgDetMain",
    balance: 20,
  },
  {
    id: 499476,
    name: "Quill",
    image: "https://th.bing.com/th/id/OIP.V4qb2cLkFd64Fs6GEl8VWgHaHa?rs=1&pid=ImgDetMain",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList/>
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id}></Friend>
      ))}
    </ul>
  )
}

function Friend({friend}) {
  return <li>
    <img src={friend.image} alt={friend.name}/>
    <h3>{friend.name}</h3>
    {friend.balance < 0 && <p className="red">You owe {friend.name} {Math.abs(friend.balance)} VND</p>}
    {friend.balance > 0 && <p className="green">{friend.name} owes you {Math.abs(friend.balance)} VND</p>}
    {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
    <button className="button">Select</button>
  </li>
}

export default App;
