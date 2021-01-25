import './App.css';
import { Container } from 'reactstrap';
import AppForm from './components/AppForm';
import AppNavbar1 from './components/AppNavbar1';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <AppNavbar1 />
      <Container>
        <AppForm />
      </Container>
    </div>
  );
}

export default App;
