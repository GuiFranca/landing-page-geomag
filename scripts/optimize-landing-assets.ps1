# Otimiza os assets da landing: redimensiona para ~2x o tamanho de exibicao
# e converte para WebP. Nao apaga os originais.
#
# Uso: powershell -ExecutionPolicy Bypass -File scripts/optimize-landing-assets.ps1
#
# Requer ImageMagick 7 (magick) no PATH.

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

function Convert-Asset {
    param(
        [string]$Source,
        [string]$Destination,
        [int]$MaxWidth,
        [int]$MaxHeight = 0,
        [int]$Quality
    )
    if (-not (Test-Path $Source)) {
        Write-Warning "ausente: $Source"
        return
    }
    $geometry = if ($MaxHeight -gt 0) { "$($MaxWidth)x$($MaxHeight)>" } else { "$($MaxWidth)x>" }
    $before = (Get-Item $Source).Length
    & magick $Source -resize $geometry -quality $Quality -define webp:method=6 $Destination
    if ($LASTEXITCODE -ne 0) { throw "magick falhou em $Source" }
    $after = (Get-Item $Destination).Length
    $pct = [math]::Round((1 - $after / $before) * 100)
    $name = Split-Path $Destination -Leaf
    '{0,-34} {1,8:N1} KB -> {2,7:N1} KB  -{3}%' -f $name, ($before / 1KB), ($after / 1KB), $pct | Write-Host
}

Write-Host "`n== Logos de clientes (360x144, 2x da caixa real 180x72 / 150x56) ==" -ForegroundColor Cyan
$clientes = Join-Path $root 'src/assets/images/clientes'
Get-ChildItem -Path $clientes -File |
    Where-Object { $_.Extension -in '.png', '.jpg', '.jpeg', '.webp' } |
    ForEach-Object {
        $dest = Join-Path $clientes ($_.BaseName + '.webp')
        Convert-Asset -Source $_.FullName -Destination $dest -MaxWidth 360 -MaxHeight 144 -Quality 86
    }

Write-Host "`n== Logo do header (392px, 2x dos 196px exibidos) ==" -ForegroundColor Cyan
$logoDir = Join-Path $root 'src/assets/images/logo-nova'
Convert-Asset `
    -Source (Join-Path $logoDir 'logo-horizontal-subtitulo.png') `
    -Destination (Join-Path $logoDir 'logo-horizontal-subtitulo.webp') `
    -MaxWidth 392 -Quality 86

Write-Host "`n== Posters de video (1600px) ==" -ForegroundColor Cyan
$vid = Join-Path $root 'src/assets/videos/projetos'
foreach ($p in 'beira-rio-transition-poster', 'paroquia-3d-poster') {
    Convert-Asset `
        -Source (Join-Path $vid "$p.jpg") `
        -Destination (Join-Path $vid "$p.webp") `
        -MaxWidth 1600 -Quality 70
}

Write-Host "`nConcluido.`n" -ForegroundColor Green
