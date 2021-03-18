import React from 'react';
import './About.css';
import profile from '../../images/profile-image.png'

function about() {
    return (
          <fragment>
            <div className="header">
                  <p>About Me</p>
            </div>
            <div className='content'>
                  <img src = {profile}/>
                  <p class="hi">Hi :)</p>
                  <p class="p1">I'm Phillip, a developer from Belfast.</p>
            </div>
            </fragment>
    );
  }
  
  export default about;
  