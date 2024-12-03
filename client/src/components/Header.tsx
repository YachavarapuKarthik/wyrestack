function Header(){
    return (
        <>
        <div className="navbar">
            <div className="navin">
                {/* <div className="logo"></div> */}
                <div className="links">
                <a href="#">Home</a>
                <a href="#">Services</a>
                <a href="#">Our Story</a>
                <a href="#">Courses</a>
                <a href="#">Contact</a>
                <a href="#"><button className="btn1">Let's Get Started</button></a>
               {/*<a href="#"> <button className="btn1">Log in</button></a>*/}
                </div>
            </div>
        </div>
        </>
    );
}

export default Header;