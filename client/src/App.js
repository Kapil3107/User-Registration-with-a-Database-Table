import './App.css';
import { Container } from 'reactstrap';
import AppForm from './components/AppForm';
import AppNavbar_1 from './components/AppNavbar_1';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <AppNavbar_1 />
      <Container>
        <AppForm />
      </Container>
    </div>
  );
}

export default App;
