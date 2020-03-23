import React from 'react';
import './ResumeGenerator.css';
import * as appConstants from '../AppConstants';

class ResumeGenerator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            error: false
        }
    }

    //this function handles text change in #username 
    onChangeUserName(event) {
        this.setState({ userName: event.target.value });
    }

    onEnter(event) {
        if (event.key === "Enter") {
            if (this.state.userName.trim()) {
                this.props.onGenerateBtnClick(this.state.userName);
            }
            else {
                this.setState({ error: true });
            }
        }
    }

    //this function handles generate button click and  
    //send usernamevalue to parent componet
    onGenerateBtnClick() {
        if (this.state.userName.trim()) {
            this.props.onGenerateBtnClick(this.state.userName);
        }
        else {
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <>
                <header>
                    <h2>My GITHUB Resume</h2>
                </header>
                <div id="content">
                    <div className="frmInput">
                        <input id="username" type="text"
                            placeholder="Enter your GitHub username 
                            and click on generate"
                            autoFocus="" autoComplete="off" value={this.state.userName}
                            onChange={(e) => this.onChangeUserName(e)}
                            onKeyPress={(e) => this.onEnter(e)} />
                        <button type="submit" id="generate"
                            onClick={() => this.onGenerateBtnClick()}>
                            Generate</button><br />
                        <p className="error-msg">{this.state.error && 'Please enter GitHub account name'}</p>
                    </div>
                    {/* Below is React Fragment
                    it groups children avoiding adding extra nodes to DOM */}
                    <>
                        <p>{appConstants.RESUMEGENERATOR_P}</p>
                        <p>{appConstants.RESUMEGENERATOR_P1}</p>
                        <p>{appConstants.RESUMEGENERATOR_P2}</p>
                        <p>{appConstants.RESUMEGENERATOR_P3}</p>
                    </>
                </div>
            </>
        )
    }
}

export default ResumeGenerator;