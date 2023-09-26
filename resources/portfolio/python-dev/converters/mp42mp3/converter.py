import moviepy.editor as mp
from pathlib import Path

video = mp.VideoFileClip("S:/SunnyVids/WhatsApp Video 2023-09-26 at 22.08.04.mp4")
video.audio.write_audiofile("C:/Users/nokken/Desktop/LocalSongs/Let You Break My Heart Again.mp3")