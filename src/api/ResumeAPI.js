import axios from 'axios';
import * as appConstants from '../AppConstants';

class ResumeAPI {
    static getProfileData(userName) {
        return axios.get(appConstants.API_URL + userName)
            .then(response => {
                return response.data;
            }).catch(error => {
                return error;
            });
    }

    static getReposData(userName, pageNo, prevData) {
        var page = (pageNo ? pageNo : 1),
            data = (prevData ? prevData : []),
            url = appConstants.API_URL + userName + '/repos?per_page=100';
        if (pageNo > 1) {
            url += '&page=' + pageNo;
        }
        return axios.get(url)
            .then(response => {
                data = data.concat(response.data);
                if (response.data.length === 100) {
                    this.getReposData(userName, page + 1, data);
                } else {
                    return data;
                }
            }).catch(error => {
                return error;
            });
    }
}

export default ResumeAPI;