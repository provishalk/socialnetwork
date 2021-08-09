
import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.css';
import alertify from 'alertifyjs';
import { BrowserRouter, Route } from "react-router-dom";
import Activate from "./containers/Activate/Activate";
import SignUp from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";


alertify.set('notifier', 'position', 'top-right');
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/activate" exact component={Activate} />
      </BrowserRouter>
    </>
  );
}

export default App;
