import CopyRight from "./CopyRight";
import WhiteLogo from "../../assets/logo_dark.png"
import QuickLinks from "./QuickLinks";

function Footer(){
    return (
        <>
        <footer className="footer">
            <div className="footer-logo">
                <img src= {WhiteLogo} />
                <p>At Neuron.ai, we thrive on innovation and thinking outside the box. Reach out to us for a comprehensive analysis and evaluation of your ideas, and let's bring your vision to life.</p>
                <QuickLinks/>
            </div>

            <div className="footer-content">
                <div className="services">
                    <h3>Our Services</h3>
                    <ul>
                        <li>Web Design</li>
                        <li>Web Development</li>
                        <li>NeuroLearnHub</li>
                        <li>NeuroTrainerConnect</li>
                    </ul>
                </div>
            </div>

            <div className="footer-address">
                <div className="address">
                    <h3>Connect with us at</h3>
                    <ul>
                        <li>Old town, Kavali</li>
                        <li>Pincode-524201</li>
                    </ul>
                </div>
            </div>
    </footer>
        <CopyRight/>
        </>
    );
}

export default Footer;