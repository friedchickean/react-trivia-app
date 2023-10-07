import './index.css';
import Nav from './components/Nav';
import QuizBox from './components/QuizBox'
import React from "react";


function App() {

  const [darkMode, setDarkMode] = React.useState(true);

  function toggleDarkMode() {
    setDarkMode(prevDarkMode => !prevDarkMode);
  }

  return (
    <div className="font-signika">
      <Nav />
      {/* body */}
      <div className='flex items-center justify-center'>
        <QuizBox />
      </div>
    </div>
  );
}

export default App;
