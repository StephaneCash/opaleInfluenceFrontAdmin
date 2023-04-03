import RoutesFree from './routes/RoutesFree';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import 'react-circular-progressbar/dist/styles.css'

function App() {
  return (
    <>
      <RoutesFree />
      <ToastContainer />
    </>
  );
}

export default App;
