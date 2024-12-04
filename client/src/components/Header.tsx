import logo from '../assets/logo.png'

function Header(){
    return (
        <>
        <div className="talk">
            <div className="talkin">
                <div className="mail"><i className="ri-mail-fill"></i> neuron.ai.india@gmail.com</div>
            </div>
        </div>

        <div className="navbar">
            <div className="navin">
                <img className='logo' src = {logo}></img>
                {/*<div className="logo"></div> */}
                <div className="links">
                <a href="#">Home</a>
                <a href="#">Services</a>
                <a href="#">Our Story</a>
                <a href="#">Courses</a>
                <a href="#">Contact</a>
                <a href="#"><button className="btn1">Let's Get Started</button></a> 
                <a href="#"> <button className="btn1">Log in</button></a>
                </div>
            </div>
        </div>
        </>
    );
}

export default Header;