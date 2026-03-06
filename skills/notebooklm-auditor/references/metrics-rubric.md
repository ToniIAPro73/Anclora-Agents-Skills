# NotebookLM Quality Rubric

## Structural Metrics (Objective)
- **Redundancy Ratio**: % of sources with high similarity. Target: < 15%.
- **Noise Ratio**: % of sources irrelevant to the goal. Target: < 10%.
- **Theme Coverage**: Mapping of sources to the required domain topics. Target: > 80%.
- **Freshness**: % of time-sensitive sources that are current. Target: > 90%.

## Retrieval Metrics (LLM-as-Judge)
- **Context Relevance**: Are the citations actually relevant to the query?
- **Context Coverage**: Do the citations cover all parts of the answer?
- **Faithfulness**: Is the answer strictly grounded in the sources?
- **Internal Consistency**: No contradictions in the generated response.
