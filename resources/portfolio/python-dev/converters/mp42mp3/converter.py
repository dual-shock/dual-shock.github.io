import moviepy.editor as mp
from pathlib import Path

video = mp.VideoFileClip("C:/Users/nokken/Desktop/LocalSongs/WhatsApp Audio 2023-10-04 at 23.35.16.mp4")
video.audio.write_audiofile("C:/Users/nokken/Desktop/LocalSongs/Bag Of Bones.mp3")