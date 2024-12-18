import Footer from "./footer/Footer";
import Header from "./header/Header";

function Home(){
    return (
        <>
        <Header/>
        <div className="home-container">
            <div className="block-1">
                <h1>Embark your journey with our proffesionals</h1>
            </div>
        </div>
        <Footer/>
        </>
        
    );
}

export default Home;