import './App.css'
import Header from './components/Header'
import Content from './components/Content'

function App() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-grow">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App
