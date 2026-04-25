---
title: "Prompt Engineering Cheat Sheet"
subtitle: "Master the art of effective AI communication"
date: 2025-05-27
---



## Core Principles

### 1. Be Clear and Specific

Provide detailed instructions and context. Vague prompts lead to vague responses.

**Good Example:**

```
Write a 300-word product description for wireless Bluetooth headphones targeting fitness enthusiasts, highlighting battery life, sweat resistance, and sound quality.
```

**Poor Example:**

```
Write about headphones.
```

### 2. Use Examples (Few-Shot Learning)

Show the AI what you want by providing examples of the desired output format.

**Example:**

```
Classify these emails as spam or not spam:

Email: 'Congratulations! You've won $1M!' → Classification: Spam
Email: 'Meeting moved to 3 PM tomorrow' → Classification: Not Spam
Email: 'Your order has shipped' → Classification: ?
```

### 3. Step-by-Step Instructions

Break complex tasks into numbered steps to guide the AI through your process.

**Example:**

```
Analyze this data step by step:
1. Identify the main trends
2. Calculate key statistics
3. Highlight anomalies
4. Provide actionable insights
```

---

## Advanced Techniques

### Chain of Thought

Ask the AI to show its reasoning process for complex problems.

**Example:**

```
Solve this problem step by step, showing your reasoning:
If a train travels 240 miles in 3 hours, and then 160 miles in 2 hours, what is its average speed for the entire journey?
```

### Role Assignment

Give the AI a specific role or persona to improve response quality.

**Example:**

```
You are an experienced financial advisor. A 25-year-old just started their first job earning $50k annually. What investment advice would you give them?
```

### Output Formatting

Specify the exact format you want for the response.

**Example:**

```
Provide your analysis in this format:
## Summary: [2-3 sentences]
## Key Points: [bullet list]
## Recommendations: [numbered list]
```

---

## Do's and Don'ts

| ✅ **DO**                            | ❌ **DON'T**                          |
| ----------------------------------- | ------------------------------------ |
| Be specific about length and format | Use overly complex language          |
| Provide context and background      | Make assumptions about context       |
| Use clear, direct language          | Ask multiple unrelated questions     |
| Test and iterate your prompts       | Ignore the importance of examples    |
| Break complex tasks into steps      | Forget to specify output constraints |

---

## Quick Tips

* **🎯 Specificity:** Replace "write something about..." with "write a 200-word analysis of..."
* **📝 Templates:** Create reusable prompt templates for common tasks to maintain consistency.
* **🔄 Iteration:** Refine prompts based on outputs. Small changes can dramatically improve results.
* **📊 Structure:** Use headers, bullet points, and numbering to organize complex prompts.
* **🎭 Persona:** Assign roles like "expert," "teacher," or "critic" to get specialized responses.
* **⚡ Constraints:** Set clear boundaries: word limits, tone, audience, and format requirements.

---

## Common Prompt Patterns

### Analysis Pattern

```
Analyze [TOPIC] by examining:
- Current state
- Key challenges
- Opportunities
- Recommendations

Format as a professional report with executive summary.
```

### Comparison Pattern

```
Compare [OPTION A] vs [OPTION B]:

| Criteria      | Option A | Option B | Winner |
|---------------|----------|----------|--------|
| [Criterion 1] |          |          |        |

Include overall recommendation.
```

### Creative Brief Pattern

```
Create [CONTENT TYPE] for [AUDIENCE]:

- Objective: [GOAL]
- Tone: [VOICE/STYLE]
- Key Messages: [3-5 points]
- Length: [WORD COUNT]
- Call-to-action: [DESIRED ACTION]
```

---

© 2025 Prompt Engineering Guide | Master effective AI communication
