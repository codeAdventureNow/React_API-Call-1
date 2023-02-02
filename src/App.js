import './App.css';
import { useState } from 'react';

function Card({ src, login, href, alt }) {
  return (
    <div className='user'>
      <img src={src} alt={alt} />
      <p>Login: {login}</p>
      <p>
        GitHub Profile:{' '}
        <a href={href} target='_blank'>
          {login}
        </a>
      </p>
    </div>
  );
}

export default function App() {
  //set user for API call
  const [user, setUser] = useState('');
  // for primary person we are searching
  const [person, setPerson] = useState({});
  //primary persons friends
  const [friends, setFriends] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetchData();
    fetchFriends();
  }

  const fetchData = async () => {
    const URL = `https://api.github.com/users/${user}`;
    if (!user) return;

    const result = await fetch(URL);
    result.json().then((json) => {
      setPerson(json);
    });
  };

  const fetchFriends = async () => {
    const URL = `https://api.github.com/users/${user}/followers`;
    if (!user) return;

    const result = await fetch(URL);
    result.json().then((json) => {
      setFriends(json);
    });
  };

  return (
    <div className='App'>
      <h1>
        Git <span className='friends'>Friends</span>
      </h1>
      <div className='button'>
        <form onSubmit={handleSubmit}>
          <div className='button'>
            <button type='submit' id='fetchdata'>
              Search
            </button>
          </div>
          <input
            className='inputContainer'
            placeholder='   Enter Git Hub Name'
            value={user}
            onChange={(e) => setUser(e.target.value)}
          ></input>
        </form>
      </div>
      {person.login && (
        <div id='app'>
          {/* <div className='user'>
            <img src={person.avatar_url} alt={person.name} />
            <p>Login: {person.login}</p>
            <p>
              GitHub Profile:{' '}
              <a href={person.html_url} target='_blank'>
                {person.login}
              </a>
            </p>
          </div> */}
          <Card
            src={person.avatar_url}
            alt={person.name}
            login={person.login}
            href={person.html_url}
          />
          {friends.map((friend) => (
            <div className='user' key={friend.id}>
              <img src={friend.avatar_url} alt={friend.login} />
              <p>Login: {friend.login}</p>
              <p>
                GitHub Profile:{' '}
                <a href={friend.html_url} target='_blank'>
                  {friend.login}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
