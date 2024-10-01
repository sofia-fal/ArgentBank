import React from 'react';
import '../style/user.css';

function User() {
  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        Tony Jarvis!
      </h1>
      <button className="edit-button">Edit Name</button>

      <div>
        <h1>Edit user info</h1>
        <form>
          <div className="edit-input">
            <label htmlFor="username">User name:</label>
            <input type="text" id="username" defaultValue="Username" />
          </div>
          <div className="edit-input">
            <label htmlFor="first-name">First name:</label>
            <input
              type="text"
              id="first-name"
              defaultValue="First name"
              disabled={true}
            />
          </div>
          <div className="edit-input">
            <label htmlFor="last-name">Last name:</label>
            <input
              type="text"
              id="last-name"
              defaultValue="Last name"
              disabled={true}
            />
          </div>

          <div className='edit-form-buttons'>
            <button className='edit-button'>Save</button>
            <button className='edit-button'>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;
