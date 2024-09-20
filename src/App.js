import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './Components/Landing';
import {Main} from './Components/Main'
import { NotFoundPage } from './Components/PageDoesntExist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element = {<Landing />}/>
          <Route path = "/home" element = {<Main />}/>
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
