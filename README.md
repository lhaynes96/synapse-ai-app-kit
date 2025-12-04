# Synapse AI App Kit

A reusable React + TypeScript starter for building AI-driven chat and prompt-based web applications. The kit ships with a clean UI, provider abstraction for OpenAI and Gemini, and a simple mode system for structured prompts.

## Tech Stack
- React + Vite + TypeScript
- CSS Modules for scoped styling (see `src/styles`)
- Fetch-based API calls to OpenAI GPT-4o and Google Gemini

## Getting Started

### 1) Install dependencies
```bash
npm install
```

### 2) Configure environment variables
Copy `.env.example` to `.env` and set your keys:
```bash
cp .env.example .env
```
Then update:
```
VITE_OPENAI_API_KEY=your-openai-key
VITE_GEMINI_API_KEY=your-gemini-key
VITE_DEFAULT_AI_PROVIDER=openai
```
> In production, route requests through a backend to keep keys secret. The current client-side fetches are provided for quick prototyping.

### 3) Run the app
```bash
npm run dev
```
Open the printed URL to use the chat UI. Additional scripts:
- `npm run build` – type-checks and builds the app
- `npm run preview` – serves the production build locally

## Project Structure
```
src/
  main.tsx
  App.tsx
  components/
    ChatUI.tsx
    PromptForm.tsx
    ResponsePanel.tsx
    ProviderSwitcher.tsx
  lib/
    ai/
      aiRouter.ts
      geminiClient.ts
      openaiClient.ts
      providers.ts
    modes.ts
    types.ts
  styles/
    global.css
    *.module.css
```

## AI Provider Abstraction
- `src/lib/ai/providers.ts` defines the `AIProvider` type and helper utilities.
- `src/lib/ai/openaiClient.ts` and `src/lib/ai/geminiClient.ts` perform fetch calls and return a unified `{ text: string }` shape.
- `src/lib/ai/aiRouter.ts` routes requests to the selected provider.
- Swap providers via the UI dropdown (`ProviderSwitcher`), or change `VITE_DEFAULT_AI_PROVIDER`.

### Adding a new provider
1. Create a client file in `src/lib/ai/` that implements a function returning `{ text: string }`.
2. Extend the `AIProvider` union in `providers.ts`, add a label, and wire env lookup.
3. Update `aiRouter.ts` to call the new client based on the provider.
4. Expose the provider in `ProviderSwitcher` and set the desired default in `.env`.

## Modes (prompt presets)
Modes are defined in `src/lib/modes.ts` and surfaced in the `PromptForm` dropdown. To add or edit:
1. Add a new `ModeOption` entry with `id`, `label`, and `promptPrefix`.
2. The selected mode prefix is prepended to the user prompt in `App.tsx` before sending to the AI.

## UI Customization
- Layout lives in `App.tsx` and `ChatUI.tsx`.
- Styles are scoped via CSS Modules inside `src/styles`. Replace them or plug in a different styling approach.
- Components (`PromptForm`, `ResponsePanel`, `ProviderSwitcher`) are intentionally small and reusable so you can swap layouts without changing the AI layer.

## Security Notes
- API keys are read from environment variables. Do **not** hard-code secrets.
- For production, prefer a backend proxy (or serverless function) that injects keys server-side and performs request validation.

## Multimodal & Extensibility
The abstraction layer is designed for text-first use cases but can be extended to multimodal interactions by adapting the request payloads in the provider clients (e.g., attaching image parts for Gemini or vision models for OpenAI) while preserving the unified response shape.
