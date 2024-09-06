import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Groot",
    image:
      "https://th.bing.com/th/id/OIP.l6ExHkrN4SE-v2Ap8PSMUQHaHa?rs=1&pid=ImgDetMain",
    balance: -7,
  },
  {
    id: 933372,
    name: "Gamora",
    image:
      "https://th.bing.com/th/id/OIP.4fZR_ioMxGXVmr1bNYVg0QHaGc?rs=1&pid=ImgDetMain",
    balance: 20,
  },
  {
    id: 499476,
    name: "Quill",
    image:
      "https://th.bing.com/th/id/OIP.V4qb2cLkFd64Fs6GEl8VWgHaHa?rs=1&pid=ImgDetMain",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setShowAddFriend(false);
    console.table(friends);
  }

  function handleSelectFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((current_selected) =>
      current_selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={() => setShowAddFriend((show) => !show)}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, onSelectFriend, selectedFriend }) {
  // const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : "friend"}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} VND
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)} VND
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button
        onClick={function () {
          onSelectFriend(friend);
        }}
      >
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(
    "https://th.bing.com/th/id/R.58f306a725744f6c292b31b6529e7d1e?rik=LvCQA6pPBcCEMw&riu=http%3a%2f%2fimage.slidesharecdn.com%2fposter-randomavatars3-140426144729-phpapp01%2f95%2fposter-random-avatars-3-1-638.jpg%3fcb%3d1398523665&ehk=TeZnxvUZyYdqKDDuNuITJjZj1v3kzegw%2fKibZZqLtGM%3d&risl=&pid=ImgRaw&r=0"
  );

  function handeSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID().toString();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id: id,
    };

    setName("");
    setImage(
      "https://th.bing.com/th/id/R.58f306a725744f6c292b31b6529e7d1e?rik=LvCQA6pPBcCEMw&riu=http%3a%2f%2fimage.slidesharecdn.com%2fposter-randomavatars3-140426144729-phpapp01%2f95%2fposter-random-avatars-3-1-638.jpg%3fcb%3d1398523665&ehk=TeZnxvUZyYdqKDDuNuITJjZj1v3kzegw%2fKibZZqLtGM%3d&risl=&pid=ImgRaw&r=0"
    );

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handeSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label> Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💲 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>

      <label>🙎‍♂️ Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser :
            Number(e.target.value)
          )
        }
      />

      <label>🧙🏼‍♀️ {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend}></input>

      <label>💁🏼‍♂️ Who is paying the bill? </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}

export default App;
