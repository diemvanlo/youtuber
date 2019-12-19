// const getVideosUrl = 'http://164.132.226.137:9999/youtuber/feeds/searchByCommunityName?name=f&page=47';
const getVideosUrl = 'http://5de9b255cb3e3800141b9367.mockapi.io/video?page=';
const postVideosUrl = 'http://192.168.1.10:8080/video/save';
const updateVideosUrl = 'http://192.168.1.10:8080/video/update';
const deleteVideoUrl = 'http://192.168.1.10:8080/video/delete';

function* getVideosFromApi(action) {
    console.log(`${getVideosUrl}${action.page}&limit=${action.limit}`);
    const json = yield fetch(`${getVideosUrl}${action.page}&limit=${action.limit}`, {
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
};
