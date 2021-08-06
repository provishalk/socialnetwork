 import SignUp from "./containers/Registration/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.css';
import alertify from 'alertifyjs';
import { BrowserRouter, Route } from "react-router-dom";


alertify.set('notifier','position', 'top-right');
const App = () =>{
  return (
    <>
      <BrowserRouter>
        <Route path="/socialnetwork/login" exact component={SignUp} />
      </BrowserRouter>
    </>
  );
}

export default App;
