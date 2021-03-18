import React from 'react';
import './Projects.css';
//import Header from '../../components/header'
import TextAdventure from './TextAdventure/TextAdventure'
import FamilyFeud from './FamilyFeud/FamilyFeud'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



function Projects() {

    return (
            <div className="container">
                <div className="title">
                    <p>Projects</p>
                </div>

{/*                 <div className="cards">

                <Router>

                <Link to="/Projects/TextAdventure" class="link">
                    <div className="card1">
                        <h2>Caverns of Algaroth - A Text-Based Adventure</h2>
                        <p>Text Adventure</p>
                    </div>
                </Link>


                    <Switch>
                        <Route path="/Projects/TextAdventure">
                            <TextAdventure />
                        </Route>
                    </Switch>

                </Router>



                </div> */}

                <Router>

                    <div className="link">

                        <Link to="/Projects/TextAdventure" class="link">Caverns of Algaroth - A Text-Based Adventure</Link>
                        <Link to="/Projects/FamilyFeud" class="link">Family Feud</Link>

                    </div>


                    <Switch>
                        <Route path="/Projects/TextAdventure" exact>
                            <TextAdventure />
                        </Route>
                        <Route path="/Projects/FamilyFeud" exact>
                            <FamilyFeud />
                        </Route>
                    </Switch>

                </Router>

            </div>



    );
}

export default Projects;