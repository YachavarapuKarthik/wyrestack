import Footer from "./footer/Footer";
import Header from "./header/Header";

function Home(){
    return (
        <>
        <Header/>
        <div className="hero-container">
            <div className="hero-info">
                <h1>Embark your journey with our professionals</h1>
                <p>Master computer science with expert-led online courses and flexible classes. Learn, grow, and succeed in tech today!</p>
            </div>
            </div>
        <Footer/>
        </>
        
    );
}

export default Home;