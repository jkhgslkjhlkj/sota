@echo off
echo Creating improved favicon...
D:\ImageMagick-7.1.1-Q16\magick.exe images\1.png -alpha set -channel RGBA -fill "rgba(255,255,255,0.9)" -opaque "rgba(255,255,255,0)" -resize 64x64 -sharpen 0x1 -quality 100 images\favicon\favicon-1.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\favicon\favicon-1.png -resize 16x16 images\favicon\favicon-16x16.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\favicon\favicon-1.png -resize 32x32 images\favicon\favicon-32x32.png
D:\ImageMagick-7.1.1-Q16\magick.exe images\favicon\favicon-1.png -resize 64x64 -define icon:auto-resize=16,32,48,64 images\favicon\favicon.ico
echo Favicon created successfully!
pause 