"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge" // Badgeコンポーネントをインポート
import type { RyousouLayer } from "@/types/index"
import type { EnvironmentalCharacteristic } from "@/app/page" // 型をインポート
import { TERRAIN_CLASSIFICATION_OPTIONS, SURROUNDING_ENVIRONMENT_OPTIONS } from "@/lib/options" // 選択肢をインポート

// SiteEvaluationResult型からichiHyoukaKekkaを削除
export interface SiteEvaluationResult {
  chiban: string
}

interface Step4Props {
  ichiJouhou: string
  updateIchiJouhou: (value: string) => void
  siteEvaluationResult: SiteEvaluationResult | null
  updateSiteEvaluationResult: (result: SiteEvaluationResult | null) => void
  ryousouLayers: RyousouLayer[]
  updateRyousouLayers: (layers: RyousouLayer[]) => void
  environmentalCharacteristics: EnvironmentalCharacteristic[]
  updateEnvironmentalCharacteristics: (characteristics: EnvironmentalCharacteristic[]) => void
  importance: string
  updateImportance: (value: string) => void
}

const CHIBAN_OPTIONS_STEP4 = [
  { value: "nanjaku", label: "軟弱" },
  { value: "chuteido", label: "中程度" },
  { value: "ryoukou", label: "良好" },
]

const IMPORTANCE_OPTIONS = [
  { value: "high", label: "高" },
  { value: "medium", label: "中" },
  { value: "low", label: "低" },
]

export default function Step4SiteEvaluation({
  ichiJouhou,
  updateIchiJouhou,
  siteEvaluationResult,
  updateSiteEvaluationResult,
  ryousouLayers,
  updateRyousouLayers,
  environmentalCharacteristics,
  updateEnvironmentalCharacteristics,
  importance,
  updateImportance,
}: Step4Props) {
  const [showDetails, setShowDetails] = useState(!!siteEvaluationResult && siteEvaluationResult.chiban !== "")
  const [selectedTerrain, setSelectedTerrain] = useState<string>("")
  const [selectedSurrounding, setSelectedSurrounding] = useState<string>("")

  useEffect(() => {
    setShowDetails(!!siteEvaluationResult && siteEvaluationResult.chiban !== "")
  }, [siteEvaluationResult])

  const handleJudgeSite = () => {
    if (ichiJouhou.trim() === "") {
      alert("位置情報を入力してください。")
      return
    }
    // chibanの初期値のみ設定
    updateSiteEvaluationResult({ chiban: "nanjaku" })
  }

  const handleChibanChange = (value: string) => {
    updateSiteEvaluationResult({ chiban: value })
  }

  const handleLayerChange = (id: number, field: keyof Omit<RyousouLayer, "id">, value: string) => {
    const newLayers = ryousouLayers.map((layer) => (layer.id === id ? { ...layer, [field]: value } : layer))
    updateRyousouLayers(newLayers)
  }

  const addLayer = () => {
    const newId = ryousouLayers.length > 0 ? Math.max(...ryousouLayers.map((l) => l.id)) + 1 : 1
    const lastLayer = ryousouLayers[ryousouLayers.length - 1]
    const newStart = lastLayer ? lastLayer.end : ""
    updateRyousouLayers([...ryousouLayers, { id: newId, start: newStart, end: "", description: "" }])
  }

  const removeLayer = (id: number) => {
    if (ryousouLayers.length > 1) {
      updateRyousouLayers(ryousouLayers.filter((layer) => layer.id !== id))
    }
  }

  const addCharacteristic = (category: "terrain" | "surrounding", value: string) => {
    if (value.trim() === "") return
    // 重複チェック
    if (environmentalCharacteristics.some((char) => char.category === category && char.value === value)) {
      alert(`${value} は既に追加されています。`)
      return
    }

    const newId =
      environmentalCharacteristics.length > 0 ? Math.max(...environmentalCharacteristics.map((c) => c.id)) + 1 : 1
    updateEnvironmentalCharacteristics([...environmentalCharacteristics, { id: newId, category, value }])
    if (category === "terrain") setSelectedTerrain("")
    if (category === "surrounding") setSelectedSurrounding("")
  }

  const removeCharacteristic = (id: number) => {
    updateEnvironmentalCharacteristics(environmentalCharacteristics.filter((c) => c.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="ichiJouhou" className="text-slate-600">
          位置情報 (住所、設置環境など) <span className="text-red-500">*</span>
        </Label>
        <Input
          id="ichiJouhou"
          value={ichiJouhou}
          onChange={(e) => updateIchiJouhou(e.target.value)}
          placeholder="例: 東京都千代田区1-1-1 屋外平地"
        />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleJudgeSite}>判定</Button>
      </div>

      {showDetails && siteEvaluationResult && (
        <>
          <Separator className="my-6" />
          <div className="space-y-6 p-4 border rounded-md bg-slate-50">
            <div className="space-y-2">
              <Label htmlFor="importance" className="text-slate-600">
                構造物の重要度 <span className="text-red-500">*</span>
              </Label>
              <Select value={importance} onValueChange={updateImportance}>
                <SelectTrigger id="importance">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {IMPORTANCE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chiban" className="text-slate-600">
                地盤 <span className="text-red-500">*</span>
              </Label>
              <Select value={siteEvaluationResult.chiban} onValueChange={handleChibanChange}>
                <SelectTrigger id="chiban">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {CHIBAN_OPTIONS_STEP4.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600">
                量層 (地層情報など) <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2 p-3 border rounded-md bg-white">
                {ryousouLayers.map((layer) => (
                  <div key={layer.id} className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Input
                        type="text"
                        value={layer.start}
                        onChange={(e) => handleLayerChange(layer.id, "start", e.target.value)}
                        placeholder="開始深度"
                        className="w-24 h-9"
                      />
                      <span>~</span>
                      <Input
                        type="text"
                        value={layer.end}
                        onChange={(e) => handleLayerChange(layer.id, "end", e.target.value)}
                        placeholder="終了深度"
                        className="w-24 h-9"
                      />
                      <span className="ml-1 text-sm">m:</span>
                    </div>
                    <Input
                      type="text"
                      value={layer.description}
                      onChange={(e) => handleLayerChange(layer.id, "description", e.target.value)}
                      placeholder="地層情報 (例: 表土・盛土)"
                      className="flex-grow h-9"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLayer(layer.id)}
                      disabled={ryousouLayers.length <= 1}
                      className="text-red-500 hover:bg-red-100 disabled:text-slate-300 h-9 w-9"
                      aria-label="Remove layer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addLayer} className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  層を追加
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-slate-600">環境特徴</Label>
              {/* 地形分類 */}
              <div className="p-3 border rounded-md bg-white space-y-2">
                <Label htmlFor="terrainClassification" className="text-sm font-medium text-slate-700">
                  地形分類
                </Label>
                <div className="flex gap-2">
                  <Select value={selectedTerrain} onValueChange={setSelectedTerrain}>
                    <SelectTrigger id="terrainClassificationSelect">
                      <SelectValue placeholder="地形分類を選択..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TERRAIN_CLASSIFICATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={() => addCharacteristic("terrain", selectedTerrain)} disabled={!selectedTerrain}>
                    <Plus className="h-4 w-4 mr-2" />
                    追加
                  </Button>
                </div>
              </div>

              {/* 周辺環境 */}
              <div className="p-3 border rounded-md bg-white space-y-2">
                <Label htmlFor="surroundingEnvironment" className="text-sm font-medium text-slate-700">
                  周辺環境
                </Label>
                <div className="flex gap-2">
                  <Select value={selectedSurrounding} onValueChange={setSelectedSurrounding}>
                    <SelectTrigger id="surroundingEnvironmentSelect">
                      <SelectValue placeholder="周辺環境を選択..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SURROUNDING_ENVIRONMENT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => addCharacteristic("surrounding", selectedSurrounding)}
                    disabled={!selectedSurrounding}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    追加
                  </Button>
                </div>
              </div>

              {/* 追加された特徴の表示 */}
              {environmentalCharacteristics.length > 0 && (
                <div className="p-3 border rounded-md bg-white">
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">追加された環境特徴:</Label>
                  <div className="flex flex-wrap gap-2">
                    {environmentalCharacteristics.map((char) => (
                      <Badge
                        key={char.id}
                        variant={char.category === "terrain" ? "default" : "secondary"}
                        className="flex items-center gap-1.5"
                      >
                        <span>
                          {char.category === "terrain" ? "地形" : "環境"}: {char.value}
                        </span>
                        <button
                          onClick={() => removeCharacteristic(char.id)}
                          className="rounded-full hover:bg-slate-300/50 p-0.5 focus:outline-none focus:ring-1 focus:ring-ring"
                          aria-label={`Remove ${char.value}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* 位置情報の評価結果セクションは削除 */}
          </div>
        </>
      )}
    </div>
  )
}
