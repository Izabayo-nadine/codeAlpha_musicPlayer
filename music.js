const playBtn = document.querySelector('.play');
const pauseBtn = document.querySelector('.pause');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const progressBar = document.getElementById('progress-bar');
const albumArt = document.getElementById('album-art');
const repeatBtn = document.querySelector('.repeat');
const nameClass = document.querySelector('.namec');
const shuffleBtn = document.querySelector('.shuffle');
const currentTimeElement = document.getElementById('current-time');
const totalDurationElement = document.getElementById('total-duration');

const audioFiles = [
    { src: 'songs/Ayra Starr - Commas (Lyric Video).mp4', image: 'images/ayra.png', name: 'Ayra Star' },
    { src: 'songs/Miraculous Ladybug French lyrics (Fre-Eng).mp4', image: 'images/image.png', name: 'Lady bag' },
    { src: 'songs/Nel Ngabo, Juno Kizigenza - Kawooma (Official Video).mp4', image: 'images/nel.png', name: 'Nel Ngabo ft Juno' },
    { src: 'songs/WAIT LYRICS BY KIVUMBI KING & AXON.mp4', image: 'images/kivumbi.png', name: 'Kivumbi King & Axon' },
    { src: 'songs/Nel Ngabo - Nzagukunda (official lyric video).mp4', image: 'images/nelNgabo.png', name: 'Nel Ngabo' },
    { src: 'songs/Limo feat sensey’ tombé pour elle ( vidéo lyrics).mp4', image: 'images/limo.png', name: 'Limo feat sensey' },
    { src: 'songs/Just Missing You - Emma Heesters (Lyrics) Inggris Cover.mp4', image: 'images/emma.png', name: 'Emma Heesters' },
    { src: 'songs/Amagambo yanjye by Patien BIZIMANA.mp4', image: 'images/patien.png', name: 'Patien BIZIMANA' },
    { src: 'songs/Caleb Hearn & ROSIE - Little Bit Better (Lyrics Terjemahan)- But now you hold me in the darkness.mp4', image: 'images/hearn.png', name: 'Caleb Hearn & ROSIE' }
];


let currentIndex = 0;
let audio = new Audio(audioFiles[currentIndex].src);
let isPlaying = false;
let isSeeking = false;
let isShuffle = false;

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', pauseAudio);
prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);
progressBar.addEventListener('input', seekTo);
repeatBtn.addEventListener('click', repeat);
shuffleBtn.addEventListener('click', toggleShuffle);

function playAudio() {
    audio.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    updateProgressBar();
}

function pauseAudio() {
    audio.pause();
    isPlaying = false;
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function repeat() {
    currentIndex = (currentIndex) % audioFiles.length;
    loadAndPlay();
}
function playNext() {
    if (isShuffle) {
        currentIndex = getRandomIndex();
    } else {
        currentIndex = (currentIndex + 1) % audioFiles.length;
    }
    loadAndPlay();
}


function playPrevious() {
    currentIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length; 
    loadAndPlay();
}

function loadAndPlay() {
    audio.src = audioFiles[currentIndex].src;
    albumArt.src = audioFiles[currentIndex].image;
    nameClass.innerHTML = audioFiles[currentIndex].name;
    audio.load();
    audio.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    updateProgressBar(); 
}

function seekTo() {
    const seekTime = audio.duration * (progressBar.value / 100);
    audio.currentTime = seekTime;
}

function updateProgressBar() {
    if (isPlaying) {
        audio.addEventListener('timeupdate', () => {
            if (!isSeeking) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressBar.value = progress;
                currentTimeElement.textContent = formatTime(audio.currentTime);

                if (!isNaN(audio.duration)) {
                    totalDurationElement.textContent = formatTime(audio.duration);
                }
            }
        });
    }
}

progressBar.addEventListener('mousedown', () => {
    isSeeking = true;
});

progressBar.addEventListener('mouseup', () => {
    seekTo();
    isSeeking = false;
});

audio.addEventListener('ended', playNext);


function toggleShuffle() {
    isShuffle = !isShuffle;
    if(shuffleBtn.getAttribute("color") === "green"){
        shuffleBtn.setAttribute("color","white")
    }else{
        shuffleBtn.setAttribute("color","green")
    }
}




function getRandomIndex() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * audioFiles.length);
    } while (randomIndex === currentIndex); 
    return randomIndex;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

audio.addEventListener('loadedmetadata', () => {
    totalDurationElement.textContent = formatTime(audio.duration);
});
