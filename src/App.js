import Registration from "./pages/Registration/Registration";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'alertifyjs/build/css/alertify.css';
import alertify from 'alertifyjs';
alertify.set('notifier','position', 'top-right');
const App = () =>{
  return (
    <>
      <Registration/>
    </>
  );
}

export default App;
