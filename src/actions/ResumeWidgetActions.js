import ResumeAPI from '../api/ResumeAPI';

//to get user profile details
export function getProfile(userName) {
    return ResumeAPI.getProfileData(userName).then(result => {
        return result;
    }).catch(error => {
        throw (error);
    });
}

//to get user repositories details
export function getRepos(userName) {
    return ResumeAPI.getReposData(userName).then(result => {
        return result;
    }).catch(error => {
        throw (error);
    });
}