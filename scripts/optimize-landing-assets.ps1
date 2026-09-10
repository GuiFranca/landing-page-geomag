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
# Um .webp gerado por esta mesma rotina fica no mesmo diretorio que o
# original (nao apagamos o .png/.jpg). Para nao reprocessar a propria saida
# como se fosse fonte, agrupamos por nome base e so tratamos o .webp como
# fonte quando NAO existe .png/.jpg/.jpeg irmao (caso dos 3 logos que ja
# nascem em .webp: prefeitura-capivari, sao-carlos, zorzi).
Get-ChildItem -Path $clientes -File |
    Where-Object { $_.Extension -in '.png', '.jpg', '.jpeg', '.webp' } |
    Group-Object BaseName |
    ForEach-Object {
        $baseName = $_.Name
        $files = $_.Group
        $source = $files | Where-Object { $_.Extension -ne '.webp' } | Select-Object -First 1
        if (-not $source) { $source = $files | Select-Object -First 1 }
        $dest = Join-Path $clientes ($baseName + '.webp')
        Convert-Asset -Source $source.FullName -Destination $dest -MaxWidth 360 -MaxHeight 144 -Quality 86
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
