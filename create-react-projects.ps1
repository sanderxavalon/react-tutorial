param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectName,
    
    [Parameter(Mandatory=$true)]
    [int]$Count
)

# 檢查是否安裝了 Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js 未安裝，請先安裝 Node.js"
    exit 1
}

# 檢查是否安裝了 npm
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm 未安裝，請先安裝 npm"
    exit 1
}

# 創建指定數量的專案
for ($i = 0; $i -lt $Count; $i++) {
    $currentProjectName = if ($i -eq 0) {
        $ProjectName
    } else {
        "$ProjectName-$($i + 1)"
    }
    
    Write-Host "正在創建專案: $currentProjectName"
    
    # 使用 Vite 創建 React + TypeScript + SWC 專案
    npm create vite@latest $currentProjectName -- --template react-swc-ts
    
    Write-Host "專案 $currentProjectName 創建完成！"
}

Write-Host "所有專案創建完成！" 