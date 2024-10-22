import './index.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col flex-grow">
          <Header />
        </div>
      </div>
    </>
  );
}

export default App;