import cv2
import time
import numpy as np

# Edit area of interest
x1= 400
x2 = 1700
y1 = 0
y2 = 1920

# Read in background + horse
frame1 = cv2.imread('background100.jpeg')
frame2 = cv2.imread('horse4.jpeg')

# Test canny edge detection
subImage = (frame1.astype('int32') - frame2.astype('int32')).clip(0).astype('uint8')
frame1 = frame1[y1:y2, x1:x2]
median = cv2.Canny(frame2, 90, 150)
cv2.namedWindow('edge-detection', cv2.WINDOW_NORMAL)
cv2.resizeWindow('edge-detection', 900, 500)
cv2.imshow("edge-detection", median)

# Test color spaces
lower_hue = 0
lower_saturation = 55  # 55
lower_brightness = 0  # 50

upper_hue = 180
upper_saturation = 255
upper_brightness = 100  # 140

# Test
lower_thresh = np.array([lower_hue, lower_saturation, lower_brightness])
upper_thresh = np.array([upper_hue, upper_saturation, upper_brightness])
mask = cv2.inRange(frame2, lower_thresh, upper_thresh)
cv2.namedWindow('mask', cv2.WINDOW_NORMAL)
cv2.resizeWindow('mask', 900, 500)
cv2.imshow("mask", mask)

# Test mask
separated_neighs_color = cv2.bitwise_and(frame2, frame2, mask=mask)
cv2.namedWindow('mask2', cv2.WINDOW_NORMAL)
cv2.resizeWindow('mask2', 900, 500)
cv2.imshow('mask2', separated_neighs_color)
# greyScaleIm = cv2.cvtColor(separated_neighs_color, cv2.COLOR_BGR2GRAY)
# cv2.imshow("greyscale", greyScaleIm)

# Test convert color space
hsv = cv2.cvtColor(frame2, cv2.COLOR_BGR2HSV)
cv2.namedWindow('sub', cv2.WINDOW_NORMAL)
cv2.resizeWindow('sub', 900, 500)
cv2.imshow('sub', hsv)

cv2.waitKey(0)
cv2.destroyAllWindows()
#print(image)
#cv2.imshow('test', image)
