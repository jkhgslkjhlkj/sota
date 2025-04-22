@echo off
echo Creating favicons...
D:\ImageMagick-7.1.1-Q16\magick.exe images\sota.gif[0] -background none -resize 16x16 images\favicon\favicon-16x16.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\sota.gif[0] -background none -resize 32x32 images\favicon\favicon-32x32.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\sota.gif[0] -background none -resize 180x180 images\favicon\apple-touch-icon.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\sota.gif[0] -background none -resize 192x192 images\favicon\android-chrome-192x192.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\sota.gif[0] -background none -resize 512x512 images\favicon\android-chrome-512x512.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\sota.gif[0] -define icon:auto-resize=16,32,48,64 images\favicon\favicon.ico
echo Favicons created successfully!
pause 