[CmdletBinding()]
param(
  [string]$Source = "$env:USERPROFILE\Downloads\FOTOS\FOTOS",
  [string]$ImgDest = "$PSScriptRoot\..\src\assets\images\projetos",
  [string]$VidDest = "$PSScriptRoot\..\src\assets\videos\projetos"
)

$magick = "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe"

function Convert-Img {
  param($src, $name, $maxW = 1920, $q = 82)
  Write-Host "  IMG $name ..."
  & $magick $src -resize "${maxW}x${maxW}>" -quality $q "${ImgDest}\${name}.webp"
  & $magick $src -resize "${maxW}x${maxW}>" -quality $q "${ImgDest}\${name}.jpg"
}

function Convert-Thumb {
  param($src, $name)
  & $magick $src -resize "600x600^" -gravity Center -extent 600x600 -quality 80 "${ImgDest}\${name}-thumb.webp"
  & $magick $src -resize "600x600^" -gravity Center -extent 600x600 -quality 80 "${ImgDest}\${name}-thumb.jpg"
}

Write-Host "=== VIDEOS ==="

$bv = Join-Path $Source "BEIRA RIO\Aerial_transition_farmland_to_DEM_202605042030.mp4"
if (Test-Path $bv) {
  Write-Host "  VID beira-rio-transition..."
  ffmpeg -i $bv -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 19 -preset veryslow -tune film -profile:v high -level 4.0 -pix_fmt yuv420p -an -movflags +faststart (Join-Path $VidDest "beira-rio-transition.mp4") -y
  ffmpeg -i $bv -ss 2 -vframes 1 -q:v 3 (Join-Path $VidDest "beira-rio-transition-poster.jpg") -y
} else { Write-Warning "Nao encontrado: $bv" }

$pvName = "PAROQUIA"
$pv = Join-Path $Source "$pvName\3D PAROQUIA.mp4"
if (-not (Test-Path $pv)) {
  $pvName = [char]0x0050 + [char]0x0041 + [char]0x0052 + [char]0x00D3 + [char]0x0051 + [char]0x0055 + [char]0x0049 + [char]0x0041
  $pv = Join-Path $Source "$pvName\3D $pvName.mp4"
}
if (Test-Path $pv) {
  Write-Host "  VID paroquia-3d..."
  ffmpeg -i $pv -ss 0 -t 8 -vf "scale='min(1080,iw)':-2" -c:v libx264 -crf 24 -preset slow -an -movflags +faststart (Join-Path $VidDest "paroquia-3d.mp4") -y
  ffmpeg -i $pv -ss 2 -vframes 1 -q:v 3 (Join-Path $VidDest "paroquia-3d-poster.jpg") -y
} else { Write-Warning "Nao encontrado (tente renomear pasta PAROQUIA sem acento): $pv" }

Write-Host "=== IMAGENS ==="

Convert-Img (Join-Path $Source "BEIRA RIO\ORTO - BEIRA RIO.png") "beira-rio-orto"
Convert-Img (Join-Path $Source "BEIRA RIO\DEM - BEIRA RIO.png") "beira-rio-dem"

Convert-Img (Join-Path $Source "CASA BRANCA -HB\CASA BRANCA COM FOTO_page-0001.jpg") "casa-branca-1" 1600 80
Convert-Img (Join-Path $Source "CASA BRANCA -HB\CASA BRANCA_page-0001.jpg") "casa-branca-2" 1600 80
Convert-Thumb (Join-Path $Source "CASA BRANCA -HB\CASA BRANCA COM FOTO_page-0001.jpg") "casa-branca"

Convert-Img (Join-Path $Source "ESTRELA DO SUL II\PROJETO DE LOTEAMENTO - ESTRELA DO SUL II.jpg") "estrela-do-sul" 1600 80
Convert-Thumb (Join-Path $Source "ESTRELA DO SUL II\PROJETO DE LOTEAMENTO - ESTRELA DO SUL II.jpg") "estrela-do-sul"

$golinelliFile = Get-ChildItem (Join-Path $Source "PARQUE GOLINELLI") -Filter "*.jpg" | Select-Object -First 1
if ($golinelliFile) {
  Convert-Img $golinelliFile.FullName "golinelli" 1600 80
  Convert-Thumb $golinelliFile.FullName "golinelli"
} else { Write-Warning "Nenhum JPG em PARQUE GOLINELLI" }

$terraplanagem = @("ORTO - TERRAPLANAGEM - 1.jpg","ORTO - TERRAPLANAGEM - 2.jpg","ORTO - TERRAPLANAGEM - 3.jpg","ORTO - TERRAPLANAGEM - 4.jpg")
for ($i = 0; $i -lt $terraplanagem.Length; $i++) {
  $n = "terraplanagem-{0:D2}" -f ($i + 1)
  Convert-Img (Join-Path $Source "TERRAPLANAGEM\$($terraplanagem[$i])") $n
  if ($i -eq 0) { Convert-Thumb (Join-Path $Source "TERRAPLANAGEM\$($terraplanagem[$i])") "terraplanagem-01" }
}

Write-Host ""
Write-Host "Assets prontos em:"
Write-Host "  $ImgDest"
Write-Host "  $VidDest"
