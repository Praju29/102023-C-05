import React, { useState, useEffect } from 'react';

function App() {
  const [comments, setComments] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.slice(0, 10));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (filterText) {
      const filteredComments = comments.filter((comment) =>
        comment.body.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredComments(filteredComments);
    } else {
      setFilteredComments(comments);
    }
  }, [filterText, comments]);

  const filterComment = () => {
    const filteredComments = comments.filter((comment) =>
      comment.body.toLowerCase().includes('aliquam')
    );
    setFilteredComments(filteredComments);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const filterCommentInput = () => {
    setFilterText(userInput);
  };
  return (
    <div>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {filteredComments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.id}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        style={{
          height: 50,
          width: 500,
          marginLeft: 30,
          backgroundColor: 'skyblue',
          marginTop: 20,
        }}
        onClick={filterComment}
      >
        Filter
      </button>

      <h1>Filter based on input</h1>
      <input
        type="text"
        placeholder="Add something here"
        name="comm"
        onChange={handleInputChange}
        value={userInput}
      />
      <button
        style={{
          height: 50,
          width: 500,
          marginLeft: 30,
          backgroundColor: 'skyblue',
          marginTop: 20,
        }}
        onClick={filterCommentInput}
      >
        Filter based on input
      </button>
    </div>
  );
}

export default App;


