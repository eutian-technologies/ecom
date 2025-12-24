import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes'; // Import AnimatedRoutes
import { ShopContextProvider } from './context/ShopContext';

function App() {
    return (
        <div className="app-wrapper">
            <ShopContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <main style={{ minHeight: '80vh' }}>
                        <AnimatedRoutes />
                    </main>
                    <Footer />
                </BrowserRouter>
            </ShopContextProvider>
        </div>
    );
}

export default App;
