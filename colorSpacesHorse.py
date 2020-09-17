import cv2
import numpy as np

#https://www.learnopencv.com/color-spaces-in-opencv-cpp-python/

light = cv2.imread('src1/lightHorse1.jpeg')
dark = cv2.imread('src1/bsubLH1.jpeg')

#LAB - lightness, a = green to magenta, b = blue to yellow
lightLAB = cv2.cvtColor(light, cv2.COLOR_BGR2LAB)
darkLAB = cv2.cvtColor(dark, cv2.COLOR_BGR2LAB)

#YCB - y =lumunance, c = red, b = blue
lightYCB = cv2.cvtColor(light, cv2.COLOR_BGR2YCrCb)
darkYCB = cv2.cvtColor(dark, cv2.COLOR_BGR2YCrCb)

#HSV - Hue, Saturation, Value
lightHSV = cv2.cvtColor(light, cv2.COLOR_BGR2HSV)
darkHSV = cv2.cvtColor(dark, cv2.COLOR_BGR2HSV)

bgr = [71, 53, 74] #brown
thresh = 20 #range plus or minus thresh

minBGR = np.array([bgr[0] - thresh, bgr[1] - thresh, bgr[2] - thresh])
maxBGR = np.array([bgr[0] + thresh, bgr[1] + thresh, bgr[2] + thresh])

maskBGR = cv2.inRange(light, minBGR, maxBGR)
resultBGR = cv2.bitwise_and(light, light, mask=maskBGR)

# convert 1D array to 3D, then convert it to HSV and take the first element
# this will be same as shown in the above figure [65, 229, 158]
hsv = cv2.cvtColor(np.uint8([[bgr]]), cv2.COLOR_BGR2HSV)[0][0]

minHSV = np.array([hsv[0] - thresh, hsv[1] - thresh, hsv[2] - thresh])
maxHSV = np.array([hsv[0] + thresh, hsv[1] + thresh, hsv[2] + thresh])

maskHSV = cv2.inRange(lightHSV, minHSV, maxHSV)
resultHSV = cv2.bitwise_and(lightHSV, lightHSV, mask=maskHSV)

# convert 1D array to 3D, then convert it to YCrCb and take the first element
ycb = cv2.cvtColor(np.uint8([[bgr]]), cv2.COLOR_BGR2YCrCb)[0][0]

minYCB = np.array([ycb[0] - thresh, ycb[1] - thresh, ycb[2] - thresh])
maxYCB = np.array([ycb[0] + thresh, ycb[1] + thresh, ycb[2] + thresh])

maskYCB = cv2.inRange(lightYCB, minYCB, maxYCB)
resultYCB = cv2.bitwise_and(lightYCB, lightYCB, mask=maskYCB)

# convert 1D array to 3D, then convert it to LAB and take the first element
lab = cv2.cvtColor(np.uint8([[bgr]]), cv2.COLOR_BGR2LAB)[0][0]

minLAB = np.array([lab[0] - thresh, lab[1] - thresh, lab[2] - thresh])
maxLAB = np.array([lab[0] + thresh, lab[1] + thresh, lab[2] + thresh])

maskLAB = cv2.inRange(lightLAB, minLAB, maxLAB)
resultLAB = cv2.bitwise_and(lightLAB, lightLAB, mask=maskLAB)

cv2.imshow("Result BGR", resultBGR)
cv2.imshow("Result HSV", resultHSV)
cv2.imshow("Result YCB", resultYCB)
cv2.imshow("Output LAB", resultLAB)

k = cv2.waitKey(0) & 0xFF
if k == 27:
    cv2.destroyAllWindows()