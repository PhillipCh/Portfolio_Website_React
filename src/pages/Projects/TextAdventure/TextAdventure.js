import React, {useState, useEffect} from 'react';
import './TextAdventure.css';
import { waitForElementToBeRemoved } from '@testing-library/react';

/*
Text-based adventure game using React and JS.
*/

//Initialise oldRoom variable for previous room
var oldRoom = '';

//Array of objects, with each object having key-value pairs e.g. key: 'id', value: 'help'
const scenes = [
    {
        id: "help",
        text: "List of commands:\
        \n\nnorth/south/east/west\
        \nUse [item]\
        \n\nSometimes on your journey, 'using' an item will be beneficial to you.\
        \n\nType 'exit' to return\
        ",
        direction: []
    },
    {
        id: "The Caverns of Algaroth",
        text: "[The Caverns of Algaroth]\
        \n\nYou are an adventurer.\
        \n\nIn order to save your sister from a fatal illness, you've scoured the land in search for a cure.\
        \n\nYour search has lead here, to The Caverns of Algaroth, rumours are that an ancient civilisation ended here and that they had the power to cure any ailment.\
        \n\n Type commands below and press Enter on your keyboard to interact with the world, typing 'help' will bring up the help menu at any time during your journey.\
        \n\n Type 'start' to begin.\
        ",
        direction: [{direction: "start", name: "Entrance"}]
    },
    {
        id: "Entrance",
        text: "As you enter the cave, clasping the handle of your sword at your waist, your eyes begin to adjust to the darkness, as suddenly the ground rumbles and the cave entrance starts to close ominiously behind you. You think you may see a faint light up north.\
        \n\nIt's dark in here, maybe you can use the torch you brought with you?\
        ",
        direction: [{direction: "south", name: "The Caverns of Algaroth"}, {direction: "north", name: "Antechamber"}, {direction: "torch", name: "Torch used"}]

    },
    {
        id: "Dark End",
        text: "As you fumble around in the darkness, you manage to trip over your feet and fall upon your sword.\
        \n\nAs your life blood seeps upon the ground, you regret your choices.\
        \n\n---\
        \n\nBAD END\
        \n\n---\
        \n\nType 'restart' to restart your journey.\
        ",
        direction: [{direction: "restart", name: "The Caverns of Algaroth"}]
    },
    {
        id: "Torch used",
        text: "As you pull out your torch from your pack and light it you are welcomed to the sight of a small rectangular chamber, a doorway lies to the north.",
        direction: [{direction: "south", name: "The Caverns of Algaroth"}, {direction: "north", name: "Antechamber"}]
    },
    {
        id: "Antechamber",
        text: "You walk into a large open chamber, as your foot passes the threshold of this room braziers along the side of the walls erupt with magical blue fire.\
        \n\nTo to north is a large set of double doors with the motif of a scowling demon on it.\
        \
        ",
        direction: [{direction: "south", name: "Entrance"}, {direction: "north", name: "Throne Room"}]
    },
    {
        id: "Throne Room",
        text: "As you push open the double doors, you are met with the shadowed figure of a frail man sitting upon a golden throne. He wears an old crown upon his head but is draped in black chains.\
        \n\nAs the shadowed figure raises his head, a thin voice echoes out into the chamber 'Welcome Traveller...to this place forgotten to time. My apologies that I could not be more...acommodating.'\
        \n\n'You are the first visitor since I was...cursed to remain chained upon my throne. Please...release me from these chains.'\
        \n\n'Yes' or 'No'\
        ",
        direction: [{direction: "yes", name: "Throne Room Yes"}]
    },
    {
        id: "Throne Room Yes",
        text: "\
        \n\nAs the last chain is freed from the man, a dark smirk appears on his face. \
        \n\n'My thanks for freeing me at last! It's been over 1000 years since my servants betrayed me and chained me to my throne in their foolish attempt to save this world. \
        \nHowever, because of you, I am now free to continue my conquest over this land.\
        \nAs thanks...I shall give you a swift death.\
        \n\n---\
        \n\nBAD END\
        \n\n---\
        \n\nType 'restart' to restart your journey.\
        ",
        direction: [{direction: 'restart', name: 'The Caverns of Algaroth'}]
    },
    {
        id: "Throne Room No",
        text: "Are you sure? I know what you came here for...free me and I can help heal your sister. \
        'Yes' or 'No'\
        ",
        direction: [{direction: "no", name: "Throne Room No No"}, {direction: "yes", name: "Throne Room Yes"}]
    
    },
    {
        id: "Throne Room No No",
        text: "So be it...then you're useless to me. This place shall be your grave, as it is mine.\
        \n\n---\
        \nBAD END\
        \n\n---\
        \n\nType 'restart' to restart your journey.",
        direction: [{direction: "restart", name: "The Caverns of Algaroth"}]

    },
    {
        id: "Throne Room Sword",
        text: "As you look upon the figure on the throne, you slowly unsheath your sword from your scabbard and walk towards him.\
        \n\n'I see. Mark my words, I shall return, for I am undying.'\
        \n\nAs you stab your sword into the chained figure, he goes limp upon the throne, however...there is no blood from the wound.\
        \n\nThe ground shakes underneath your feet! You hear the sound of rock grinding against rock the way you came in, and from the way behind the throne you hear the same and see a large entryway.\
        \n\nTo the south is the entrance to the throne room you came through, to the north is a narrow corridor onwards.\
        \n\nDo you 'continue' or 'retreat' from this adventure back to the safety outside?\
        ",
        direction: [{direction: "retreat", name: "Retreat"}, {direction: "continue", name: "To be continued..."}]
    },{
        id: "Retreat",
        text: "You flee from the Caverns, heart pumping from your encounter with that ancient being.\
        \n\nYou did not find a cure for your sister, but you leave with your life.\
        \n\n---\
        \nENDING #1: A FLIGHT FROM DEATH\
        \n\n---\
        \n\nType 'restart' to restart your journey.",
        direction: [{direction: "restart", name: "The Caverns of Algaroth"}]
    },{
        id:"To be continued...",
        text:"You decide to continue on your journey to find a cure for your sister...to be continued in a future update.\
        \n\n---\
        \n\nENDING #2: TO BE CONTINUED...\
        \n\n---\
        \n\nType 'restart' to restart your journey.",
        direction: [{direction: "restart", name: "The Caverns of Algaroth"}]
        
    }
]


//Function to return room based on input sceneName if scene id found.
function showRoom (sceneName){
    var currentSceneIndex = scenes.findIndex(scene => scene.id === sceneName)
    var shownText = ''
    var directions = ''
    var i;

    if(currentSceneIndex != -1){

    return scenes[currentSceneIndex].text;

    } else {
        return;
    }
}



const Inventory = ({items}) => (
        <div>
            <p>---</p>
            <p>
                Inventory: {items}
            </p>
        </div>
)



class TextAdventureClass extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: '',
            input: '',
            currentScene: 'The Caverns of Algaroth',
            inventory: 'torch, sword',
            torchLit: 'No'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        showRoom = showRoom.bind(this);
    }


handleChange(event){
    this.setState({value: event.target.value});
}

handleSubmit(event){
    this.setState({
        input: this.state.value,
    }, () => {this.output() });
    this.setState({value: ''});
    event.preventDefault();
}

returnInput(){
    return this.state.input
}

output = () => {

    //console.log("output reached")

    var splitWords = this.state.input.split(' ');
    var firstWord = '';
    var secondWord = '';
    var currentSceneIndex = scenes.findIndex(room => room.id === this.state.currentScene)
    var directionIndex = 0;
    var nextScene = '';
    var commandArray = ['north', 'south', 'east', 'west', 'start', 'restart', 'yes', 'no', 'go further', 'retreat'];

    firstWord = splitWords[0].toLowerCase();

    if (splitWords.length > 1){

        secondWord = splitWords[1].toLowerCase();
        console.log(secondWord)
    }


    directionIndex = scenes[currentSceneIndex].direction.findIndex(direction => direction.direction === firstWord)

    if(this.state.currentScene != 'help'){

        oldRoom = this.state.currentScene

    }


    if(commandArray.includes(firstWord))
    {
        if(directionIndex != -1){

            if(this.state.currentScene != 'The Caverns of Algaroth' && this.state.torchLit === 'No' && firstWord != 'restart') {

                this.setState({currentScene: "Dark End"})
 
            } else {

            nextScene = scenes[currentSceneIndex].direction[directionIndex].name
            this.setState({currentScene: nextScene});

            }

        } else {

            //skip

        }

    } else if (firstWord === 'use') {

        if(secondWord === 'torch' && this.state.currentScene === 'Entrance'){

            nextScene = "Torch used"
            this.setState({torchLit: 'Yes'})
            this.setState({currentScene: nextScene});
    
        } else if (secondWord === 'sword' && this.state.currentScene === 'Throne Room'){
    
                nextScene = "Throne Room Sword"
                this.setState({currentScene: nextScene});
    
        } else {
            //skip
        }

    } else if (firstWord === 'help'){
        
        this.setState({currentScene: 'help'})

    } else if (this.state.currentScene === 'help' && firstWord === 'exit'){

        this.setState({currentScene: oldRoom})

    } else if(firstWord === 'continue' && this.state.currentScene === 'Throne Room Sword'){

        this.setState({currentScene: 'To be continued...'})

    }
}

render() {

    const inventory = {
        items: this.state.inventory
    }

    return (
        // <fragment>
            <div className = "textAdventurecontainer">
                <div className ="game">
                    <p>
                        {showRoom(this.state.currentScene)}
                        <Inventory {...inventory} />
                    </p>
                </div>
                <div className="game-input">
                        <form onSubmit={this.handleSubmit}>
                            <label>

                                <input type="text" value={this.state.value} onChange={this.handleChange} />      

                            </label>
                        </form>
                    </div>

            </div>



        // </fragment>

    
    );

    }
}
  
export default TextAdventureClass;