import React from 'react';
import './App.css';
let marked = require('marked');

export default class App extends React.Component {
  //state should always inside the constructor
  //constructor are only used to initialize local state by assigning an object to this.state and for binding evnt handler methods to an instance.

  constructor(props) {
    super(props)
    this.state = {
      markdown: placeholder,
    }
    marked.setOptions({
      breaks: true
    });
  }

  updateMarkdown(markdown) {
    this.setState({ markdown });
  }
  
  render() {
    return (
      <>
        <h1>markdown previewer</h1>
        <div className="cont">
          <p>Editor</p>
          <div id="top">
            <textarea id="editor" rows="10" value={this.state.markdown} onChange={(e) => { this.updateMarkdown(e.target.value) }}></textarea>
          </div>
        </div>
        <div className="cont2">
          <p className="cont2p">Previewer</p>
          <div id="preview"
            dangerouslySetInnerHTML={{ __html: marked(this.state.markdown), }}>
          </div>
          <p className="by">by kygoskyrus</p>
        </div>
      </>
    );
  }
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://libormarko.github.io/), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://freesvg.org/img/1548182509.png)
`;
//dangerouslySetInnerHTML is react's replacement for innerhtml attribute
//marked function is to convert the input into marked









































/**
import './App.css';
import { useState } from 'react';
//import 'https://cdnjs.com/libraries/marked';
function App() {

  const [abc, setabc] = useState('');


  const onchange = (e) => {
    setabc(e.target.value);
  };


  return (
    <div className="app">
      <textarea id="editor" onChange={onchange}></textarea>

      <div id="preview">{abc}</div>

    </div>
  );
}

export default App;*/
//on every chhange made in the textrea input the onchnage variable will be changed which will run the function setabc and bcz the setabc is usestae so the abc will be updated whenever setabc changes