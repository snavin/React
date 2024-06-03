import React,{useState} from 'react'

export default function TextForm(props) {
    const [text,setText] = useState("Enter text here");
    //const [java,setText] = useState("Enter text here");
    //const text = {java: "hi", pthon:"hello I am"};
    //setText("Updated text");

    const handleUppClick = ()=>
    {
        console.log("UpperCase was clicked" +  text);
        let newText = text.toUpperCase()
        //setText("You have clicked the handleUppClick");
        setText(newText);
        props.showAlert("Converted to Upper case","success");
    }

    const changeText = (event)=>
    {
        console.log("ChangeText was clicked");
        setText(event.target.value)
    }

    const handleCopy = ()=>{
        console.log("I am copy");
        var text=document.getElementById("myBox");
        text.select();
        text.setSelectionRange(0,9999);
        navigator.clipboard.writeText(text.value);
    }

  return (
    <>
    <div className="container" style={{color:props.mode === "dark" ? "white" : "black"}}>
    <h1 className="mx-3"> {props.heading}</h1>
        <div className="mb-3">
        
        {/* <label for="myBox" class="form-label">Example textarea</label> */}
        <textarea className="form-control mx-3" value={text} style={{backgroundColor:props.mode === "dark" ? "grey" : "white",
        color:props.mode === "dark" ? "white" : "black"}}
         onChange={changeText} id="myBox" rows="8"></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUppClick}>Convert to UpperCase</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
    </div>

    <div className="container mx-3" style={{color:props.mode === "light" ? "grey" : "white"}}>
        <h1>Your text summary</h1>
        <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} words and {text.length} characters</p>
        <p>Time for the words {0.008 * text.split(" ").length}</p>
    </div>
    </>
  )
}
