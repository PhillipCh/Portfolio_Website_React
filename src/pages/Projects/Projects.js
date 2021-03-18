import React from 'react';
import './Projects.css';
//import Header from '../../components/header'
import TextAdventure from './TextAdventure/TextAdventure'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



function Projects() {

    return (
        <fragment>
                <div className="header">
                <p>Projects</p>
                </div>
                <Router>

                    <div className="link">

                            <Link to="/Projects/TextAdventure" class="link">Caverns of Algaroth - A Text-Based Adventure</Link>
                    </div>

                    <Switch>
                        <Route path="/Projects/TextAdventure">
                        <TextAdventure />
                        </Route>
                    </Switch>

                </Router>
        </fragment>
    );
}
  
export default Projects;