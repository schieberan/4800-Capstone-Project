import requests
import os
import os.path
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from datetime import datetime

cam = 1
while cam < 9:
    n = str(cam)
    r = requests.get("http://hiddenhillfarm.us/foalcam/" + n + ".htm")
    content = r.content
    soup = BeautifulSoup(content, "html.parser")
    images = soup.findAll('img')[1]
    response = images.get('src')
    i = requests.get(response)

    # Get time
    now = datetime.now()
    timestamp = now.strftime("%H_%M_%S")

    file = open(os.path.expanduser(os.path.join("~/Desktop/image-test/" + "camera" + n + "-atTime-" + timestamp + ".png")), "wb")
    file.write(i.content)
    file.close()
    cam += 1