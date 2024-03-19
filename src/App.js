
import './App.scss';
import { useState } from 'react';
import { marked } from 'marked';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faMaximize } from '@fortawesome/free-solid-svg-icons';
import { faMinimize } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'

//default Markdown text input from FCC
const defaultMarkdownText = `# Welcome to my React Markdown Previewer!

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

There's also [links](https://www.freecodecamp.org), and
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


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

const useToggleVisibility = (initialVisibility = true) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return [isVisible, toggle];
};


function App() {
  const [markdownText, setMarkdownText] = useState(defaultMarkdownText);
  const [editorVisible, setEditorVisible] = useToggleVisibility(true);
  const [previewerVisible, setPreviewerVisible] = useToggleVisibility(true);

  marked.setOptions({
    breaks: true
  })

  const editorStyle = {
    minHeight: previewerVisible ? '200px' : '100vh'
  };
  return (
    <div className='App'>
      <div className="App-body p-3">
        {editorVisible && (
          <Container style={editorStyle} className="editorContainer w-50 container-fluid shadow-sm rounded p-0 border border-dark rounded-0">
            <div className='toolBar'>
              <div className="border-bottom border-dark d-flex justify-content-between">
                <div className='editorText'>
                  <FontAwesomeIcon icon={faClipboard} className='faClipBoard pt-2'/>
                  <label htmlFor="editor">
                    Editor
                  </label>
                </div>
                  <a href="#!" onClick={setPreviewerVisible} aria-label="Click me">
                  {previewerVisible ? <FontAwesomeIcon icon={faMaximize} className='faMaximize'/>:
                                    <FontAwesomeIcon icon={faMinimize} className='faMinimize'/>}
                  </a>
              </div>
            </div>
            <textarea style={editorStyle} id="editor" value={markdownText} onChange={(event) => setMarkdownText(event.target.value)}>

            </textarea>
          </Container>
          )}

          {previewerVisible && (
            <Container className="previewercontainer container-fluid shadow-sm rounded mt-5 p-0 border border-dark rounded-0">
            <div className='toolBar'>
              <div className="border-bottom border-dark d-flex justify-content-between">
                <div className='editorText'>
                  <FontAwesomeIcon icon={faClipboard} className='faClipBoard pt-2'/>
                  Previewer
                </div>
                  <a href="#!" onClick={setEditorVisible} aria-label="Click me">
                    {editorVisible ? <FontAwesomeIcon icon={faMaximize} className='faMaximize'/>:
                                    <FontAwesomeIcon icon={faMinimize} className='faMinimize'/>}
                  </a>
              </div>
            </div>
            <div id="preview" className='previewer' dangerouslySetInnerHTML={{
              __html:marked(markdownText)
            }}>
              
            </div>
          </Container>
        )};
      </div>
    </div>
  );
}

export default App;
