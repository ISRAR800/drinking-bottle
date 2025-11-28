<#
Convert AVIF images in ./images to WebP and JPEG fallbacks at sizes 320, 640, 1024.

Usage (from repo root):
  powershell -ExecutionPolicy Bypass -File .\scripts\convert-images.ps1

Prerequisites: ffmpeg must be installed and available on PATH. On Windows you can install via:
  winget install --id=Gyan.FFmpeg -e
or
  choco install ffmpeg

This script creates files alongside each AVIF with names like:
  originalname-320.webp, originalname-320.jpg
  originalname-640.webp, originalname-640.jpg
  originalname-1024.webp, originalname-1024.jpg
  originalname.webp, originalname.jpg  (full-size fallbacks)
#>

# Verify ffmpeg is available
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Error "ffmpeg is not available on PATH. Install ffmpeg (winget or choco) and re-run this script."
    exit 1
}

$srcDir = Join-Path $PSScriptRoot "..\images" | Resolve-Path -ErrorAction Stop
$srcDir = $srcDir.Path
Write-Host "Converting AVIF files in: $srcDir"

$sizes = @(320, 640, 1024)

Get-ChildItem -Path $srcDir -Filter "*.avif" -File | ForEach-Object {
    $avif = $_.FullName
    $nameNoExt = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)

    Write-Host "Processing $($_.Name)..."

    foreach ($w in $sizes) {
        $jpgOut = Join-Path $srcDir ("{0}-{1}.jpg" -f $nameNoExt, $w)
        $webpOut = Join-Path $srcDir ("{0}-{1}.webp" -f $nameNoExt, $w)

        Write-Host "  Generating $jpgOut and $webpOut (width $w)..."

        # Create resized JPEG (quality ~85)
        & ffmpeg -y -hide_banner -loglevel error -i "$avif" -vf "scale='min($w,iw)':-1" -qscale:v 3 "$jpgOut"

        # Create WebP (lossy) -- tune quality as desired (here q:75)
        & ffmpeg -y -hide_banner -loglevel error -i "$avif" -vf "scale='min($w,iw)':-1" -c:v libwebp -lossless 0 -q:v 75 "$webpOut"
    }

    # Full-size fallbacks (JPEG + WebP)
    $jpgFull = Join-Path $srcDir ("{0}.jpg" -f $nameNoExt)
    $webpFull = Join-Path $srcDir ("{0}.webp" -f $nameNoExt)
    Write-Host "  Generating full-size fallbacks $jpgFull and $webpFull..."
    & ffmpeg -y -hide_banner -loglevel error -i "$avif" -qscale:v 3 "$jpgFull"
    & ffmpeg -y -hide_banner -loglevel error -i "$avif" -c:v libwebp -lossless 0 -q:v 75 "$webpFull"

    Write-Host "  Done: $($_.Name)"
}

Write-Host "All conversions complete."
