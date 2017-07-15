import React, { Component } from 'react';
import './Main.css';
import Container from '../Container/Container';
import Pagehead from '../Pagehead/Pagehead';
import IssuesListing from '../IssuesListing/IssuesListing';
import data from '../../data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Description from '../Description/Description';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: data,
            tab: 'open',
            value: '',
            id: '',
        }
    }

    openList = () => {
        this.setState({
            tab: 'open',
        })
    }

    closedList = () => {
        this.setState({
            tab: 'closed',
        })
    }

    openItem = (id) => () => {
        this.setState({
            issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'open'} : item),
        })
    }

    closeItem = (id) => () => {
        this.setState({
            issues: this.state.issues.map(item => item.id === id ? { ...item, state: 'closed'} : item),
        })
    }

    newIssue = () => {
        const newItem = {
            "id": Math.random()*1000000000,
            "state" : "open",
            "title" : "Hello, it's me",
        };
        const newIssues = [...this.state.issues, newItem];
        this.setState({
            issues: newIssues,
        })
    }

    searchTitle = (event) => {
        this.setState({
            value: event.target.value,
        });
        console.log(event.target.value);
    }

    description = (id) => () => {
        this.setState({
            id
        });   
    }

    render() {
       
        return (
            <Router>
                <main className="content">
                    <Pagehead count={ this.state.issues.length }/>
                    <Container>
                        <Route exact path="/" component={ () =>  <IssuesListing issues={ this.state } open={ this.openList } closed={ this.closedList } 
                        openItem={ this.openItem } closeItem={ this.closeItem } newIssue={ this.newIssue } 
                        searchTitle={ this.searchTitle } description={ this.description }/> }/>
                        <Route path="/description" component={ () => <Description issues={ this.state } /> }/> 
                    </Container>
                </main>
            </Router>
        );
    }
}

export default Main;