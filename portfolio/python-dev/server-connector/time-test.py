from datetime import datetime
currentTime = datetime.now().strftime("%H:%M:%S")

clockTimes = currentTime.split(":")

integerTime = str(clockTimes[0] + clockTimes[1])

print(integerTime)