import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export type RecipeSummary = {
  name: string;
  time: string;
  difficulty: string;
  ingredients: string;
};

export type RecipeDetail = {
  name: string;
  time: string;
  difficulty: string;
  servings: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tips?: string;
};

type RequestBody =
  | { mode: "list"; ingredients: string[] }
  | { mode: "detail"; recipeName: string; ingredients: string[] };

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json({ error: "GEMINI_API_KEY가 설정되지 않았습니다." }, { status: 503 });
  }

  const body = (await request.json()) as RequestBody;
  const modelName = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: modelName });

  try {
    if (body.mode === "list") {
      const ingredientList = body.ingredients.join(", ");
      const prompt = `냉장고에 다음 재료가 있습니다: ${ingredientList}

이 재료들로 만들 수 있는 레시피 6가지를 추천해주세요.
반드시 아래 JSON 배열 형식으로만 답하세요. 다른 텍스트는 절대 포함하지 마세요.

[
  {
    "name": "레시피 이름",
    "time": "조리 시간(예: 15분)",
    "difficulty": "쉬움 또는 보통 또는 어려움",
    "ingredients": "사용할 재료 (쉼표 구분)"
  }
]`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) throw new Error("레시피 파싱 실패");
      const recipes = JSON.parse(jsonMatch[0]) as RecipeSummary[];
      return NextResponse.json({ recipes });
    }

    if (body.mode === "detail") {
      const ingredientList = body.ingredients.join(", ");
      const prompt = `냉장고 재료: ${ingredientList}
레시피: ${body.recipeName}

위 레시피의 상세 정보를 아래 JSON 형식으로만 답하세요. 다른 텍스트는 절대 포함하지 마세요.

{
  "name": "레시피 이름",
  "time": "조리 시간",
  "difficulty": "난이도",
  "servings": "몇 인분",
  "ingredients": [{ "name": "재료명", "amount": "양" }],
  "steps": ["순서1", "순서2", "..."],
  "tips": "조리 팁 (선택)"
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("레시피 상세 파싱 실패");
      const detail = JSON.parse(jsonMatch[0]) as RecipeDetail;
      return NextResponse.json({ detail });
    }

    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "알 수 없는 오류";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
