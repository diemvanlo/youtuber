// const getVideosUrl = 'http://164.132.226.137:9999/youtuber/feeds/searchByCommunityName?name=f&page=47';
// const getVideosUrl = 'https://testapi.io/api/diemvanlo/videos?token=54e893583757b543b2cc46b6388e8ce15030433d';
const getVideosUrl = 'http://5de9b255cb3e3800141b9367.mockapi.io/video?page=';
const postVideosUrl = 'http://192.168.1.10:8080/video/save';
const updateVideosUrl = 'http://192.168.1.10:8080/video/update';
const deleteVideoUrl = 'http://192.168.1.10:8080/video/delete';
const getCommentsUrl = 'http://5de9b255cb3e3800141b9367.mockapi.io/video/';
// const getCommentsUrl = 'https://testapi.io/api/diemvanlo/comments?token=54e893583757b543b2cc46b6388e8ce15030433d';

function* getVideosFromApi(action) {
    // console.log(action);

    let getVideosUrll = `${getVideosUrl}${action.page}&limit=${action.limit}`;
    if (action.searchString !== undefined) {
        getVideosUrll += `&search=${action.searchString}`;
    }
    console.log(getVideosUrll);
    const json = yield fetch(getVideosUrll, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: '',
    }).then(response => response.json()).then((responseJson) => {
        // console.log(responseJson);
        return responseJson;
    })
        .catch((error) => {
            console.error(error);
        });
    const videos = yield (json);
    return videos;
}

function* getCommentsFromApi(action) {
    let getCommentsUrll = `${getCommentsUrl}${action.idVideo}/comment`;
    console.log(getCommentsUrll);
    const json = yield fetch(getCommentsUrll, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: '',
    }).then(response => response.json()).then((responseJson) => {
        // console.log(responseJson);
        return responseJson;
    })
        .catch((error) => {
            console.error(error);
        });
    const comments = yield (json);
    return comments;
}

function* postVideosFromApi(newVideo) {
    console.log(JSON.stringify({
        name: newVideo.name,
        releaseYear: newVideo.releaseYear,
    }));

    yield fetch(postVideosUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newVideo.name,
            releaseYear: newVideo.releaseYear,
        }),
    });
    return;
}

function* updateVideoFromApi(updateVideo) {
    const urlLink = `${updateVideosUrl}/${updateVideo.id.toString()}`;
    console.log(JSON.stringify({
        id: updateVideo.id,
        name: updateVideo.name,
        releaseYear: updateVideo.releaseYear,
    }));

    yield fetch(urlLink, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            id: updateVideo.id,
            name: updateVideo.name,
            releaseYear: updateVideo.releaseYear,
        }),
    });
}

function* deleteVideoFromApi(deleteVideoID) {
    const urlLink = `${deleteVideoUrl}/${deleteVideoID.toString()}`;
    yield fetch(urlLink, {
        method: 'DELETE',
        headers: {
            Accept: 'Application/json',
            'Content-Type': 'application/json',
        },
        body: '',
    });
    return;
}

export const Api = {
    getVideosFromApi,
    postVideosFromApi,
    updateVideoFromApi,
    deleteVideoFromApi,
    getCommentsFromApi,
};
