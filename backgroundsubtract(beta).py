# using cmd
# pip uninstall opencv-contrib-python opencv-python
# pip install opencv-contrib-python
# https://www.codepasta.com/computer-vision/2019/04/26/background-segmentation-removal-with-opencv-take-2.html
import cv2
import numpy as np
import os

# Global Vars
filecount = 0


def image_proc(file):
    global filecount
    # Open a test image
    src = cv2.imread(file, 1)
    # Apply a blur to de-noise
    blurred = cv2.GaussianBlur(src, (7, 7), 0)
    blurstr = "src/blurred/blurred" + str(filecount) + ".jpg"
    cv2.imwrite(blurstr, blurred)
    blurred_float = blurred.astype(np.float32) / 255.0
    edgeDetector = cv2.ximgproc.createStructuredEdgeDetection("src/model.yml")
    edges = edgeDetector.detectEdges(blurred_float) * 255.0
    edgerawstring = "src/edge_raw/edge-raw" + str(filecount) + ".jpg"
    cv2.imwrite(edgerawstring, edges)
    # Filter S&P Noise
    edges_8u = np.asarray(edges, np.uint8)
    filterOutSaltPepperNoise(edges_8u)
    edgestring = "src/edge/edge" + str(filecount) + ".jpg"
    cv2.imwrite(edgestring, edges_8u)
    contour = findSignificantContour(edges_8u)
    # Draw the contour on the original image
    contourImg = np.copy(src)
    cv2.drawContours(contourImg, [contour], 0, (0, 255, 0), 2, cv2.LINE_AA, maxLevel=1)
    contourstring = 'src/contours/contour' + str(filecount) + ".jpg"
    cv2.imwrite(contourstring, contourImg)
    filecount += 1


def filterOutSaltPepperNoise(edgeImg):
    # Get rid of salt & pepper noise.
    count = 0
    lastMedian = edgeImg
    median = cv2.medianBlur(edgeImg, 3)
    while not np.array_equal(lastMedian, median):
        # get those pixels that gets zeroed out
        zeroed = np.invert(np.logical_and(median, edgeImg))
        edgeImg[zeroed] = 0

        count = count + 1
        if count > 70:
            break
        lastMedian = median
        median = cv2.medianBlur(edgeImg, 3)


# Find Contours
def findSignificantContour(edgeImg):
    contours, hierarchy = cv2.findContours(
        edgeImg,
        cv2.RETR_TREE,
        cv2.CHAIN_APPROX_SIMPLE
    )
# Find level 1 contours
    level1Meta = []
    for contourIndex, tupl in enumerate(hierarchy[0]):
        # Each array is in format (Next, Prev, First child, Parent)
        # Filter the ones without parent
        if tupl[3] == -1:
            tupl = np.insert(tupl.copy(), 0, [contourIndex])
            level1Meta.append(tupl)
    # From among them, find the contours with large surface area.
    contoursWithArea = []
    for tupl in level1Meta:
        contourIndex = tupl[0]
        contour = contours[contourIndex]
        area = cv2.contourArea(contour)
        contoursWithArea.append([contour, area, contourIndex])

    contoursWithArea.sort(key=lambda meta: meta[1], reverse=True)
    largestContour = contoursWithArea[0][0]
    return largestContour


directory = r'C:\Users\chase\Desktop\Capstone\Images\cam112\cam112_standing'
for filename in os.listdir(directory):
    if filename.endswith(".jpg"):
        image_proc(os.path.join(directory, filename))
    else:
        continue
