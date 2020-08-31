/* eslint-disable react/prop-types */
import React from 'react';
import { Link, browserHistory} from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class AppRouter extends React.Component {

    home() {
        browserHistory.push("login");
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="md" bg="primary" className="routeNav">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Item>
                            <Link to="home" className="nav-link">Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="claim" className="nav-link">View Claim</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="contact" className="nav-link">Contact Us</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="about" className="nav-link">About</Link>
                        </Nav.Item>
                        <Nav.Item className="ml-auto user mr-5">
                                Welcome, {this.props.username}
                        </Nav.Item>
                        <Nav.Item>        
                                <button className="btn btn-outline-light" onClick={()=> this.home()}>Logout</button>
                        </Nav.Item>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default AppRouter;