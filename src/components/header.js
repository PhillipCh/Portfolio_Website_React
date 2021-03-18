import React from 'react';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';
import TextAdventure from '../pages/Projects/TextAdventure/TextAdventure';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends React.Component{
  render() {
    return (
      <fragment>
    <Router>
 
      <div className="nav-bar">

              <Link to="/About">About Me</Link>
              <Link to="/Projects">Projects</Link>
              <Link to="/Contact">Contact</Link>



        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      </div>

      <Switch>
          <Route path="/Projects">
            <Projects />
          </Route>
          <Route path="/Contact">
            <Contact />
          </Route>
          <Route path="/Projects/TextAdventure">
            <TextAdventure />
          </Route>
          <Route path="/">
            <About />
          </Route>
        </Switch>

    </Router>
    </fragment>
    );
  }

}


export default Header;