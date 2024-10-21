import type { ModelInfo } from './types';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'claude-3-5-sonnet-20240620';
export const DEFAULT_PROVIDER = 'Anthropic';

const staticModels: ModelInfo[] = [
  { name: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { name: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI' },
  { name: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
  { name: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI' },
  { name: 'gpt-4', label: 'GPT-4', provider: 'OpenAI' },
  { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { name: 'llama3.2:latest', label: 'llama 3.2', provider: 'Ollama' },
  { name: 'codestral:22b', label: 'codestreal 22B', provider: 'Ollama' },
  { name: 'gemma2:latest', label: 'gemma 2', provider: 'Ollama' },
  { name: 'granite-code:34b', label: 'granite code 34B', provider: 'Ollama' },
  { name: 'codellama:70b', label: 'codellama 70B', provider: 'Ollama' },
  { name: 'nomic-embed-text:latest', label: 'nomic embed text', provider: 'Ollama' },
  { name: 'granite3-dense:8b', label: 'granite 3 dense 8B', provider: 'Ollama' },
  { name: 'solar-pro:22b', label: 'solar pro 22B', provider: 'Ollama' },
  { name: 'yi-coder:9b', label: 'yi coder 9B', provider: 'Ollama' },
  { name: ' ', label: ' ', provider: 'Ollama' },
  { name: ' ', label: ' ', provider: 'Ollama' },
  { name: ' ', label: ' ', provider: 'Ollama' },
];

export let MODEL_LIST: ModelInfo[] = [...staticModels];

async function getOllamaModels(): Promise<ModelInfo[]> {
  try {
    const response = await fetch(`http://localhost:11434/api/tags`);
    const data = await response.json();

    return data.models.map((model: any) => ({
      name: model.name,
      label: `${model.name} (${model.details.parameter_size})`,
      provider: 'Ollama',
    }));
  } catch (e) {
    return [];
  }
}

async function initializeModelList(): Promise<void> {
  const ollamaModels = await getOllamaModels();
  MODEL_LIST = [...ollamaModels, ...staticModels];
}
initializeModelList().then();
export { getOllamaModels, initializeModelList };
