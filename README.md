# KowalPlayer 1.0

KowalPlayer 1.0 to prosty plajer mp3 do umieszczenia na stronie. Player będzie
w przyszłości rozwijany, ale już na ten moment jest funkcjonalny.

### Inicjalizacja
Wklejasz do projektu pliki.

Do projektu wklejasz kod html:

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">

<div class="audio-player-container">
  <div class="player">
    <div  class="song-title"></div>
    <input type="range" class="song-slider" min="0" step="1">
    <div>
      <div class="current-time">00:00</div>
      <div class="duration">00:00</div>
    </div>
    <div class="controlers">
      <i class="fas fa-arrow-circle-left prev-song-KowalPlayer"></i>
      <i class="fas fa-play play-pause-button-KowalPlayer"></i>
      <i class="fas fa-arrow-circle-right next-song-KowalPlayer"></i>
      <input class="volume-slider" type="range" min="0" max="1" step="0.01">
    </div>
    <div class="next-song"><b>Next Song : </b></div>
  </div>
</div>
<script src="./script/scriptKowalPlayer.js"></script>

W pliku js tworzysz tablice tytułów piosenek:

przykład: var songs = [tytuł1.mp3 tytuł2.mp3, ...];

I podspodem inicjalizujesz Player

var audio = new KowalPlayer(songsArray, "sciezkaDoPlików", ".klasaKonteneraPlayera(standardowo: audio-player-container)");
# kowalPlayer
