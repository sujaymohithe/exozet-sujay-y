import React from 'react';
import { getProfile, getRepos } from '../actions/ResumeWidgetActions';
import './ResumeWidget.css';
import * as appConstants from '../AppConstants';

class ResumeWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //input
            userName: props.userName,
            //below are 3 output response model 
            profile: { userFound: 0, loginName: '', repositoriesNo: 0, since: '' },
            repoLanguages: [],
            repoDetails: [],
            //error
            error: ""
        }
    }

    componentDidMount() {
        //GetProfile details - API call
        getProfile(this.state.userName)
            .then((result) => this.successfncProfileInfoCallBack(result))
            .catch(error => {
                this.setState({ error: appConstants.ERROR_MSG });
            });
        //GetRepos details - API call
        getRepos(this.state.userName)
            .then((result) => this.successfncReposInfoCallBack(result))
            .catch(error => {
                this.setState({ error: appConstants.ERROR_MSG });
            });
    }

    //call back function after fetching user github profile details
    successfncProfileInfoCallBack(data) {
        //if user found in github
        if (data && data.login !== null && data.login !== undefined && data.login.length) {
            //calculate since date
            let sinceDate = new Date(data.created_at);
            let since = sinceDate.getFullYear();
            let currentYear = new Date().getFullYear();
            switch (since) {
                case currentYear - 1:
                    since = 'last year';
                    break;
                case currentYear:
                    since = 'this year';
                    break;
                default:
                    since = since + ' year';
                    break
            }
            //update profile data into state
            this.setState({
                profile: {
                    userFound: 1,
                    loginName: data.login,
                    since: since,
                    repositoriesNo: data.public_repos
                }
            })
        }
        //user not found in github
        else {
            this.setState({
                profile: {
                    userFound: -1,
                    loginName: '',
                    since: '',
                    repositoriesNo: 0
                }
            })
        }
    }

    //call back function after fetching user github repositories details
    successfncReposInfoCallBack(data) {
        let repos = [],
            languages = {};
        //data calculation to get langauges count and popularity count
        data.length && data.forEach(function (repo, index) {
            if (repo.language) {
                if (repo.language in languages) {
                    languages[repo.language]++;
                } else {
                    languages[repo.language] = 1;
                }
            }
            let popularity = repo.watchers + repo.forks;
            repos.push({ popularity: popularity, info: repo });
        });
        //populate output data model for language
        this.getUserLanguagesModelData(languages);
        //populate output data model for repositories 
        this.getPopularResposModelData(repos);
    }

    //creation of language model that connects the data to the given HTML
    getUserLanguagesModelData(languages) {
        const languageTotal = Object.values(languages).reduce((a, b) => a + b, 0)
        let languagesUnsorted = Object.keys(languages).map((language) => {
            return {
                name: language,
                percent: parseInt((languages[language] / languageTotal) * 100),
                link: "https://github.com/search?q=user%3A"
                    + this.state.userName + '&l=' + encodeURIComponent(language)
            };
        });
        //sort langauges with highest percent used
        let sorted_languages = languagesUnsorted.sort(function (a, b) {
            return b.percent - a.percent;
        });
        this.setState({ repoLanguages: sorted_languages });
    }

    //creation of repositories model that connects the data to the given HTML
    getPopularResposModelData(repos) {
        let popular_repos = repos.map((repo) => {
            return {
                user: this.state.userName,
                name: repo.info.name,
                language: repo.info.language,
                desciption: repo.info.description,
                stars: repo.info.stargazers_count,
                forks: repo.info.forks,
                updated_at: repo.info.updated_at,
                popularity: repo.popularity
            };
        });
        //sort repos with highest popularity
        let popular_repos_sorted = popular_repos.sort(function (a, b) {
            return b.popularity - a.popularity;
        });
        //take only first 10 popular repositories
        popular_repos_sorted = popular_repos_sorted.slice(0, 10);
        this.setState({ repoDetails: popular_repos_sorted });
    }

    //populate html dom for repositories
    populatePopularRepos(repo, index) {
        const repoLinkTitle = <a href={appConstants.GITHUB_URL
            + repo.user + "/" + repo.name} title="GitHub repository"  >
            {repo.name}
        </a>;
        const repoLink = <a href={appConstants.GITHUB_URL
            + repo.user + "/" + repo.name} title="GitHub repository">
            this repo on GitHub.</a>;
        let updated = new Date(repo.updated_at);
        updated = updated.getFullYear();
        return (
            <div className="repo" key={index}>
                <h2>{repoLinkTitle}</h2>
                <h3>{repo.language ? repo.language + ' - Last Updated ' + updated
                    : 'Last Updated ' + updated}</h3>
                <p>{repo.desciption}</p>
                <p>{appConstants.REPO_INFO.replace('{1}', repo.stars)
                    .replace('{2}', repo.forks)} {repoLink}</p>
            </div>
        )
    }

    //populate html dom for languages
    populateLaguages(lang, index) {
        return (
            <li key={index}>
                <a href={lang.link} title="GitHub repository">
                    {lang.name} </a> ({lang.percent}%)
            </li>
        )
    }

    render() {
        const { profile, repoLanguages, repoDetails, error } = this.state;
        return (
            profile.userFound === 0 || profile.userFound === -1 || error !== "" ?
                (
                    <div className="widget" >
                        <a className="nav-link" href="/" title="Go Back">Go Back</a>
                        <header>
                            <h1>{profile.userFound === 0 ? 'Please Wait ...' : (error !== '' ? error : 'User Not Found')}</h1>
                        </header>
                    </div>
                ) :
                <div className="widget" >
                    <a className="nav-link" href="/" title="Go Back">Go Back</a>
                    <header>
                        <h1>{profile.loginName}</h1>
                        <h2>Active since {profile.since}</h2>
                    </header>
                    <article>
                        {/* profile section */}
                        <div id="profile" className="res-gf">
                            <div className="articleHeader">
                                <h2>GitHub Profile</h2>
                            </div>
                            <div className="articleContent">
                                <h2>On GitHub since {profile.since}, {profile.loginName} is a developer with
                            <a href={appConstants.GITHUB_URL + profile.loginName + '?tab=repositories'}
                                        title="Your GitHub repositories">
                                        {profile.repositoriesNo} public repositories.</a>
                                </h2>
                            </div>
                            <div style={{ clear: "both" }}></div>
                        </div>
                        {/* Language display section */}
                        <div id="languages" className="res-gf">
                            <div className="articleHeader">
                                <h2>Languages</h2>
                            </div>
                            <div className="articleContent">
                                <ul>
                                    {repoLanguages.map(this.populateLaguages, this)}
                                </ul>
                            </div>
                            <div style={{ clear: "both" }}></div>
                        </div>
                        <div id="repositories" className="res-gf">
                            <div className="articleHeader">
                                <h2>Popular Repositories</h2>
                            </div>
                            <div className="articleContent">
                                {repoDetails.map(this.populatePopularRepos, this)}
                            </div>
                            <div style={{ clear: "both" }}></div>
                        </div>
                    </article>
                    <footer>
                        <p>{profile.loginName} - <a href={appConstants.GITHUB_URL + profile.loginName}
                            title="GitHub profile">{appConstants.GITHUB_URL + profile.loginName}</a></p>
                    </footer>
                </div>
        )
    }
}


export default ResumeWidget;