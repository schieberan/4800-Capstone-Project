import cv2
#import time

frame1 = cv2.imread('src1/lightDarkBackground.jpeg', flags=cv2.IMREAD_COLOR)
frame2 = cv2.imread('src1/lightHorse1.jpeg', flags=cv2.IMREAD_COLOR)
frame3 = cv2.subtract(frame1, frame2) #Subtract

cv2.imshow('sub', frame3)
cv2.imwrite('src1/bsubLH1.jpeg',frame3)
cv2.waitKey(0)
cv2.destroyAllWindows()
#print(image)
#cv2.imshow('test', image)