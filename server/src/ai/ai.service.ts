import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  async enrich(data: any) {
    this.logger.log('AI PROCESS STARTED');

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'meta-llama/llama-3-8b-instruct',
          messages: [
            {
              role: 'system',
              content: `You are a support triage assistant.

Rules:
- Payment, charge, refund → billing
- Bugs, errors, not working → support
- Suggestions → feedback
- Otherwise → general

Respond ONLY with valid JSON (no text, no explanation).

Format:
{
 "category": "billing|support|feedback|general",
 "summary": "one line summary",
 "urgency": "low|medium|high"
}`
            },
            {
              role: 'user',
              content: data.message
            }
          ],
          temperature: 0.1
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'AI App'
          }
        }
      );

      let text = response.data.choices[0]?.message?.content;

      if (!text) throw new Error('Empty AI response');

      
      text = text.replace(/```json|```/g, '').trim();

      // 🔥 extract JSON safely
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (!jsonMatch) throw new Error('No valid JSON found');

      const parsed = JSON.parse(jsonMatch[0]);

      this.logger.log(`AI SUCCESS JSON: ${JSON.stringify(parsed)}`);

      return parsed;

    } catch (err) {
      this.logger.error(`AI FAILED → fallback triggered`);

   
      const msg = data.message.toLowerCase();

      let category: string = 'general';
      let urgency: string = 'low';

      if (/charge|payment|refund|billing/.test(msg)) {
        category = 'billing';
        urgency = 'high';
      } else if (/error|issue|bug|not working|fail/.test(msg)) {
        category = 'support';
        urgency = 'medium';
      } else if (/feedback|suggestion|improve/.test(msg)) {
        category = 'feedback';
      }

      return {
        category,
        summary: msg.slice(0, 80),
        urgency,
      };
    }
  }
}