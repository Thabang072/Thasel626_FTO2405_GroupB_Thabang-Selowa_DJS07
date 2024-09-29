import React from "react"

// The Meme component handles generating a random meme image with custom top and bottom text.
export default function Meme() {
    // State to hold the current meme data (topText, bottomText, randomImage).
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" // Initial image to display
    })
    
    // State to hold all memes fetched from the API.
    const [allMemes, setAllMemes] = React.useState([])
    
    // Fetching the meme data from the Imgflip API when the component first mounts.
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json()) // Convert the response to JSON
            .then(data => setAllMemes(data.data.memes)) // Update state with the fetched memes
    }, []) // Empty dependency array ensures this runs only once after the initial render.
    
    // Function to select a random meme image from the fetched memes.
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length) // Get a random index
        const url = allMemes[randomNumber].url // Get the URL of the random meme
        setMeme(prevMeme => ({
            ...prevMeme, // Keep the previous meme text, only change the image
            randomImage: url
        }))
    }
    
    // Function to handle changes in the input fields for top and bottom text.
    function handleChange(event) {
        const { name, value } = event.target // Get the input field name and value
        setMeme(prevMeme => ({
            ...prevMeme, // Keep other properties unchanged
            [name]: value // Update the appropriate text field
        }))
    }
    
    return (
        <main>
            {/* Input form for top and bottom text */}
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText" // Name matches the state property for top text
                    value={meme.topText} // Controlled input
                    onChange={handleChange} // Update state on input change
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText" // Name matches the state property for bottom text
                    value={meme.bottomText} // Controlled input
                    onChange={handleChange} // Update state on input change
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage} // Fetch a new random meme image when clicked
                >
                    Get a new meme image 🖼
                </button>
            </div>

            {/* Display the meme with the selected image and texts */}
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" alt="Meme" /> 
                <h2 className="meme--text top">{meme.topText}</h2> 
                <h2 className="meme--text bottom">{meme.bottomText}</h2> {/* Bottom text overlay */}
            </div>
        </main>
    )
}
