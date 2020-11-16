import React, {useState, useEffect} from 'react';
import axios from  'axios';

// Lots of help for setting up search from this guide: https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg

const initialState = [{"id":1,"name":"Cycling","type":"Cardio","date":"Wednesday","duration":"1 hour","intensity":"Difficult","location":"54526 Crooks Vista","numberOfRegisteredAttendees":"99500","maxClassSize":51345}]

export const ClientPage = () => {

    const [classes, setClasses] = useState([])

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [selectValue, setSelectValue] = useState('name')

    const people = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin"
      ];


    

    useEffect(() => {

        // Retrieving the data from the server
        axios
            .get('https://anywhere-fitness-tt-webpt-88.herokuapp.com/classes')
            .then(res => {
                console.log(res.data)
                setClasses(res.data)
                
            })
            .catch(error => {
                console.log(error)
            })
        
        const results = people.filter(elem => elem.toLowerCase().includes(searchTerm.toLowerCase()))
        
       
        const resultsTwo = classes.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase()))

        const str = JSON.stringify(resultsTwo);
        console.log(`Results Two: ${str}`)
        

        setSearchResults(resultsTwo)

        if (selectValue === "name") {
            const resultsTwo = classes.filter(elem => elem.name.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        } else {
            const resultsTwo = classes.filter(elem => elem.intensity.toLowerCase().includes(searchTerm.toLowerCase()))
            setSearchResults(resultsTwo)
        }


    },[searchTerm])

    const handleChange = e => {

        setSearchTerm(e.target.value)
    }

    const handleSelectChange = e => {
        
        setSelectValue(e.target.value)
        console.log(selectValue)
    }

    const handleSelectSubmit = e => {
        console.log(selectValue)
        e.preventDefault()
    }
    

    return (

        // Creating a very rudimentary search bar

        <div>

        {classes.map(elem => {
            return (<div id={elem.id}>{elem.name}</div> )
        })}

    
        
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            >
            </input>
        
            <ul>
                {searchResults.map(item => {
                    {console.log(`This should show up: ${item}`)}
                    return (<p id={item.id}>{item.name} {item.date} {item.duration} {item.intensity} {item.location} {item.maxClassSize} {item.numberOfRegisteredAttendees} {item.type}</p>)
                })}
            </ul>

            <form onSubmit={handleSelectSubmit}>
            <select value={selectValue} onChange={handleSelectChange}>
                <option value="name">Name</option>
                <option value="intensity">Intensity</option>
            </select>
            <input type="submit" value="Submit" />
            </form >
 

          
            </div>
    )
}