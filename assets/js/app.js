let  allMusic = [
    {
        name: "Kill This Love",
        artist: "--Black Pink--",
        img: "song1",
        src: "assets/music/Kill_This_Love.mp3",
        idMusic: "song1"
    },
    {
        name: "Ice Cream",
        artist: "--Black Pink--",
        img: "song2",
        src: "assets/music/Ice_Cream.mp3",
        idMusic: "song2"
    },
    {
        name: "As If Its Your Last",
        artist: "--Black Pink--",
        img: "song3",
        src: "assets/music/As_If_Its_Your_Last.mp3",
        idMusic: "song3"
    },
    {
        name: "Pink Venom",
        artist: "--Black Pink--",
        img: "song4",
        src: "assets/music/Pink_Venom.mp3",
        idMusic: "song4"
    },
    {
        name: "Flower",
        artist: "--Jisoo--",
        img: "song5",
        src: "assets/music/Flower_Jisoo.mp3",
        idMusic: "song5"
    },
    {
        name: "Money",
        artist: "--Lisa--",
        img: "song6",
        src: "assets/music/Money_Lisa.mp3",
        idMusic: "song6"
    },
    {
        name: "Gone",
        artist: "--Rose--",
        img: "song7",
        src: "assets/music/Gone_Rose.mp3",
        idMusic: "song7"
    },
    {
        name: "Solo",
        artist: "--Jenie--",
        img: "song8",
        src: "assets/music/Solo_Jennie.mp3",
        idMusic: "song8"
    }

]

const wrapper = document.querySelector(".wrapper")
imgMusic = wrapper.querySelector('.img-music')
musicImg = wrapper.querySelector(".img-music img")
musicName = wrapper.querySelector(".name-music .name")
musicArtist = wrapper.querySelector(".name-music .artist")
progress = wrapper.querySelector('.progress')
progressbar = wrapper.querySelector(".progress-bar")
play = wrapper.querySelector('#play');
prev = wrapper.querySelector('#prev');
next = wrapper.querySelector('#next');

let musicIndex = 0;
let autoplay = 0;
let timer = 0;
let play_song = false;
let songAudio = document.createElement('audio');

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playLiMusic();
})
function loadMusic(index){
    reset_music();
    autoplay_song();
    musicName.innerText = allMusic[index].name;
    musicArtist.innerText = allMusic[index].artist;
    musicImg.src = `assets/img/${allMusic[index].img}.jpg`;
    songAudio.src = allMusic[index].src;
    songAudio.load();

    timer = setInterval(range_slider , 1000);
}
loadMusic(musicIndex);
function musicPlay(){
    if(play_song == false){
        playsong();
    }
    else{
        pausesong();
    }
}
function playsong(){
    songAudio.play();
    play_song = true;
    play.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pausesong(){
    songAudio.pause();
    play_song = false;
    play.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// ---------next Music----------
function nextMusic(){
    if(musicIndex < allMusic.length -1){
        musicIndex++;
        loadMusic(musicIndex);
        playsong();
        playLiMusic();
    }else{
        musicIndex = 0;
        loadMusic(musicIndex);
        playsong();
        playLiMusic();
    }
}
// ---------prev Music----------
function prevMusic(){
    if(musicIndex > 0){
        musicIndex--;
        loadMusic(musicIndex);
        playsong();
    }else{
        musicIndex = allMusic.length -1;
        loadMusic(musicIndex);
        playsong();
    }
}
next.addEventListener("click", ()=> {
    nextMusic();
})

prev.addEventListener("click", ()=> {
    prevMusic();
})

// -------------update progress-------
songAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    progressbar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current")
    let musicDuration = wrapper.querySelector(".duration")
    songAudio.addEventListener("loadeddata", ()=>{
        let audioduration = songAudio.duration;
        let totalMusicmin = Math.floor(audioduration/60);
        let totalMusicsec = Math.floor(audioduration%60);
        if(totalMusicsec < 10){
            totalMusicsec = `0${totalMusicsec}`;
        }
        musicDuration.innerText = `${totalMusicmin}:${totalMusicsec}`;
    });
    let currentMusicmin = Math.floor(currentTime/60);
    let currentMusicsec = Math.floor(currentTime%60);
        if(currentMusicsec < 10){
            currentMusicsec = `0${currentMusicsec}`;
        }
        musicCurrentTime.innerText = `${currentMusicmin}:${currentMusicsec}`;

});

// -----------tua nhạc-------
progress.addEventListener("click", (e)=>{
    let progressWidthval = progress.clientWidth;
    let clickOffsetX = e.offsetX;
    let songDuration = songAudio.duration;
    songAudio.currentTime = (clickOffsetX / progressWidthval) * songDuration
    playsong();
})

// --------tự chuyển bài----------
function autoplay_song(){
    if(autoplay==1){
        autoplay=0;
    }else{
        autoplay=1;
    }
}
function range_slider(){
    if(songAudio.ended){
        play.innerHTML = `<i class="fa-solid fa-play"></i>`;
        if(autoplay==1){
            nextMusic();
            loadMusic(musicIndex);
            playsong();
        }
    }
}
// --------reset music---------
function reset_music(){
    progressbar.value = 0;
}

// --------Volume--------

let recent_volume = wrapper.querySelector('#volume')  
function volume_change(){
    songAudio.volume = recent_volume.value / 100;
}



// --------danh sách nhạc----------

const showMusic = document.querySelector("#fa-list")
const closeMusic = document.querySelector(".fa-close")
const listMusic = document.querySelector(".list-music")
const ulMusic = wrapper.querySelector("ul")

showMusic.addEventListener("click", function(){
    listMusic.classList.add("show")
})
closeMusic.addEventListener("click", function(){
    listMusic.classList.remove("show")
})

for (let i=0; i< allMusic.length; i++){
    let liMusic = `<li Musicindex="${i}">
                        <div class="song-title">
                            <span>${allMusic[i].name}</span>
                            <p>${allMusic[i].artist}</p>
                        </div>
                        <audio class="${allMusic[i].idMusic}" src="${allMusic[i].src}"></audio>
                        <span id="${allMusic[i].idMusic}" class="audio-duration">3:04</span>
                    </li>`;
    ulMusic.insertAdjacentHTML("beforeend", liMusic);
    let liAudioDuration = ulMusic.querySelector(`#${allMusic[i].idMusic}`)
    let liAudioTag = ulMusic.querySelector(`.${allMusic[i].idMusic}`)

// -------hiển thị thời gian bài hát------------
    liAudioTag.addEventListener("loadeddata", ()=>{
        let audioDuration = liAudioTag.duration;
        let totalMusicmin = Math.floor(audioDuration/60);
        let totalMusicsec = Math.floor(audioDuration%60);
        if(totalMusicsec < 10){
            totalMusicsec = `0${totalMusicsec}`;
        }
        liAudioDuration.innerText = `${totalMusicmin}:${totalMusicsec}`;
    });

}
// -----------------------------------------------

const allLiMusic = ulMusic.querySelectorAll("li");
function playLiMusic(){
    for (let j = 0; j < allLiMusic.length; j++) {
        if(allLiMusic[j].classList.contains("playMusic")){
            allLiMusic[j].classList.remove("playMusic")
        }
        if(allLiMusic[j].getAttribute("Musicindex") == musicIndex){
            allLiMusic[j].classList.add("playMusic");
        }
        allLiMusic[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(index){
    let getLiIndex = index.getAttribute("Musicindex");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playsong();
    playLiMusic();
}

