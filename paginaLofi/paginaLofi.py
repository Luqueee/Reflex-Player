"""Welcome to Reflex! This file outlines the steps to create a basic app."""
from rxconfig import config
import numpy as np
from pytube import YouTube
import asyncio
import reflex as rx
import datetime
from typing import Any
import pytz
import time
import requests
from typing import List
from bs4 import BeautifulSoup

bg = {
    
    
    'height': '100vh',
    'width':'200vh',
    'background-color': 'black',
    "z-index":"2"
    
}

img = {
    
    
    'margin-top': '8vh',
    'border-radius': '10px',
    'height': '80%',
}

volumeBar = {
    "position": "relative",
    
    "left": "-600px"
}

controlBar = {
    "position": "relative",
    
    "left": "450"
}

buscador = {
    "position": "relative",
    'color': 'white',
    "top": "-12",
    "left": "-50"
}

buscador_button = {
    "position": "relative",
    "top": "-12",
    "left": "-50"
}

track_list = {
    
    'width':'20%',
    'background-color': 'gray'
}


# The supported time zones.
TIMEZONES = [
    "Asia/Tokyo",
    "Australia/Sydney",
    "Europe/London",
    "Europe/Paris",
    "Europe/Moscow",
    "US/Pacific",
    "US/Eastern",
]
DEFAULT_ZONE = TIMEZONES[-4]

class Reproductor(rx.State):
    #states of the song
    #1 Reproducir
    #0 Pausa
    #2 Atras
    #3 Alante
    
    state: int = 0 #state the song
    volume: float = 1 #volume of the song
    posActual: int = 0 #actual song in the tracklist
    
    running: bool = False #playing song
    loop: bool = True 
    mute: bool = False
    
    urlSong: str = "" #url song for the tracklist
    time_song: float = 0 #actual time of the song
    length_song: float = 0 #length of the song
    
    intensidad = 10000  # Nivel de intensidad del sonido en decibelios (dB)
    intensidad_maxima = 10000  # Nivel máximo de intensidad del sonido en decibelios (dB)
    

    tracklistbuttons: List[str] = ['daviles de novela','lofi song'] #names of the tracklist buttons
    tracklist: List[str] = ['https://www.youtube.com/watch?v=AjrBn09nHis&ab_channel=DavilesdeNoveldaVEVO',"https://www.youtube.com/watch?v=l-2hOKIrIyI&ab_channel=AltheaGianera"] #tracklist urls
    cancion: str = 'https://www.youtube.com/watch?v=AjrBn09nHis&ab_channel=DavilesdeNoveldaVEVO' #actual url song
    
    nameSong: str = "daviles de novela" #name song url
    
    muteLogoUnmuted = '🔊'
    muteLogoMuted = '🔇'
    loopLogo = '🔁'

    muteLogo = muteLogoUnmuted #changes the mute/unmute logo
    
    
    
    def start(self):
        #starts the playing song
        
        self.running = True
        self.obtainDuration(self.cancion)
        self.change(1)
        
        if self.running: 
            return Reproductor.tick
    
    def change(self, value):
        #changes the state of playing song if it's true self.time_song count the actual time of the song
        
        if value == 1 and self.state == 0:
            if self.time_song == 0:
                self.time_song = time.time()

            #print('inicio', self.time_song)
        elif self.state == 1 and value == 0:
            
            #print('final', time.time()-self.time_song, '|', time.time())
            self.running = False
        self.state = value
        #print(self.state)
    
    def eliminate(self, namesong: str):
        #eliminate the song
        
        #obtain the actual position
        pos: int = self.tracklistbuttons.index(namesong)
        #print(pos)
        
        self.tracklist.pop(pos) #delete the song of the tracklist
        self.tracklistbuttons.pop(pos) #delete the name song in the button
        
        if pos>0: #change the actual position if is greater than 0(first song)
            self.posActual = pos-1 #change the index of the song (the actual song moves one position back)
        
            self.obtainDuration(self.tracklist[self.posActual])
            
            self.urlSong = self.tracklist[self.posActual]
            self.cancion = self.tracklist[self.posActual]

        print("tracklist ",self.tracklist, "cancion ", self.cancion, "posactual ",self.posActual)
        
        
    def changeLoop(self):
        #loop the song
        self.loop = False if self.loop == True else True
        #print(self.loop)
    
    def changemute(self):
        #mute or unmute the song
        if self.mute == True:
            self.mute = False
            self.muteLogo = self.muteLogoUnmuted
            
        else:
            self.mute = True
            self.muteLogo = self.muteLogoMuted
        #print(self.mute)

    def changeVolume(self, op):
    
        self.intensidad += 1000*op
        if self.intensidad > 10000 and op == 1:
            self.intensidad = 10000
        if self.intensidad < 0 and op == -1:
            self.intensidad = 0
        if self.volume >= 0 and self.volume <= 1:
            volumen_dB = 10 * np.log10(self.intensidad)
            volumen_max_dB = 10 * np.log10(self.intensidad_maxima)
            
            # Normalización utilizando una función exponencial modificada
            volumen_normalizado = np.power(10, (volumen_dB - volumen_max_dB) / 5)

            self.volume = max(0, min(1, volumen_normalizado))
        
        #print(self.volume, self.intensidad,op)
    
    def addListSong(self,url_video:str):
        pagina = requests.get(url_video)
        soup = BeautifulSoup(pagina.text, 'html.parser')
        
        #find the title song
        titulo = soup.find('title').contents
        
        titulolist = list(titulo[0])
        
        if len(titulolist) > 20:
            #Check if the length of the title is greater than 20 letters
            titulo = "".join(titulolist)[:77]
            titulo += "..."
        
        #Append the song information
        self.tracklistbuttons.append(titulo) if titulo not in self.tracklistbuttons else print('cancion ya dentro')
        self.tracklist.append(url_video) if url_video not in self.tracklist else print('cancion ya dentro')
        print("tracklist ", self.tracklist)
        
        
    def obtainDuration(self, url: str):
        #Obtain the information about the song
        
        yt = YouTube(url)
        
        self.length_song = yt.length 
        #self.length_song = 20
        
        if self.state == 1:
            self.time_song = time.time()

        # Convertir la duración a formato legible (horas:minutos:segundos)
        hours = self.length_song // 3600
        minutes = (self.length_song % 3600) // 60
        seconds = self.length_song % 60
        
        #print(f'Duración del video: {hours:02}:{minutes:02}:{seconds:02}')
        
        #print('duration', self.length_song)
        
        
    def sendSong(self, song:dict):
        url_video = song['song name']
        self.cancion = url_video
        

        self.obtainDuration(url_video)        
    
        self.addListSong(url_video)
        
        self.urlSong = ""
        
        #print(self.tracklist)
    
    def nextSong(self, previous = False):
        #pass the song
        
        print("url song ",self.cancion)
        
        #Obtain the actual position
        self.posActual = self.tracklist.index(self.cancion)

        #Switch to the last song if you're in the first song
        if self.posActual-1 >= 0 and previous == True:
            self.cancion = self.tracklist[self.posActual-1]
        
        #Switch to the next song
        if self.posActual+1 < len(self.tracklist) and previous == False:
            #print('posicion actual',self.posActual, len(self.tracklist) > self.posActual+1)
            self.cancion = self.tracklist[self.posActual+1]
            
        
        #Get the actual url   
        elif previous == True:
            self.cancion = self.tracklist[-1]
            
        else:
            #print('Utlima cancion cola')
            self.cancion = self.tracklist[0]
        print("url song updated", self.cancion)
        
        #obtain the name song
        self.nameSong = self.tracklistbuttons[self.tracklist.index(self.cancion)]
        
        
        self.obtainDuration(self.cancion)
    
    
    def checkSong(self):
        
        #print('time',abs(time.time()-self.time_song),abs(time.time()-self.time_song) > self.length_song-2,type(abs(time.time()-self.time_song)))
      
        if abs(time.time()-self.time_song > self.length_song-2) == True:
            #Check if the current time of the song is grater than 2 seconds of the total song time
            self.nextSong()

    @rx.background
    async def tick(self):
        #Check the song in realtime
        
        while self.running:
            
            await asyncio.sleep(1)
            
            async with self:
                #Check song
                self.checkSong()
    
    

    

class Clock(rx.State):
    # The time zone to display the clock in.
    zone: str = rx.Cookie(DEFAULT_ZONE)

    # Whether the clock is running.
    running: bool = True
    state: bool = False
    # The last updated timestamp
    _now: datetime = datetime.datetime.fromtimestamp(0)
    
    
    def refresh(self):
        #Refresh the clock in realtime
        
        self._now = datetime.datetime.now()
    
    
    def on_load(self):
        
        #Switch the playing song to false
        Reproductor.running = False
        
        
        # Set the switch state.
        self.running = True

        # Start the clock if the switch is on.
        if self.running:
            return Clock.tick
        
        self.refresh()

    @rx.cached_var
    def valid_zone(self) -> str:
        #Check the valid zone
        
        try:
            pytz.timezone(self.zone)
        except Exception:
            return DEFAULT_ZONE
        return self.zone
    
    @rx.background
    async def tick(self):
        """Update the clock every second."""
        while self.running == True:
            async with self:
                self.refresh()

            # Sleep for a second.
            await asyncio.sleep(1)
            
            #Start the clock
            async with self:
                self.state = True
                
            
    
    @rx.cached_var
    def time_info(self) -> dict[str, Any]:
        #Obtain the time
        
        #Check the time song in real time
        Reproductor.checkSong()
        
        now = self._now.astimezone(pytz.timezone(self.valid_zone))
        return {
            "hour": now.hour ,
            "minute": now.minute,
            "second": now.second,
            "meridiem": "AM" if now.hour < 12 else "PM",
            "minute_display": f"{now.minute:02}",
            "second_display": f"{now.second:02}",
        }


def digital_clock() -> rx.Component:
    #Draw the clock and the name song
    
    
    return rx.cond(Clock.state,
            rx.hstack(
                
                rx.heading(Clock.time_info["hour"]),
                rx.heading(":"),
                rx.heading(Clock.time_info["minute_display"]),
                rx.heading(":"),
                rx.heading(Clock.time_info["second_display"]),
                rx.heading(" - "),
                rx.heading(Reproductor.nameSong),
                #rx.heading(Clock.time_info["meridiem"]),
                #border_width="medium",
                #border_color="#43464B",
                #border_radius="2em",
                padding_x="2em",
                color="#decdbe",
            ),
            rx.hstack()
    )


def addButton(index:str):
    #generate the button

    return rx.button(index,size="xs", on_click=Reproductor.eliminate(index), style={"background-color": "white",'color':'black','margin-top':'10px'})

    
    

def drawButton() -> rx.Component:    
    #Draw the track list
    return [rx.vstack(rx.foreach(
        Reproductor.tracklistbuttons,
        lambda index: addButton(index)
        ))]
   

     




def index() -> rx.Component:
    return rx.hstack(
        drawButton(),
        rx.vstack(
            digital_clock(),
            rx.image(src='/bg_video.gif', style = img),
            rx.button_group(
                rx.button('⏪', on_click=Reproductor.nextSong(True), style=controlBar),
                rx.button('▶', on_click=Reproductor.start(), style=controlBar),
                rx.button('⏸️', on_click=Reproductor.change(0), style=controlBar),
                rx.button('🔁', on_click=Reproductor.changeLoop(), style=controlBar),
                #rx.button('🔁', on_click=Reproductor.eliminate(), style=controlBar),
                rx.button('⏩', on_click=Reproductor.nextSong(), style=controlBar),

                rx.button(Reproductor.muteLogo, on_click=Reproductor.changemute(), style=volumeBar),
                rx.button('➕', on_click=Reproductor.changeVolume(1),style=volumeBar),
                rx.button('➖', on_click=Reproductor.changeVolume(-1),style=volumeBar),
                variant="ghost",
                size='lg'
            ),
            rx.form(
            rx.hstack(rx.input(placeholder='youtube song', name='song name',style=buscador),
                      rx.button('search', type_='submit',style=buscador_button)),
            on_submit=Reproductor.sendSong
            ),
            rx.audio(
                url=Reproductor.cancion,
                
                width="400px",
                height="auto",
                muted=Reproductor.mute,
                playing=Reproductor.state == 1,
                loop=Reproductor.loop,
                volume=Reproductor.volume,
                style={'display': 'none'}
                
            ),
            style=bg,
        ),
        
        rx.card(
          
            rx.center(#rx.list(items=Reproductor.tracklist, spacing='1.5em',style={'color':'white','max-width':'300px'}),
                      rx.list(items=drawButton(), spacing='.25em',style={'color':'white','position':'absolute','top':'50px'})),
            header=rx.heading("Track list",color="#decdbe",style={'position':'absolute','left': '25vh','top':'4px'}),
            #footer=rx.heading("Footer", size="sm"),
            align='left',
            style={'background-color': 'black','height':'100vh','width':'100vh',"z-index":"1"},
            
            

        ),
        style={'background-color':'black'}
        )

                    

        

                    

    

app = rx.App()
app.add_page(index, on_load=Clock.on_load())
app.compile()