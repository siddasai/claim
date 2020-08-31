/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'react-bootstrap/Container';
import { Card, ListGroup, ListGroupItem, CardColumns, Button } from 'react-bootstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';
import AppRouter from './AppRoute.jsx';
import { Logger } from 'react-logger-lib';
import { store } from '../reducers/store.js';
import { claimList } from '../reducers';
import { connect } from 'react-redux';

class ViewClaim extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            claims: [],
            userName: ''
        }
    }

    componentDidMount() {
        let userName = localStorage.getItem('username');
        this.setState({ userName });
        axios.get(`http://localhost:3000/api/viewClaims`)
            .then(res => {
                const claims = res.data;
                console.log(claims);
                this.props.claimList(claims);
            });
            store.subscribe(() => {
                this.setState(
                    { claims: store.getState() }
                )
            });
    }

    updatePage(claim) {
        window.event.preventDefault();
        Logger.of('App.ViewClaim.updatePage').info('claim data', claim);
        browserHistory.push("updateClaim/" + claim.Emp_id);
    }
    render() {
        return (

            <div>
                <AppRouter username={this.state.userName}></AppRouter>
                <Container>
                    <h3 className="text-center mt-3">Claim Summary</h3>
                    <CardColumns>
                        {this.state.claims.map((claim, index) =>

                            <Card key={index} className="text-center boxes">
                                <Card.Header>Claim Summary</Card.Header>
                                <Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem><span>Employee ID : </span><span>{claim.Emp_id}</span></ListGroupItem>
                                    <ListGroupItem><span>Employee Name : </span>{claim.Employee_Name}</ListGroupItem>
                                    <ListGroupItem><span>Claim Number : </span>{claim.Claim_Number}</ListGroupItem>
                                    <ListGroupItem><span>Claim Program : </span>{claim.Claim_Program}</ListGroupItem>
                                    <ListGroupItem><span>Claim Type : </span>{claim.Claim_Type}</ListGroupItem>
                                    <ListGroupItem><span>Claim Start Date : </span>{claim.Claim_Start_Date}</ListGroupItem>
                                    <ListGroupItem><span>Claim End Date : </span>{claim.Claim_End_Date}</ListGroupItem>
                                </ListGroup>
                                <Button variant="outline-primary" onClick={()=> this.updatePage(claim)}>Update</Button>
                                </Card.Body>
                            </Card>
                        )
                        }
                    </CardColumns>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        claimList: state.claims
    }
}

const mapDispatchToProps = dispatch => {
    return {
        claimList: claims => dispatch(claimList(claims))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(ViewClaim);
