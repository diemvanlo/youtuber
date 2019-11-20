const getVideosUrl = 'http://164.132.226.137:9999/youtuber/feeds/get/all';
// const getVideosUrl = 'http://5db9b400eddc81001495f0df.mockapi.io/api/videos';
const postVideosUrl = 'http://192.168.1.10:8080/video/save';
const updateVideosUrl = 'http://192.168.1.10:8080/video/update';
const deleteVideoUrl = 'http://192.168.1.10:8080/video/delete'
function* getVideosFromApi() {

    const json = yield fetch(getVideosUrl, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: '',
    }).then(response => response.json());
    // console.log("fgg");
    // console.log(json);

    const videos = yield (json);

    return videos;
}

function* postVideosFromApi(newVideo) {
    console.log(JSON.stringify({
        name: newVideo.name,
        releaseYear: newVideo.releaseYear
    }));

    yield fetch(postVideosUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newVideo.name,
            releaseYear: newVideo.releaseYear
        }),
    });
    return;
}

function* updateVideoFromApi(updateVideo) {
    const urlLink = `${updateVideosUrl}/${updateVideo.id.toString()}`;
    console.log(JSON.stringify({
        id: updateVideo.id,
        name: updateVideo.name,
        releaseYear: updateVideo.releaseYear
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
            releaseYear: updateVideo.releaseYear
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
    deleteVideoFromApi
};
