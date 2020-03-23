import React from 'react';
import ResumeGenerator from '../components/ResumeGenerator';
import ResumeWidget from '../components/ResumeWidget';

class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            landingPage : true,
            userName : ""
        }
    }

    handleGenerateBtnClick(user) {
        this.setState({ landingPage: false, userName : user })
    }

    render() {
        return (this.state.landingPage ?
            <ResumeGenerator
                onGenerateBtnClick={(userName) => this.handleGenerateBtnClick(userName)} />
            :
            <ResumeWidget userName={this.state.userName}/>
        )
    }
}

export default HomeContainer;