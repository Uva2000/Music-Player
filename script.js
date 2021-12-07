const image =document.querySelector('img');// for searching in the file folder
const title =document.getElementById('title');
const artist =document.getElementById('Artist');
const music =document.querySelector('audio');
const progressContainer =document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl =document.getElementById('duration');
const prevBtn =document.getElementById('prev');
const playBtn =document.getElementById('play');
const nextBtn =document.getElementById('next');

//music 
const songs = [
    {
        name: 'Kinda Crazy',
        displayName: 'Kinda Crazy',
        Artist: 'Rare - Selena Gomez'
    },
    {
        name: 'Again',
        displayName: 'Again',
        Artist: 'Sasha Alex Sloan'
    },
    {
        name: 'Money',
        displayName: 'Money',
        Artist: 'BlackPink - Lisa'
    },
    {
        name: 'Into Your Arms',
        displayName: 'Into Your Arms',
        Artist: 'Ava Max, Marshmallow'
    },
    {
        name: 'Habits',
        displayName: 'Habits (Stay High)',
        Artist: 'Tove Lo'
    }
];

//Update DOM
function loadSong(song){
    title.textContent =song.displayName;
    artist.textContent =song.Artist;
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`
}

//check if playing
let isPlaying ='false';

//Play
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}
//Pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','play');
    music.pause();
}

//play or pause add event listener
playBtn.addEventListener('click',()=>(isPlaying ? pauseSong(): playSong()));

//Current song
let songIndex =0;

// //On Load -Select first song
loadSong(songs[songIndex]);

//next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
 //   console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}

//prev song 
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
   // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}

//update progress bar
function updateProgressBar (e){
    if(isPlaying){
      //  console.log(e);
      const {duration,currentTime} = e.srcElement;
        //console.log(duration,currentTime);
        //update progress bar width
        const progressPercent =(currentTime/duration)*100;
        progress.style.width =`${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration/60) ;
        // console.log('minutes',durationMinutes);
        let durationSeconds =Math.floor(duration%60);
        if(durationSeconds<10)
        {
            durationSeconds =`0${durationSeconds}`;
        }
        // console.log('seconds',durationSeconds);
        //Delay switching duration to avoid NaN
        if(durationSeconds){
            durationEl.textContent =`${durationMinutes}:${durationSeconds}`
        }
        //calculate display for current
        const currentMinutes = Math.floor(currentTime/60) ;
        // console.log('minutes',currentMinutes);
        let currentSeconds =Math.floor(currentTime % 60);
        if(currentSeconds<10)
        {
            currentSeconds =`0${currentSeconds}`;
        }
        currentTimeEl.textContent =`${currentMinutes}:${currentSeconds}`
    }
}

//set progress bar
function setProgressBar(e)
{
    console.log(e);
    const width =this.clientWidth;
    // console.log('width',width);
    const clickX =e.offsetX;
    // console.log('clickx',clickX);
    const{duration}=music;
    // console.log(clickX/width);
    // console.log((clickX/width)*duration);
    music.currentTime =(clickX/width)*duration;
}
//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click',setProgressBar);
