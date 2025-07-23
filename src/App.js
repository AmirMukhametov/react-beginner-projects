import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const[users, setUsers] = useState([]);
  const[invites, setInvites] = useState([]);
  const[isLoading, setLoading] = useState(true);
  const[succes, setSucces] = useState(false);
  const[searchValue, setSearchValue] = useState('');
  useEffect(() => {
    fetch('https://reqres.in/api/users', {
      headers: {
        'x-api-key': 'reqres-free-v1'
      }
    })
      .then(res => res.json())
      .then(json => {
        setUsers(json.data)
      }).catch(err => {
        alert('Ошибка при получении пользователя')
      }).finally(() => setLoading(false))
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value)
  };

  const onClickInvite = (id) => {
    if(invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id != id))
    } else {
      setInvites((prev) => [...prev, id])
    }
  }

  const onClickSendInvite = () => {
    setSucces(true)
  }

  return (
    <div className="App">
      {
        succes ? (
          <Success count={invites.length}/> 
        ) : (
          <Users 
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue} 
          items={users} 
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvite={onClickSendInvite}
          />
        )
      }
    </div>
  );
}

export default App;
